import fs from 'fs';
import path, { basename } from 'path';
import open from 'open';
import { newLogger } from '@dbux/common/src/log/logger';
import NestedError from '@dbux/common/src/NestedError';
import { pathJoin, pathRelative, pathResolve } from '@dbux/common-node/src/util/pathUtil';
import allApplications from '@dbux/data/src/applications/allApplications';
import { buildDot } from '@dbux/data/src/pdg/DotBuilder';
import isPlainObject from 'lodash/isPlainObject';
import { PDGRootTimelineId } from '@dbux/data/src/pdg/constants';
import { RootSummaryModes } from '@dbux/data/src/pdg/PDGSummaryMode';
import PDGSettings from '@dbux/data/src/pdg/PDGSettings';
import { runTaskWithProgressBar } from '../codeUtil/runTaskWithProgressBar';
import { showInformationMessage } from '../codeUtil/codeModals';
import { showTextInNewFile } from '../codeUtil/codeNav';
import { translate } from '../lang';
import { getCurrentResearch } from '../research/Research';

/** @typedef {import('@dbux/projects/src/projectLib/Exercise').default}Exercise*/
/** @typedef {import('./pDGViewController').default} PDGViewController */

// eslint-disable-next-line no-unused-vars
const { log, debug, warn, error: logError } = newLogger('PDGGallery');

const PDGFileName = 'pdgData.json';

class PDGRenderData {

}

/** ###########################################################################
 * {@link PDGGallery}
 * ##########################################################################*/

export default class PDGGallery {
  /**
   * @type {PDGViewController} 
   */
  controller;

  constructor(controller) {
    this.controller = controller;
    if (!process.env.DBUX_ROOT) {
      throw new Error(`Cannot find DBUX_ROOT and RESEARCH_ENABLED missing (but required) for PDGGallery to work`);
    }
  }

  get galleryDataRoot() {
    return getCurrentResearch().getPdgGalleryFolder(true);
  }

  getExerciseFolder(exercise, ...segments) {
    const { chapterGroup, chapter, id } = exercise;
    return pathResolve(this.galleryDataRoot, chapterGroup, chapter, id, ...segments);
  }

  /** ###########################################################################
   * gallery
   * ##########################################################################*/

  async getAllExercisePDGArgs(exercise) {
    allApplications.clear();

    const pdgArgs = await this.controller.importOrRunPDGApplication(exercise);

    // only pick the middle one for now
    // return [pdgArgs[Math.floor(pdgArgs.length / 2)]];
    return pdgArgs;
  }

  // makePDGRenderDataUniqueId(exercise, renderDataId) {
  //   const { chapterGroup, chapter, id } = exercise;
  //   return `${chapterGroup}_${chapter}_${id}_${renderDataId}`;
  // }

  getPDGScreenshotData(dp, exercise, pdgArg) {
    // generate screenshot configs
    const galleryConfig = exercise.gallery;
    let screenshotConfigs;
    if (galleryConfig === false) {
      return null;
    }
    else if (galleryConfig?.screenshotConfigs) {
      ({ screenshotConfigs } = galleryConfig);
    }
    else {
      screenshotConfigs = RootSummaryModes.map((rootSummaryMode) => {
        const settings = new PDGSettings();
        settings.extraVertical = true;
        return {
          rootSummaryMode,
          settings,
        };
      });
    }
    // else {
    //   throw new Error(`Invalid gallery config of exercise "${exercise.id}": ${galleryConfig}`);
    // }

    let lastDot;
    const screenshots = [];

    for (let k = 0; k < screenshotConfigs.length; k++) {
      const screenshotConfig = screenshotConfigs[k];
      const { settings, rootSummaryMode } = screenshotConfig;
      try {
        const pdg = dp.pdgs.getOrCreatePDG(pdgArg);
        pdg.updateSettings(settings);
        pdg.setSummaryMode(PDGRootTimelineId, rootSummaryMode);

        const dot = buildDot(pdg);

        if (dot === lastDot) {
          screenshots.push({
            sameAs: k - 1,
            settings,
            rootSummaryMode
          });
        }
        else {
          lastDot = dot;
          screenshots.push({ dot, settings, rootSummaryMode });
        }
      }
      catch (err) {
        screenshots.push({
          crash: true,
          failedReason: err.message,
          error: err.stack,
          settings,
          rootSummaryMode,
        });
      }
    }
    return screenshots;
  }

  /**
   * @return {PDGRenderData}
   */
  makePDGRenderData(exercise, pdgArgs) {
    const {
      chapterGroup,
      chapter,
      algo,
    } = exercise;
    const { pdgTitle } = pdgArgs;

    return {
      pdgTitle,
      // uniqueId: this.getPDGRenderDataUniqueId(exercise, renderId),
      chapterGroup,
      chapter,
      algo,
      testLoc: pdgArgs.testLoc,
      algoLoc: pdgArgs.algoLoc
    };
  }

  getPDGRenderData(exercise, allPdgArgs) {
    let renderDataId = 0;
    /**
     * @type {PDGRenderData[]}
     */
    const pdgRenderDataArray = [];

    for (let j = 0; j < allPdgArgs.length; j++) {
      const pdgArgs = allPdgArgs[j];
      const app = allApplications.getById(pdgArgs.applicationUuid);
      const dp = app.dataProvider;

      const failedReason = dp.pdgs.getCreatePDGFailureReason(pdgArgs);

      /**
       * @type {PDGRenderData}
       */
      const data = this.makePDGRenderData(exercise, pdgArgs);
      pdgRenderDataArray.push(data);

      data.renderId = ++renderDataId;
      if (failedReason) {
        data.failedReason = failedReason;
      }
      else {
        data.screenshots = this.getPDGScreenshotData(dp, exercise, pdgArgs);
      }
    }
    return pdgRenderDataArray;
  }

  /**
   * @param {Exercise[]} exercises
   */
  async buildGalleryForExercises(exercises, force = false) {
    await runTaskWithProgressBar(async (progress) => {
      for (let i = 0; i < exercises.length; i++) {
        const exercise = exercises[i];
        if (exercise.ignore) {
          continue;
        }
        if (exercise.gallery === false) {
          continue;
        }
        progress.report({ message: `Exercise ${i + 1}/${exercises.length}: "${exercise.label}"` });

        const exerciseFolderPath = this.getExerciseFolder(exercise);
        const renderDataJsonFilePath = pathJoin(exerciseFolderPath, PDGFileName);
        if (!force && fs.existsSync(renderDataJsonFilePath)) {
          log(`pdgData.json exists for exercise ${exercise.id}, skipped.`);
          continue;
        }
        if (!fs.existsSync(exerciseFolderPath)) {
          fs.mkdirSync(exerciseFolderPath, { recursive: true });
        }

        try {
          const pdgArgs = await this.getAllExercisePDGArgs(exercise);
          const pdgRenderDataArray = this.getPDGRenderData(exercise, pdgArgs);
          fs.writeFileSync(renderDataJsonFilePath, JSON.stringify(pdgRenderDataArray, null, 2));
        }
        catch (err) {
          // failed to execute application
          fs.writeFileSync(renderDataJsonFilePath, JSON.stringify({
            runFailed: true,
            failedReason: err.message,
            error: err.stack.replaceAll()
          }, null, 2));
        }
      }
    }, { title: `Generating gallery` });
    // log(`gallery.getAllExercisePDGArgs() = `, args);
  }

  /** ###########################################################################
   * graphs.js
   * ##########################################################################*/

  generateGraphsJS() {
    let lastExerciseId = 0;
    const exportData = {
      chapterGroups: [],
    }; 

    const chapterGroups = fs.readdirSync(this.galleryDataRoot);
    for (const chapterGroupName of chapterGroups) {
      const chapterGroup = {
        name: chapterGroupName,
        chapters: [],
      };
      const chapterGroupFolderPath = pathJoin(this.galleryDataRoot, chapterGroupName);
      if (!fs.lstatSync(chapterGroupFolderPath).isDirectory()) {
        continue;
      }

      const chapters = fs.readdirSync(chapterGroupFolderPath);
      for (const chapterName of chapters) {
        const chapter = {
          name: chapterName,
          exercises: [],
        };
        const chapterFolderPath = pathJoin(chapterGroupFolderPath, chapterName);
        for (const exerciseId of fs.readdirSync(chapterFolderPath)) {
          const exerciseFolderPath = pathJoin(chapterFolderPath, exerciseId);
          const pdgFilePath = pathJoin(exerciseFolderPath, PDGFileName);
          if (!fs.existsSync(pdgFilePath)) {
            continue;
          }

          const { label, name, algo, pdgs } = this.controller.exerciseList.getById(exerciseId);
          // const globalExerciseId = ++lastExerciseId;
          // const importVariableName = `pdg${globalExerciseId}`;
          const exercise = {
            id: exerciseId,
            algo,
            label,
            name,
            pdgs
          };
          chapter.exercises.push(exercise);
        }
        chapterGroup.chapters.push(chapter);
      }

      exportData.chapterGroups.push(chapterGroup);
    }

    let output = '';
    // importData.forEach(({ importVariableName, importFilePath }) => output += `import ${importVariableName} from '${importFilePath}';\n`);
    output += 'export default ';
    const exportString = JSON.stringify(exportData, null, 2); //.replaceAll(/"pdgs": "(pdg\d*)"/g, '"pdgs": $1');
    output += exportString;

    const graphJSPath = pathJoin(this.galleryDataRoot, 'graphs.js');
    fs.writeFileSync(graphJSPath, output);

    const msg = translate('savedSuccessfully', { fileName: graphJSPath });
    showInformationMessage(msg, {
      async 'Show File'() {
        await open(path.dirname(graphJSPath));
      }
    });
  }

  /** ###########################################################################
   * util
   * ##########################################################################*/


  getAllJSAFiles() {
    const jsaRoot = pathJoin(this.controller.project.projectPath, 'src');
    const fpaths = getFilesRecursive(jsaRoot);
    log(`${fpaths.length} files found (in "${jsaRoot}"):\n  ${fpaths.map(f => f.replaceAll(jsaRoot + '/', '')).join('\n  ')}`);
    return fpaths;
  }

  /**
   * @deprecated
   */
  getAllPDGFiles() {
    const allFiles = [];
    const chapterGroups = fs.readdirSync(this.galleryDataRoot);
    for (const chapterGroup of chapterGroups) {
      const chapterGroupFolderPath = pathJoin(this.galleryDataRoot, chapterGroup);
      if (!fs.lstatSync(chapterGroupFolderPath).isDirectory()) {
        continue;
      }
      const chapters = fs.readdirSync(chapterGroupFolderPath);
      for (const chapter of chapters) {
        const chapterFolderPath = pathJoin(chapterGroupFolderPath, chapter);
        for (const exerciseId of fs.readdirSync(chapterFolderPath)) {
          const exerciseFolderPath = pathJoin(chapterFolderPath, exerciseId);
          const pdgFilePath = pathJoin(exerciseFolderPath, PDGFileName);
          if (!fs.existsSync(pdgFilePath)) {
            continue;
          }
          allFiles.push({ 
            chapterGroup, chapter, exerciseId, filePath: pdgFilePath
          });
        }
      }
    }
    return allFiles;
  }
}

/**
 * @see https://stackoverflow.com/a/16684530
 */
function getFilesRecursive(dir) {
  let results = [];
  let list = fs.readdirSync(dir);
  list.forEach(function (fname) {
    const file = pathJoin(dir, fname);
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (fname.match(/(node_modules|\.dist)/)) {
        return;
      }
      /* Recurse into a subdirectory */
      results = results.concat(getFilesRecursive(file));
    } else {
      if (!fname.match(/\.js$/)) {
        return;
      }
      /* Is a file */
      results.push(file);
    }
  });
  return results;
}
