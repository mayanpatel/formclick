const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function createHarness() {
  const elements = new Map();
  const contexts = [];
  const classList = () => {
    const values = new Set();
    return {
      add: (value) => values.add(value),
      remove: (value) => values.delete(value),
      contains: (value) => values.has(value)
    };
  };
  const element = () => ({
    classList: classList(),
    setAttribute() {},
    value: "",
    textContent: "",
    hidden: false,
    disabled: false
  });
  const document = {
    querySelector(selector) {
      if (!elements.has(selector)) {
        elements.set(selector, element());
      }
      return elements.get(selector);
    },
    querySelectorAll: () => [],
    body: { dataset: {}, classList: classList() }
  };

  class FakeAudioContext {
    constructor() {
      this.state = "running";
      this.clockStartMs = Date.now();
      this.clockReadyAt = this.clockStartMs;
      this.clockOffset = 0;
      this.resumeDelayMs = 0;
      this.clockDelayMs = 0;
      this.stuck = false;
      contexts.push(this);
    }

    get currentTime() {
      if (this.state !== "running" || this.frozen || Date.now() < this.clockReadyAt) {
        return this.clockOffset;
      }
      return this.clockOffset + (Date.now() - this.clockStartMs) / 1000;
    }

    freeze() {
      this.clockOffset = this.currentTime;
      this.frozen = true;
    }

    interrupt() {
      this.clockOffset = this.currentTime;
      this.state = "interrupted";
      this.onstatechange?.();
    }

    resume() {
      if (this.stuck) {
        return new Promise(() => {});
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          this.state = "running";
          this.clockStartMs = Date.now() + this.clockDelayMs;
          this.clockReadyAt = this.clockStartMs;
          resolve();
        }, this.resumeDelayMs);
      });
    }

    close() {
      this.state = "closed";
      return Promise.resolve();
    }
  }

  const window = {
    AudioContext: FakeAudioContext,
    FormClickCore: require("../core.js"),
    setTimeout,
    clearTimeout,
    setInterval: () => 1,
    clearInterval() {},
    performance: { now: () => Date.now() }
  };
  const context = vm.createContext({
    window,
    document,
    navigator: {},
    console: { ...console, error() {} },
    Date
  });
  const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const initIndex = source.lastIndexOf("\ninit().catch");
  assert.ok(initIndex > 0, "Expected app initialization at the end of app.js");
  vm.runInContext(source.slice(0, initIndex), context);
  vm.runInContext("renderPosition = () => {}; requestWakeLock = () => {}; releaseWakeLock = () => {}", context);
  elements.get("#count-in").value = "1";

  return {
    contexts,
    elements,
    state: vm.runInContext("state", context),
    start: vm.runInContext("startMetronome", context),
    handleStartError: vm.runInContext("handleStartError", context),
    runScheduler: vm.runInContext("runScheduler", context)
  };
}

test("a slow Safari resume succeeds without a second tap", async () => {
  const app = createHarness();
  await app.start();
  const audio = app.state.audioContext;
  app.state.activeBeatIndex = 22;
  audio.interrupt();
  assert.equal(app.state.resumeBeatIndex, 20);
  assert.equal(app.state.audioContext, audio);

  audio.resumeDelayMs = 1200;
  audio.clockDelayMs = 350;
  const pending = app.start();
  assert.equal(app.elements.get("#start-stop").disabled, true);
  assert.equal(app.elements.get("#transport-label").textContent, "Connecting...");
  await app.start();
  assert.equal(app.state.isPlaying, true);
  await pending;

  assert.equal(app.state.isPlaying, true);
  assert.equal(app.state.audioContext, audio);
  assert.equal(app.state.playbackBeatOffset, 20);
  assert.equal(app.elements.get("#start-stop").disabled, false);
  assert.equal(app.elements.get("#transport-label").textContent, "Stop");
});

test("a stuck context is retained once, then replaced on retry", async () => {
  const app = createHarness();
  await app.start();
  const audio = app.state.audioContext;
  app.state.activeBeatIndex = 12;
  audio.interrupt();
  audio.stuck = true;

  await assert.rejects(app.start(), /did not reach running state/);
  app.handleStartError(new Error("Audio did not reach running state (interrupted)"));
  assert.equal(app.state.audioNeedsReset, true);
  assert.equal(app.state.audioContext, audio);
  assert.equal(app.elements.get("#start-stop").disabled, false);

  await app.start();
  assert.equal(audio.state, "closed");
  assert.notEqual(app.state.audioContext, audio);
  assert.equal(app.state.isPlaying, true);
  assert.equal(app.state.playbackBeatOffset, 12);
});

test("a frozen playback clock resets audio on the first Resume", async () => {
  const app = createHarness();
  await app.start();
  const audio = app.state.audioContext;
  app.state.activeBeatIndex = 16;
  audio.freeze();
  app.state.audioClockTime = audio.currentTime;
  app.state.audioClockProgressMs = Date.now() - 2000;

  app.runScheduler();
  assert.equal(app.state.isPlaying, false);
  assert.equal(app.state.resumeBeatIndex, 16);
  assert.equal(app.state.audioNeedsReset, true);

  await app.start();
  assert.equal(audio.state, "closed");
  assert.notEqual(app.state.audioContext, audio);
  assert.equal(app.state.isPlaying, true);
});
