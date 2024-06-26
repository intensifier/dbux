import sortBy from 'lodash/sortBy';
import { commands, TreeItemCollapsibleState, window } from 'vscode';
import fs from 'fs';
import { basename, dirname } from 'path';
import open from 'open';
import { newLogger } from '@dbux/common/src/log/logger';
import { pathJoin, pathRelative } from '@dbux/common-node/src/util/pathUtil';
import allApplications from '@dbux/data/src/applications/allApplications';
import { exportApplicationToFile } from '@dbux/projects/src/dbux-analysis-tools/importExport';
import Process from '@dbux/projects/src/util/Process';
import { runTaskWithProgressBar } from '../codeUtil/runTaskWithProgressBar';
import BaseTreeViewNode from '../codeUtil/treeView/BaseTreeViewNode';
import { showTextInNewFile } from '../codeUtil/codeNav';
import { confirm, showInformationMessage } from '../codeUtil/codeModals';
import { getCurrentResearch } from '../research/Research';
import { transformFiles } from '../../../dbux-common-node/src/util/babelUtil';
import { translate } from '../lang';

/** @typedef {import('./PDGViewController').default} PDGViewController */
/** @typedef {import('@dbux/projects/src/projectLib/Project').ProjectsManager} ProjectsManager */

// eslint-disable-next-line no-unused-vars
const { log, debug, warn, error: logError } = newLogger('ToolNodes');

// const ExportExercises = 5;
const ExportExercises = 0;

const CustomPatchByChapter = {
  hanoiTower: 'hanoiTower0',
};

class ToolNode extends BaseTreeViewNode {
  /**
   * @type {PDGViewController}
   */
  get controller() {
    return this.treeNodeProvider.controller;
  }

  /**
   * @type {ProjectsManager}
   */
  get manager() {
    return this.controller.manager;
  }
}

class GenerateListNode extends ToolNode {
  static makeLabel() {
    return 'Generate JSA Chapters and Exercises';
  }

  async handleClick() {
    const { project } = this.controller;

    if (this.controller.exerciseList) {
      const result = await confirm(`This will discard all PDG data in 'javascript-algorithms-all.js', do you want to continue?`);
      if (!result) {
        return;
      }
    }

    await runTaskWithProgressBar(async (progress) => {
      if (!project.doesProjectFolderExist()) {
        progress.report({ message: `Installing project "${project.name}"...` });
        await this.manager.runner.installProject(project);
      }

      await this.manager.externals.initRuntimeServer();

      let exerciseConfigs, chapters;
      const addedExerciseNames = new Set();

      try {
        progress.report({ message: 'Disabling dbux-babel-plugin...' });
        await project.gitResetHard();
        await project.applyPatch('disable_dbux');

        progress.report({ message: 'Gathering test data...' });
        const processOptions = {
          cwd: project.projectPath,
        };
        const testDirectory = 'src/algorithms';
        /**
         * NOTE: set `testNamePattern` to an unused name to skip running all tests
         * @see https://stackoverflow.com/a/69099439/11309695
         */
        const UnusedTestPattern = 'zzzzz';
        const testDataRaw = await Process.execCaptureOut(
          `npx jest --json --verbose ${testDirectory} -t "${UnusedTestPattern}"`, 
          { 
            logStdout: true,
            processOptions
          }
        );
        
        progress.report({ message: 'Parsing test data...' });

        const testData = JSON.parse(testDataRaw);

        exerciseConfigs = [];

        for (const testResult of testData.testResults) {
          for (const assertionResult of testResult.assertionResults) {
            const { fullName } = assertionResult;
            /**
             * NOTE: `PolynomialHash` and `SimplePolynomialHash` shares the same fullName in different test files
             */
            const testFilePath = pathRelative(project.projectPath, testResult.name);
            const baseName = basename(testFilePath);
            const name = `${fullName}@${baseName}`;
            if (!addedExerciseNames.has(name)) {
              addedExerciseNames.add(name);
            }
            else {
              continue;
            }
            // const chapter = fullName.substring(0, fullName.indexOf(' '));
            const testFileData = this.controller.parseTestFilePath(testFilePath);
            if (!testFileData) {
              continue;
            }
            /**
             * hackfix: some character in testNamePattern will cause problem, use '.' to avoid any parentheses in pattern.
             *    1. parentheses: jest failed to match test name
             *    2. π: dbux_run failed to serialize this 
             * @see https://jestjs.io/docs/cli#--testmatch-glob1--globn
             */
            const testNamePattern = fullName.replaceAll('(', '.').replaceAll(')', '.').replaceAll('π', '.');
            const { chapterGroup, chapter, algo } = testFileData;
            const exerciseConfig = {
              chapterGroup,
              chapter,
              algo,
              name,
              label: fullName,
              testNamePattern,
              patch: CustomPatchByChapter[chapter],
              testFilePaths: [testFilePath],
            };
            exerciseConfigs.push(exerciseConfig);
          }
        }

        progress.report({ message: `Generating exercise file...` });
        this.controller.writeExerciseJs(exerciseConfigs);

        progress.report({ message: `Loading exercises...` });
        const exerciseList = this.controller.reloadExerciseList();

        progress.report({ message: `Generating chapter list file...` });
        this.controller.writeChapterListJs(exerciseList);

        progress.report({ message: `Loading chapter list...` });
        chapters = this.controller.reloadChapterList();
      }
      finally {
        // TODO: add sanity checks when doing anything that depends on dbux to be enabled, in case of this patch is not reverted successfully
        progress.report({ message: 'Finishing up...' });

        /**
         * 
         * @see https://stackoverflow.com/questions/24111535/how-can-i-use-lodash-underscore-to-sort-by-multiple-nested-fields
         */
        sortBy(exerciseConfigs, cfg => [cfg.chapterGroup, cfg.chapter]);
        await project.revertPatch('disable_dbux');
      }

      const nAlgo = new Set(exerciseConfigs.map(cfg => cfg.algo)).size;

      showInformationMessage(`List generated, found ${nAlgo} algos (${exerciseConfigs.length} exercise(s)) ` +
        `in ${chapters.length} chapter(s).`);

      this.treeNodeProvider.refresh();
    }, { title: 'Generating Chapter List' });
  }
}

class ExportApplicationsForceNode extends ToolNode {
  static makeLabel() {
    return `Export all exercise applications`;
  }

  async handleClick() {
    const { exerciseList } = this.controller;
    if (!exerciseList) {
      showInformationMessage(`Please generate chapter list before exports`);
      return;
    }

    allApplications.clear();

    await runTaskWithProgressBar(async (progress) => {
      progress.report({ message: `Start exporting exercises...` });
      const nExercises = Math.min(ExportExercises || exerciseList.length - 1, exerciseList.length - 1);
      progress.report({ message: `(${0}/${nExercises}) finished...` });
      for (let i = 1; i <= nExercises; i++) {
        const exercise = exerciseList.getAt(i);

        if (exercise) {
          await this.manager.switchAndTestBug(exercise);
          const app = allApplications.getById(1);
          if (!app) {
            throw new Error(`Export failed: no application found`);
          }
          exportApplicationToFile(app, getCurrentResearch().getAppZipFilePath(app));
          allApplications.clear();
        }

        progress.report({ message: `(${i}/${nExercises}) finished...`, increment: Math.floor(100 / nExercises) });
      }
    }, { title: `Export applications` });
  }
}


class DeleteExportedApplicationNode extends ToolNode {
  static makeLabel() {
    return `Delete all exported applications`;
  }

  async handleClick() {
    const { exerciseList } = this.controller;
    if (!exerciseList) {
      showInformationMessage(`Please generate chapter list before delete`);
      return;
    }

    await runTaskWithProgressBar(async (progress) => {
      progress.report({ message: `Listing exported files...` });
      const existingFiles = [];
      for (const exercise of exerciseList.getAll()) {
        const filePath = getCurrentResearch().getAppZipFilePath({ experimentId: exercise.id });
        if (fs.existsSync(filePath)) {
          existingFiles.push(filePath);
        }
      }

      if (existingFiles.length) {
        const result = await confirm(`Do you want to delete ${existingFiles.length} exported application file(s)?`);
        if (result) {
          for (const filePath of existingFiles) {
            fs.rmSync(filePath);
          }
          showInformationMessage(`${existingFiles.length} file(s) deleted successfully.`);
        }
      }
      else {
        showInformationMessage(`No exported file found`);
      }
    }, { title: `Delete exported applications` });
  }
}

class GeneratePatchNode extends ToolNode {
  static makeLabel() {
    return `Generate Patch`;
  }

  async handleClick() {
    const { project } = this.controller;
    const patchString = await project.getPatchString();
    const editor = await showTextInNewFile('diff.diff', patchString);
    const result = await confirm(`Do you want to save the patch?`, false);

    if (window.activeTextEditor === editor) {
      await commands.executeCommand('workbench.action.closeActiveEditor');
    }

    if (!result) {
      return;
    }

    const name = await window.showInputBox({
      placeHolder: 'unnamed',
      prompt: 'Patch file name'
    });

    if (!name) {
      return;
    }

    const filePath = project.getPatchFile(name);
    fs.writeFileSync(filePath, patchString);

    // TODO: add exercise config depends on active application
    // this.controller.addExerciseConfig({ name, patch: basename(filePath, '.patch') });

    const msg = translate('savedSuccessfully', { fileName: filePath });
    await showInformationMessage(msg, {
      async 'Show File'() {
        await open(dirname(filePath));
      }
    });
  }
}

class ExportAllPDGScreenshotNode extends ToolNode {
  static makeLabel() {
    return `Export PDG Gallery`;
  }

  async handleClick() {
    // const exercises = this.controller.exerciseList.getAll().slice(113, 114);
    const exercises = this.controller.exerciseList.getAll();
    // const exercises = [this.controller.exerciseList.getById('javascript-algorithms#1')];
    // const exercises = this.controller.chapters.map(chapter => {
    //   const exercisesInChapter = chapter.exercises.getAll();
    //   return exercisesInChapter[Math.floor(exercisesInChapter.length / 2)];
    // });

    await this.controller.gallery.buildGalleryForExercises(exercises);
    // await this.controller.gallery.buildGalleryForExercises(exercises, true);
  }
}

class GenerateGraphsJSNode extends ToolNode {
  static makeLabel() {
    return `Generate graphs.js`;
  }

  async handleClick() {
    this.controller.gallery.generateGraphsJS();
  }
}

class TransformDestructuringNode extends ToolNode {
  static makeLabel() {
    return `Transform Destructing code`;
  }

  async handleClick() {
    if (!await confirm(`Have you made sure, the project is at the right commit and patch before doing this?`)) {
      return;
    }
    // const { projectPath } = this.controller.project;
    const fpaths = this.controller.gallery.getAllJSAFiles();
    await transformFiles(fpaths);
  }
}

// class InsertPDGTitleNode extends ToolNode {
//   static makeLabel() {
//     return `Insert PDG Title in pdgData.json from exerciseJs`;
//   }

//   async handleClick() {
//     await this.controller.gallery.insertPDGTitle();
//   }
// }

export default class ToolRootNode extends BaseTreeViewNode {
  static makeLabel() {
    return 'Tools';
  }

  get defaultCollapsibleState() {
    return TreeItemCollapsibleState.Expanded;
  }

  childClasses = [
    GenerateListNode,
    // ExportApplicationsForceNode,
    DeleteExportedApplicationNode,
    GeneratePatchNode,
    ExportAllPDGScreenshotNode,
    GenerateGraphsJSNode,
    TransformDestructuringNode,
  ]
}
