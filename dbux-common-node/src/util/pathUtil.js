import sh from 'shelljs';
import fs from 'fs';
import path from 'path';

/**
 * Get command executable path
 * @param {string} command the command being queried
 * @return {string} the actual path where `command` is
 */
export function whichNormalized(command) {
  const fpath = sh.which(command);
  return fpath ? pathNormalized(fpath.toString()) : null;
}

export function realPathSyncNormalized(fpath, options) {
  return pathNormalized(fs.realpathSync(fpath, options));
}

export function pathResolve(...paths) {
  return pathNormalized(path.resolve(...paths));
}

export function pathJoin(...paths) {
  return pathNormalized(path.join(...paths));
}

export function pathRelative(from, to) {
  from = pathNormalized(from);
  to = pathNormalized(to);
  const sep = '/';
  if (!from.endsWith(sep)) { from += '/'; }
  if (!to.endsWith(sep)) { to += '/'; }
  return pathNormalized(path.relative(from, to));
}


/**
 * @see https://github.com/microsoft/vscode/issues/9448
 * @see https://github.com/microsoft/vscode/commit/a6c845baf7fed4a186e3b744c5c14c0be53494fe
 */
export function normalizeDriveLetter(fpath) {
  if (fpath && fpath[1] === ':') {
    fpath = fpath[0].toUpperCase() + fpath.substr(1);
  }
  return fpath;
}

export function pathNormalized(fpath) {
  return fpath.replace(/\\/g, '/');
}

/**
 * In addition to standard normalization, also enforces upper-case drive letter.
 */
export function pathNormalizedForce(fpath) {
  return normalizeDriveLetter(pathNormalized(fpath));
}

export function parseNodeModuleName(fpath) {
  const matchResult = fpath.match(/(?<=node_modules[/\\])(?!node_modules)(?<packageName>[^/\\]+)(?=[/\\](?!node_modules).*)/);
  return matchResult?.groups.packageName || null;
}
