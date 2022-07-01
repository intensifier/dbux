import { TreeItemCollapsibleState } from 'vscode';
import fs from 'fs';
import EmptyArray from '@dbux/common/src/util/EmptyArray';
import { pathResolve } from '@dbux/common-node/src/util/pathUtil';
import allApplications from '@dbux/data/src/applications/allApplications';
import { importApplicationFromFile } from '@dbux/projects/src/dbux-analysis-tools/importExport';
import ChapterNode from '../projectViews/practiceView/ChapterNode';
import ExerciseNode from '../projectViews/practiceView/ExerciseNode';
import BaseTreeViewNode from '../codeUtil/treeView/BaseTreeViewNode';
import { runTaskWithProgressBar } from '../codeUtil/runTaskWithProgressBar';
import { confirm } from '../codeUtil/codeModals';
import { goToCodeLoc } from '../codeUtil/codeNav';
import { showPDGViewForArgs } from '../webViews/pdgWebView';
import { getCurrentResearch } from '../research/Research';

/** @typedef {import('@dbux/projects/src/projectLib/Chapter').default} Chapter */
/** @typedef {import('@dbux/projects/src/projectLib/Exercise').default} Exercise */
/** @typedef {import('../codeUtil/CodeApplication').CodeApplication} CodeApplication */


/** ###########################################################################
 * {@link PDGNode}
 *  #########################################################################*/

class PDGNode extends BaseTreeViewNode {
  static makeLabel(entry, parent, moreProp) {
    return moreProp.pdgTitle;
  }

  /**
   * @type {Exercise}
   */
  get exercise() {
    return this.parent.exercise;
  }

  makeIconPath() {
    return '';
  }

  async handleClick() {
    let { applicationUuid, contextId, algoLoc: { filePath, loc } } = this;
    let application = allApplications.getById(applicationUuid);
    const fullContextFilePath = pathResolve(this.exercise.project.projectPath, filePath);
    if (!application) {
      const appFilePath = getCurrentResearch().getAppZipFilePath({ experimentId: this.exercise.id });
      if (fs.existsSync(appFilePath)) {
        await importApplicationFromFile(appFilePath);
      }
      else {
        const result = await confirm(`No application file found. Do you want to run the exercise?`);
        if (result) {
          // get new application
          application = await this.treeNodeProvider.controller.runAndExportPDGApplication(this.exercise);

          const newFilePath = application.dataProvider.util.getContextFilePath(contextId);
          if (newFilePath !== fullContextFilePath) {
            this.treeNodeProvider.logger.error(`Ran test, but context is not in original file anymore. Test data probably outdated.`);
          }
          ({ applicationUuid } = application);
        }
        else {
          return;
        }
      }
    }
    await showPDGViewForArgs({ applicationUuid, contextId });
    await goToCodeLoc(fullContextFilePath, loc);
  }
}


/** ###########################################################################
 * {@link PDGExerciseNode}
 *  #########################################################################*/

class PDGExerciseNode extends ExerciseNode {
  get contextValue() {
    return 'dbuxChapterListBuilderView.PDGExerciseNode';
  }

  makeIconPath() {
    return '';
  }

  canHaveChildren() {
    return true;
  }

  async runPDG() {
    const { exercise } = this;
    allApplications.clear();

    await runTaskWithProgressBar(async (progress) => {
      await this.treeNodeProvider.controller.runAndExportPDGApplication(exercise, progress);
    }, { title: `Run PDG` });
  }

  buildChildren() {
    if (this.exercise.pdgs) {
      return this.exercise.pdgs.map((pdgData) => {
        return this.treeNodeProvider.buildNode(PDGNode, null, this, pdgData);
      });
    }
    return EmptyArray;
  }
}

/** ###########################################################################
 * {@link ExerciseChapterNode}
 *  #########################################################################*/

class ExerciseChapterNode extends ChapterNode {
  get ExerciseNodeClass() {
    return PDGExerciseNode;
  }
}

/** ###########################################################################
 * {@link ExerciseChapterGroupNode}
 *  #########################################################################*/

class ExerciseChapterGroupNode extends BaseTreeViewNode {
  static makeLabel(entry, parent, moreProp) {
    return moreProp.keyword;
  }

  canHaveChildren() {
    return true;
  }

  init() {
    this.description = `(${this.entry.length})`;
  }

  buildChildren() {
    return this.entry.map(chapter => this.treeNodeProvider.buildNode(ExerciseChapterNode, chapter, this));
  }
}

export default class ChapterListNode extends BaseTreeViewNode {
  static makeLabel() {
    return 'Chapters';
  }

  get defaultCollapsibleState() {
    return TreeItemCollapsibleState.Expanded;
  }

  /**
   * @type {Chapter[]}
   */
  get chapters() {
    return this.entry;
  }

  buildChildren() {
    const chaptersByGroup = new Map();
    for (const chapter of this.chapters) {
      const { group } = chapter;
      if (!chaptersByGroup.has(group)) {
        chaptersByGroup.set(group, []);
      }
      chaptersByGroup.get(group).push(chapter);
    }

    return Array.from(chaptersByGroup.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([keyword, chapters]) => this.treeNodeProvider.buildNode(ExerciseChapterGroupNode, chapters, this, { keyword }));
  }
}