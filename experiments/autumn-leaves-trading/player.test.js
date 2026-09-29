const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { Midi } = require("./vendor/Midi.js");
const { CHORDS, isBackingBar } = require("./chart.js");

const bytes = fs.readFileSync(require.resolve("./autumn-leaves-trading.mid"));
const midi = new Midi(bytes);
const notes = midi.tracks[0].notes;
assert.equal(CHORDS.length, 32);
assert.equal(midi.tracks.length, 1);
assert.equal(notes.length, 73);
assert.ok(Math.abs(midi.header.tempos[0].bpm - 136) < .01);

const phraseStarts = [0, 8, 16, 24];
assert.deepEqual(phraseStarts.map((bar) => notes.filter((note) => {
  const beat = note.ticks / midi.header.ppq;
  return beat >= bar * 4 && beat < (bar + 4) * 4;
}).length), [18, 19, 19, 17]);
assert.deepEqual(phraseStarts.map((bar) => {
  const first = notes.find((note) => note.ticks / midi.header.ppq >= bar * 4);
  return Math.round((first.ticks / midi.header.ppq - bar * 4) * 100) / 100;
}), [0, .4, 0, .55]);

for (const note of notes) {
  const startBeat = note.ticks / midi.header.ppq;
  const endBeat = (note.ticks + note.durationTicks) / midi.header.ppq;
  const bar = Math.floor(startBeat / 4);
  const phraseEnd = (Math.floor(bar / 4) + 1) * 16;
  assert.ok(isBackingBar(bar), `MIDI note enters Your solo at bar ${bar + 1}`);
  assert.ok(endBeat <= phraseEnd, `MIDI note crosses the bar ${bar + 4 - bar % 4} trade boundary`);
  assert.ok(note.midi >= 42 && note.midi <= 57, `Note ${note.name} falls outside the bass solo register`);
  assert.ok(note.velocity > 0 && note.velocity <= 1);
}

for (let index = 1; index < notes.length; index++) {
  const previous = notes[index - 1];
  const next = notes[index];
  assert.ok(previous.ticks + previous.durationTicks <= next.ticks, "Solo notes overlap");
}

const dataContext = vm.createContext({});
vm.runInContext(fs.readFileSync(require.resolve("./midi-data.js"), "utf8"), dataContext);
const base64 = vm.runInContext("MIDI_BASE64", dataContext);
assert.deepEqual(Buffer.from(base64, "base64"), bytes);
global.window = { atob: (value) => Buffer.from(value, "base64").toString("binary") };
const { parseTake } = require("./player.js");
assert.equal(parseTake(base64, Midi).track.notes.length, 73);
delete global.window;

function fakeElement() {
  return {
    value: "",
    children: [],
    listeners: {},
    classList: { toggle() {} },
    append(child) { this.children.push(child); },
    addEventListener(name, listener) { this.listeners[name] = listener; },
    setAttribute() {},
    click() { this.listeners.click(); }
  };
}

async function testPlayback() {
  const elements = Object.fromEntries(
    ["bpm", "play", "readout", "turn", "bar", "chord", "chorus", "beat-dots", "grid", "status"]
      .map((id) => [id, fakeElement()])
  );
  elements.bpm.value = "136";
  elements["beat-dots"].children = Array.from({ length: 4 }, fakeElement);
  const scheduled = [];
  const played = [];
  const transport = {
    PPQ: 192,
    bpm: { value: 120 },
    cancel() { scheduled.length = 0; },
    schedule(callback, position) { scheduled.push({ callback, position }); },
    scheduleRepeat(callback) { this.beatCallback = callback; },
    start() { this.started = true; },
    stop() { this.started = false; }
  };
  let sampler;
  class FakeSampler {
    constructor(options) { this.options = options; this.volume = {}; sampler = this; }
    toDestination() { return this; }
    triggerAttackRelease(...args) { played.push(args); }
    releaseAll() { this.released = true; }
  }
  const Tone = {
    start: () => Promise.resolve(),
    loaded: () => Promise.resolve(),
    Sampler: FakeSampler,
    getTransport: () => transport,
    getDraw: () => ({ schedule(callback) { callback(); } })
  };
  const document = {
    hidden: false,
    querySelector(selector) { return elements[selector.slice(1)]; },
    createElement() { return fakeElement(); },
    addEventListener() {}
  };
  const window = { atob: (value) => Buffer.from(value, "base64").toString("binary") };
  const context = vm.createContext({ document, window, Tone, Midi, Uint8Array });
  for (const file of ["chart.js", "samples.js", "midi-data.js", "player.js"]) {
    vm.runInContext(fs.readFileSync(require.resolve(`./${file}`), "utf8"), context);
  }

  elements.play.click();
  await new Promise(setImmediate);
  assert.equal(elements.play.textContent, "Stop");
  assert.equal(elements.bpm.disabled, true);
  assert.equal(transport.loopEnd, "32m");
  assert.equal(scheduled.length, notes.length);
  assert.equal(Object.keys(sampler.options.urls).length, 5);
  scheduled[0].callback(0.1);
  assert.equal(played[0][0], notes[0].name);
  transport.beatCallback(0.1);
  assert.equal(elements.bar.textContent, "1");
  elements.play.click();
  assert.equal(transport.started, false);
  assert.equal(scheduled.length, 0);
  assert.equal(sampler.released, true);
  assert.equal(elements.play.textContent, "Start");
}

testPlayback().then(() => console.log("Autumn Leaves MIDI experiment tests passed"));
