import fs from 'fs';
import EmptyArray from '@dbux/common/src/util/EmptyArray';
import sleep from '@dbux/common/src/util/sleep';
import { newLogger } from '@dbux/common/src/log/logger';
import { pathRelative, pathResolve } from '@dbux/common-node/src/util/pathUtil';
import allApplications from '@dbux/data/src/applications/allApplications';
import { exportApplicationToFile } from '@dbux/projects/src/dbux-analysis-tools/importExport';
import { makeContextLabel } from '@dbux/data/src/helpers/makeLabels';
import { deleteCachedLocRange } from '@dbux/data/src/util/misc';
import { getProjectManager } from '../projectViews/projectControl';
import ChapterListBuilderNodeProvider from './ChapterListBuilderNodeProvider';
import { getCurrentResearch } from '../research/Research';
import PDGGallery from './PDGGallery';

/** @typedef {import('@dbux/projects/src/projectLib/Exercise').default} Exercise */
/** @typedef {import('@dbux/projects/src/projectLib/ExerciseConfig').default} ExerciseConfig */
/** @typedef {import('../codeUtil/CodeApplication').CodeApplication} CodeApplication */

// eslint-disable-next-line no-unused-vars
const { log, debug, warn, error: logError } = newLogger('ChapterListBuilderViewController');

let controller;
const ProjectName = 'javascript-algorithms';
const ExerciseListName = 'javascript-algorithms-all';
const CustomConfigName = 'javascript-algorithms-all-custom-config';
const ChapterListName = ExerciseListName;
const ExerciseListFileName = `${ExerciseListName}.js`;
const ChapterListFileName = `${ChapterListName}.js`;

export default class ChapterListBuilderViewController {
  /**
   * @type {Map<string, ExerciseConfig>}
   */
  exerciseConfigsByName;

  constructor() {
    this.treeNodeProvider = new ChapterListBuilderNodeProvider(this);
    this.gallery = new PDGGallery(this);
  }

  get treeView() {
    return this.treeNodeProvider.treeView;
  }

  get manager() {
    return getProjectManager();
  }

  get project() {
    return this.manager.projects.getByName(ProjectName);
  }

  writeExerciseJs(exerciseConfigs = this.exerciseConfigs) {
    const filePath = this.manager.getAssetPath('exercises', ExerciseListFileName);
    const content = `module.exports = ${JSON.stringify(exerciseConfigs, null, 2)}`;
    fs.writeFileSync(filePath, content);
  }

  writeChapterListJs(exerciseList) {
    const exercisesByChapterName = new Map();
    for (const exercise of exerciseList) {
      const { chapter } = exercise;
      if (!exercisesByChapterName.has(chapter)) {
        exercisesByChapterName.set(chapter, []);
      }
      exercisesByChapterName.get(chapter).push(exercise);
    }

    const chapters = Array.from(exercisesByChapterName.entries()).map(([chapterName, exercises], index) => {
      return {
        id: index + 1,
        name: chapterName,
        group: exercises[0].chapterGroup,
        exercises: exercises.map(e => e.id),
      };
    });

    const filePath = this.manager.getAssetPath('chapterLists', ChapterListFileName);
    const content = `module.exports = ${JSON.stringify(chapters, null, 2)} `;
    fs.writeFileSync(filePath, content);
  }

  reloadExerciseList() {
    const exerciseFilePath = this.project.getExercisePath(ExerciseListName);
    const customExerciseConfigPath = this.project.getExercisePath(CustomConfigName);
    if (fs.existsSync(exerciseFilePath)) {
      this.exerciseConfigs = this.project.loadExerciseConfigs(ExerciseListName);
      this.exerciseConfigsByName = new Map();
      this.exerciseConfigs.forEach(config => this.exerciseConfigsByName.set(config.name, config));
      this.exerciseList = this.project.reloadExercises(ExerciseListName);
      if (fs.existsSync(customExerciseConfigPath)) {
        const customConfigs = this.project.loadExerciseConfigs(CustomConfigName);
        if (customConfigs.chapters) {
          const exercisesByChapters = new Map();
          for (const exercise of this.exerciseList.getAll()) {
            const { chapter } = exercise;
            if (!exercisesByChapters.get(chapter)) {
              exercisesByChapters.set(chapter, []);
            }
            exercisesByChapters.get(chapter).push(exercise);
          }

          for (const chapterConfig of customConfigs.chapters) {
            const { name: chapterName, ...configs } = chapterConfig;
            const exercises = exercisesByChapters.get(chapterName);
            if (!exercises) {
              throw new Error(`Unknown chapter name ${chapterName}`);
            }

            for (const exercise of exercises) {
              Object.assign(exercise, configs);
            }
          }
        }

        if (customConfigs.exercises) {
          for (const exerciseConfig of customConfigs.exercises) {
            const { name: exerciseName, ...configs } = exerciseConfig;
            const exercise = this.exerciseList.getByName(exerciseName);
            if (!exercise) {
              debugger;
              throw new Error(`Unknown exercise name ${exerciseName}`);
            }
            Object.assign(exercise, configs);
          }
        }
      }

      return this.exerciseList;
    }
    return null;
  }

  reloadChapterList() {
    if (fs.existsSync(this.project.getAssetPath('chapterLists', ChapterListFileName))) {
      this.chapters = this.manager.reloadChapterList(ChapterListName);
      return this.chapters;
    }
    return null;
  }

  // addExerciseConfig() {
  //   const configs = this.project.loadExerciseConfigs(ExerciseListName);
  //   configs.push()
  // }

  init() {
    this.reloadExerciseList();
    this.reloadChapterList();
    this.treeNodeProvider.refresh();
  }

  initOnActivate(context) {
    // click event listener
    this.treeNodeProvider.initDefaultClickCommand(context);
  }

  /**
   * Run exercise, parse its PDG args and save it into exercise.js
   * @param {Exercise} exercise 
   */
  async runAndExportPDGApplication(exercise, progress) {
    progress?.report({ message: `Running exercises...` });
    await this.treeNodeProvider.manager.switchAndTestBug(exercise);

    const app = allApplications.selection.getFirst();

    if (!app) {
      throw new Error(`Run failed. No application found.`);
    }

    while (app.dataProvider.indexes.dataNodes.byAccessId.getAll().length < 1) {
      // hackfix race condition prevention: make sure, data has been stored before exporting
      await sleep(20);
    }

    // future-work: make sure, this is the right application (add some isApplicationOfExercise function)

    progress?.report({ message: `Parsing application` });
    if (allApplications.selection.count !== 1) {
      warn(`Ran test, but found more than one application (selecting first).`);
    }
    const pdgs = this.findPDGContextIdInApp(app, exercise);
    exercise.pdgs = pdgs;

    progress?.report({ message: `Storing results and exporting application...` });
    const config = this.exerciseConfigsByName.get(exercise.name);
    config.pdgs = pdgs;

    // write exercise file
    this.writeExerciseJs();

    // export application
    const fpath = getCurrentResearch().getAppZipFilePath(app);
    exportApplicationToFile(app, fpath);

    // showInformationMessage(`Found ${pdgs.length} pdg(s).`);
    this.treeNodeProvider.refresh();

    return app;
  }

  /** ###########################################################################
   * util
   *  #########################################################################*/

  /**
   * NOTE: Only include files that match `src/algorithms/${chapterGroup}/${chapter}/${fileName}`
   */
  isValidPDGFilePath(filePath) {
    // TODO: use exercise group, chapter to choose files in same chatper folder
    // const { group, chapter } = exercise;
    // const pattern = `src/algorithms/${group}/${chapter}/([^/]*.js)`;
    // const re = new RegExp(pattern);
    const ValidFilePattern = /src\/algorithms\/([^/]*)\/([^/]*)\/([^/]*.js)$/;
    return ValidFilePattern.test(filePath);
  }

  /**
   * NOTE: Only include files that match `src/algorithms/${chapterGroup}/${chapter}/(__test__|_test_|__tests__)/${fileName}.js`
   *  e.g.:
   *    `src/algorithms/cryptography/hill-cipher/_test_/hillCipher.test.js`,
   *    `src/algorithms/math/matrix/__tests__/Matrix.test.js`
   *  but not:
   *    `src/algorithms/sorting/__test__/Sort.test.js`,
   */
  parseTestFilePath(testFilePath) {
    const ValidTestFilePattern = /src\/algorithms\/([^/]*)\/([^/]*)\/(__test__|_test_|__tests__)\/([^/]*.js)$/;
    const matchResult = testFilePath.match(ValidTestFilePattern);
    if (matchResult) {
      return {
        chapterGroup: matchResult[1],
        chapter: matchResult[2],
        fileName: matchResult[3],
      };
    }
    else {
      return null;
    }
  }

  /**
   * @param {CodeApplication} app 
   * @param {Exercise} exercise
   */
  findPDGContextIdInApp(app, exercise) {
    const { project } = exercise;
    const dp = app.dataProvider;
    const testFilePath = pathResolve(project.projectPath, exercise.testFilePaths[0]);
    const validPDGProgramContexts = dp.collections.staticProgramContexts.getAllActual().filter((staticProgramContext) => {
      const { filePath } = staticProgramContext;
      // const fileDir = dirname(filePath);
      // const readmeFilePath = pathResolve(fileDir, 'README.md');
      // const testFolderPath = pathResolve(fileDir, '__test__');

      // return filePath.includes('src/algorithms') && fs.existsSync(readmeFilePath) && fs.existsSync(testFolderPath);
      return this.isValidPDGFilePath(filePath);
    });

    const staticContexts = validPDGProgramContexts.flatMap(({ programId }) => dp.indexes.staticContexts.byFile.get(programId) || EmptyArray);
    const contexts = staticContexts
      .flatMap(({ staticContextId }) => dp.indexes.executionContexts.byStaticContext.get(staticContextId) || EmptyArray)
      .sort((a, b) => a.contextId - b.contextId);
    const addedContextIds = new Set();
    return contexts.map(context => {
      const { contextId } = context;
      const { applicationUuid } = app;
      const functionName = makeContextLabel(context, app);
      const callerTrace = dp.util.getOwnCallerTraceOfContext(contextId);
      if (!callerTrace) {
        return null;
      }

      // filter out children of added contexts
      let { parentContextId } = context;
      while (parentContextId) {
        if (addedContextIds.has(parentContextId)) {
          return null;
        }
        ({ parentContextId } = dp.util.getExecutionContext(parentContextId));
      }
      addedContextIds.add(contextId);

      // const callerProgramPath = dp.util.getTraceFilePath(callerTrace.traceId);
      // if (callerProgramPath !== testFilePath) {
      //   return null;
      // }

      // find test context in ancestors
      let testContextId;
      ({ parentContextId } = context);
      while (parentContextId) {
        if (testFilePath === dp.util.getContextFilePath(parentContextId)) {
          testContextId = parentContextId;
          break;
        }
        ({ parentContextId } = dp.util.getExecutionContext(parentContextId));
      }

      const params = dp.util.getCallArgValueStrings(callerTrace.callId);

      return {
        pdgTitle: `${functionName}(${params.join(', ')})`,
        contextId,
        // fullContextFilePath,
        algoLoc: this.getLocOfContext(dp, contextId, project.projectPath),
        testLoc: testContextId ? this.getLocOfContext(dp, testContextId, project.projectPath) : null,
        applicationUuid,
      };
    }).filter(x => !!x);
  }

  /** ###########################################################################
   * util
   *  #########################################################################*/

  getLocOfContext(dp, contextId, projectPath) {
    const fullContextFilePath = dp.util.getContextFilePath(contextId);
    const filePath = pathRelative(projectPath, fullContextFilePath);
    const staticContext = dp.util.getContextStaticContext(contextId);
    const loc = { ...staticContext.loc };
    deleteCachedLocRange(loc);

    return {
      filePath,
      loc,
    };
  }
}

// ###########################################################################
// init
// ###########################################################################

export async function initDbuxPdgView(context) {
  controller = new ChapterListBuilderViewController();
  controller.initOnActivate(context);

  // refresh right away
  controller.treeNodeProvider.refresh();

  await controller.init();

  return controller;
}
