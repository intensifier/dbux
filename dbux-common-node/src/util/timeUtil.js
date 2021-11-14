import { performance } from '@dbux/common/src/util/universalLibs';

export function performanceNow() {
  return performance.now();
}

export function getPrettyPerformanceDelta(start, end = performanceNow()) {
  const delta = ((end - start) / 1000).toFixed(2);
  return `${delta}s`;
}

export class PrettyTimer {
  startTime;
  endTime;

  constructor(startNow = true) {
    if (startNow) {
      this.start();
    }
  }

  reset() {
    this.startTime = this.endTime = null;
  }

  start() {
    if (this.startTime) {
      throw new Error(`Tried to start PrettyTimer, but started already.`);
    }
    this.startTime = performanceNow();
  }

  stop() {
    if (!this.startTime) {
      throw new Error(`Tried to stop PrettyTimer, but did not start yet.`);
    }
    if (this.endTime) {
      throw new Error(`Tried to stop PrettyTimer, but stopped already.`);
    }
    this.endTime = performanceNow();
  }

  getFinalTimeSeconds() {
    if (!this.endTime()) {
      this.stop();
    }
    return this.endTime - this.startTime;
  }

  print(printFun, msg) {
    printFun(`[perf] ${msg}: ${this}`);
  }

  toString() {
    if (!this.startTime) {
      throw new Error(`Tried to print PrettyTimer, but did not start yet.`);
    }

    let to = this.endTime;
    if (!to) {
      // throw new Error(`Tried to print PrettyTimer, but did not stop yet.`);
      // this.stop();
      to = performanceNow();
    }
    return getPrettyPerformanceDelta(this.startTime, to);
  }
}


export function startPrettyTimer() {
  return new PrettyTimer();
}