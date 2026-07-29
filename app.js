const core = window.FormClickCore;

const forms = {
  aaba32: {
    name: "32-bar AABA",
    sections: [
      { label: "A", bars: 8 },
      { label: "A", bars: 8 },
      { label: "B", bars: 8 },
      { label: "A", bars: 8 }
    ]
  },
  abac32: {
    name: "32-bar ABAC",
    sections: [
      { label: "A", bars: 8 },
      { label: "B", bars: 8 },
      { label: "A", bars: 8 },
      { label: "C", bars: 8 }
    ]
  },
  blues12: {
    name: "12-bar Blues",
    sections: [
      { label: "I", bars: 4 },
      { label: "IV", bars: 4 },
      { label: "V", bars: 4 }
    ]
  },
  rhythm32: {
    name: "Rhythm Changes",
    sections: [
      { label: "A", bars: 8 },
      { label: "A", bars: 8 },
      { label: "B", bars: 8 },
      { label: "A", bars: 8 }
    ]
  },
  sixteen16: {
    name: "16-bar Tune",
    sections: [
      { label: "A", bars: 8 },
      { label: "B", bars: 8 }
    ]
  },
  vamp8: {
    name: "Modal/Vamp",
    sections: [
      { label: "A", bars: 4 },
      { label: "A", bars: 4 }
    ]
  },
  autumnLeaves32: {
    name: "Autumn Leaves",
    sections: [
      { label: "A", bars: 8 },
      { label: "A", bars: 8 },
      { label: "B", bars: 8 },
      { label: "C", bars: 8 }
    ]
  },
  sunnySide32: {
    name: "Sunny Side",
    sections: [
      { label: "A", bars: 8 },
      { label: "A", bars: 8 },
      { label: "B", bars: 8 },
      { label: "A", bars: 8 }
    ]
  },
  blueBossa16: {
    name: "Blue Bossa",
    sections: [
      { label: "A", bars: 8 },
      { label: "B", bars: 8 }
    ]
  }
};

const builtInFormKeys = ["aaba32", "abac32", "blues12", "rhythm32", "sixteen16", "vamp8"];

const fallbackSongPresets = {
  autumnLeavesGm: {
    title: "Autumn Leaves",
    key: "G minor",
    formKey: "autumnLeaves32",
    displayFormKey: "abac32",
    bpm: 140,
    bassOctave: 0,
    roots: [
      ["C1"], ["F1"], ["Bb1"], ["Eb1"], ["A1"], ["D1"], ["G1"], ["G1"],
      ["C1"], ["F1"], ["Bb1"], ["Eb1"], ["A1"], ["D1"], ["G1"], ["G1"],
      ["A1"], ["D1"], ["G1"], ["G1"], ["C1"], ["F1"], ["Bb1"], ["Eb1"],
      ["A1"], ["D1"], ["G1"], ["C1"], ["F1"], ["Bb1"], ["Eb1"], ["D1"]
    ]
  },
  sunnySideC: {
    title: "Sunny Side of the Street",
    key: "C major",
    formKey: "sunnySide32",
    displayFormKey: "aaba32",
    bpm: 150,
    bassOctave: 0,
    roots: [
      ["C1"], ["E1"], ["A1"], ["D1"], ["G1"], ["G1"], ["C1"], ["G1"],
      ["C1"], ["E1"], ["A1"], ["D1"], ["G1"], ["G1"], ["C1"], ["C1"],
      ["F1"], ["F1"], ["C1"], ["C1"], ["A1"], ["D1"], ["G1"], ["G1"],
      ["C1"], ["E1"], ["A1"], ["D1"], ["G1"], ["G1"], ["C1"], ["G1"]
    ]
  },
  blueBossaCm: {
    title: "Blue Bossa",
    key: "C minor",
    formKey: "blueBossa16",
    displayFormKey: "sixteen16",
    bpm: 140,
    bassOctave: 0,
    roots: [
      ["C1"], ["C1"], ["F1"], ["F1"], ["D1"], ["G1"], ["C1"], ["C1"],
      ["Eb1"], ["Ab1"], ["Db1"], ["Db1"], ["D1"], ["G1"], ["C1"], ["G1"]
    ]
  }
};

let builtInSongPresets = fallbackSongPresets;
let songPresets = { ...fallbackSongPresets };

const els = {
  startStop: document.querySelector("#start-stop"),
  transportLabel: document.querySelector("#transport-label"),
  bpm: document.querySelector("#bpm"),
  bpmRange: document.querySelector("#bpm-range"),
  bpmDown: document.querySelector("#bpm-down"),
  bpmUp: document.querySelector("#bpm-up"),
  tapTempo: document.querySelector("#tap-tempo"),
  formPreset: document.querySelector("#form-preset"),
  songPreset: document.querySelector("#song-preset"),
  songKey: document.querySelector("#song-key"),
  practiceMode: document.querySelector("#practice-mode"),
  sectionLoop: document.querySelector("#section-loop"),
  phraseMapEnabled: document.querySelector("#phrase-map-enabled"),
  phraseStartBar: document.querySelector("#phrase-start-bar"),
  phraseStartBeat: document.querySelector("#phrase-start-beat"),
  phraseEndBar: document.querySelector("#phrase-end-bar"),
  phraseEndBeat: document.querySelector("#phrase-end-beat"),
  phraseColors: Array.from(document.querySelectorAll('input[name="phrase-color"]')),
  phraseCueIn: document.querySelector("#phrase-cue-in"),
  phraseCueOut: document.querySelector("#phrase-cue-out"),
  savePhrase: document.querySelector("#save-phrase"),
  clearPhrases: document.querySelector("#clear-phrases"),
  phraseMapStatus: document.querySelector("#phrase-map-status"),
  phraseRanges: document.querySelector("#phrase-ranges"),
  tradingBass: document.querySelector("#trading-bass"),
  practiceStatus: document.querySelector("#practice-status"),
  timeSignature: document.querySelector("#time-signature"),
  clickMode: document.querySelector("#click-mode"),
  countIn: document.querySelector("#count-in"),
  cueInterval: document.querySelector("#cue-interval"),
  chorusCue: document.querySelector("#chorus-cue"),
  settingsPanel: document.querySelector(".settings-panel"),
  settingsSummary: document.querySelector("#settings-summary"),
  clickVolume: document.querySelector("#click-volume"),
  cueVolume: document.querySelector("#cue-volume"),
  bassStyle: document.querySelector("#bass-style"),
  bassVolume: document.querySelector("#mixer-bass-volume"),
  bassOctave: document.querySelector("#bass-octave"),
  bassSettingsPanel: document.querySelector("#bass-settings-panel"),
  rootEditEnabled: document.querySelector("#root-edit-enabled"),
  bassEditorHint: document.querySelector("#bass-editor-hint"),
  barRootEditor: document.querySelector("#bar-root-editor"),
  selectedBarTitle: document.querySelector("#selected-bar-title"),
  barRootPrimary: document.querySelector("#bar-root-primary"),
  barRootSplit: document.querySelector("#bar-root-split"),
  barRootSecondaryWrap: document.querySelector("#bar-root-secondary-wrap"),
  barRootSecondary: document.querySelector("#bar-root-secondary"),
  saveBarRoot: document.querySelector("#save-bar-root"),
  clearBarRoot: document.querySelector("#clear-bar-root"),
  currentSection: document.querySelector("#current-section"),
  currentBar: document.querySelector("#current-bar"),
  currentBeat: document.querySelector("#current-beat"),
  currentChorus: document.querySelector("#current-chorus"),
  nextSection: document.querySelector("#next-section"),
  formName: document.querySelector("#form-name"),
  phraseStatus: document.querySelector("#phrase-status"),
  formGrid: document.querySelector("#form-grid"),
  runtimeStatus: document.querySelector("#runtime-status"),
  loopSummary: document.querySelector("#loop-summary"),
  bassSummary: document.querySelector("#bass-summary"),
  tradingSummary: document.querySelector("#trading-summary"),
  mapSummary: document.querySelector("#map-summary"),
  soloToggle: document.querySelector("#solo-toggle"),
  songEditorPanel: document.querySelector(".song-editor-panel"),
  songEditorTitle: document.querySelector("#song-editor-title"),
  songEditorKey: document.querySelector("#song-editor-key"),
  songEditorForm: document.querySelector("#song-editor-form"),
  songEditorSectionsWrap: document.querySelector("#song-editor-sections-wrap"),
  songEditorSections: document.querySelector("#song-editor-sections"),
  songEditorHint: document.querySelector("#song-editor-hint"),
  songEditorStatus: document.querySelector("#song-editor-status"),
  useSongDraft: document.querySelector("#use-song-draft"),
  saveSong: document.querySelector("#save-song"),
  deleteSong: document.querySelector("#delete-song")
};

const state = {
  audioContext: null,
  timerId: null,
  isPlaying: false,
  usesAudio: false,
  bpm: 140,
  beatsPerBar: 4,
  beatIndex: 0,
  activeBeatIndex: 0,
  nextNoteTime: 0,
  nextVisualTimeMs: 0,
  formKey: "aaba32",
  songPresetKey: "",
  selectedBarIndex: null,
  customBassRoots: {},
  phraseMaps: {},
  selectedPhraseId: null,
  bassSamples: {},
  tapTimes: [],
  playbackGeneration: 0,
  visualTimeoutIds: new Set(),
  wakeLock: null,
  masterInput: null,
  barCells: [],
  currentBarCell: null,
  lastTradingVisualKey: "",
  customForm: null,
  initialized: false
};

const storageKeys = {
  current: "formclick-state-v2",
  localSongs: "formclick-local-songs-v1",
  legacySetups: "formclick-setups-v1"
};

const bpmLimits = {
  min: 30,
  max: 320
};

const bassRootFrequencies = {
  C1: 32.7,
  Db1: 34.65,
  D1: 36.71,
  Eb1: 38.89,
  E1: 41.2,
  F1: 43.65,
  Gb1: 46.25,
  G1: 49,
  Ab1: 51.91,
  A1: 55,
  Bb1: 58.27,
  B1: 61.74
};

const bassRootLabels = {
  C1: "C",
  Db1: "Db",
  D1: "D",
  Eb1: "Eb",
  E1: "E",
  F1: "F",
  Gb1: "Gb",
  G1: "G",
  Ab1: "Ab",
  A1: "A",
  Bb1: "Bb",
  B1: "B"
};

const bassRootSemitones = {
  C1: 0,
  Db1: 1,
  D1: 2,
  Eb1: 3,
  E1: 4,
  F1: 5,
  Gb1: 6,
  G1: 7,
  Ab1: 8,
  A1: 9,
  Bb1: 10,
  B1: 11
};

const formBassRoots = {
  aaba32: ["C1", "C1", "F1", "C1"],
  abac32: ["C1", "G1", "C1", "F1"],
  blues12: ["C1", "F1", "G1"],
  rhythm32: ["Bb1", "Bb1", "Eb1", "Bb1"],
  sixteen16: ["C1", "F1"],
  vamp8: ["D1", "D1"],
  autumnLeaves32: ["C1", "C1", "A1", "A1"],
  sunnySide32: ["C1", "C1", "F1", "C1"],
  blueBossa16: ["C1", "Eb1"]
};

const scheduler = {
  lookaheadMs: 25,
  scheduleAheadSeconds: 0.12
};

function getCurrentForm() {
  return forms[state.formKey];
}

function getTotalBars(form = getCurrentForm()) {
  return core.getTotalBars(form);
}

function getSectionForBar(barIndex, form = getCurrentForm()) {
  return core.getSectionForBar(barIndex, form);
}

function getCurrentFormCustomRoots() {
  if (!state.customBassRoots[state.formKey]) {
    state.customBassRoots[state.formKey] = {};
  }

  return state.customBassRoots[state.formKey];
}

function getCustomRootEntry(barIndex) {
  return getCurrentFormCustomRoots()[String(barIndex)] || null;
}

function shouldUseSecondHalfRoot(position) {
  return position.beatInBar > state.beatsPerBar / 2;
}

function isSecondHalfStart(position) {
  return position.beatInBar === Math.floor(state.beatsPerBar / 2) + 1;
}

function getCustomRootForPosition(position) {
  if (position.isCountIn) {
    return null;
  }

  const entry = getCustomRootEntry(position.barIndex);
  if (!entry) {
    return null;
  }

  if (entry.length > 1 && shouldUseSecondHalfRoot(position)) {
    return entry[1];
  }

  return entry[0];
}

function getDefaultBassRootForPosition(position) {
  const roots = formBassRoots[state.formKey];
  if (!roots) {
    return "C1";
  }

  return roots[position.section.index] || roots[0] || "C1";
}

function getBassRootForPosition(position) {
  return getCustomRootForPosition(position);
}

function getBassRootLabel(root) {
  return bassRootLabels[root] || "C";
}

function getRootEntryLabel(entry) {
  if (!entry) {
    return "";
  }

  return entry.map(getBassRootLabel).join("/");
}

function getActiveLoopRange(form = getCurrentForm()) {
  return core.getLoopRange(form, els.sectionLoop.value);
}

function getPositionFromBeat(beatIndex) {
  return core.getPositionFromBeat({
    beatIndex,
    form: getCurrentForm(),
    beatsPerBar: state.beatsPerBar,
    sectionLoopValue: els.sectionLoop.value
  });
}

function shouldPlayMainClick(position) {
  if (els.clickMode.value === "off") {
    return false;
  }

  if (position.isCountIn) {
    return true;
  }

  if (els.clickMode.value === "quarter") {
    return true;
  }

  if (els.clickMode.value === "twoFour") {
    return position.beatInBar === 2 || position.beatInBar === 4;
  }

  return position.beatInBar === 1;
}

function shouldPlayTopCue(position) {
  if (position.isCountIn || position.beatInBar !== 1) {
    return false;
  }

  return position.barIndex === 0 && (els.chorusCue.checked || els.cueInterval.value === "chorus");
}

function shouldPlayPhraseCue(position) {
  if (position.isCountIn || position.beatInBar !== 1) {
    return false;
  }

  const cueValue = els.cueInterval.value;

  if (cueValue === "off" || cueValue === "chorus") {
    return false;
  }

  if (position.barIndex === 0 && shouldPlayTopCue(position)) {
    return false;
  }

  return position.barIndex % Number(cueValue) === 0;
}

function getTradingOptionsForForm() {
  return core.getTradingOptions(getTotalBars());
}

function renderTradingModeOptions() {
  const previousValue = els.practiceMode.value || "normal";
  const options = getTradingOptionsForForm();

  els.practiceMode.innerHTML = "";
  options.forEach((optionConfig) => {
    const option = document.createElement("option");
    option.value = optionConfig.value;
    option.textContent = optionConfig.label;
    els.practiceMode.append(option);
  });

  els.practiceMode.value = options.some((option) => option.value === previousValue) ? previousValue : "normal";
}

function isTradingMuteBar(position) {
  return core.isTradingMuteBar(position, els.practiceMode.value, getActiveLoopRange());
}

function shouldMuteClickSupport(position) {
  return isTradingMuteBar(position);
}

function shouldMuteBassSupport(position) {
  return isTradingMuteBar(position) && els.tradingBass.value !== "full";
}

function getAudioContextConstructor() {
  return window.AudioContext || window.webkitAudioContext;
}

function nowMs() {
  if (window.performance && typeof window.performance.now === "function") {
    return window.performance.now();
  }

  return Date.now();
}

function startLoop(callback, delayMs) {
  if (typeof window.setInterval === "function") {
    const intervalId = window.setInterval(callback, delayMs);
    return {
      stop: () => window.clearInterval(intervalId)
    };
  }

  let active = true;
  let timeoutId = null;
  const tick = () => {
    if (!active) {
      return;
    }

    callback();
    timeoutId = window.setTimeout(tick, delayMs);
  };

  timeoutId = window.setTimeout(tick, delayMs);
  return {
    stop: () => {
      active = false;
      window.clearTimeout(timeoutId);
    }
  };
}

function resumeAudioContext(audio, timeoutMs = 900) {
  if (audio.state !== "suspended") {
    return Promise.resolve(audio.state === "running");
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(timeoutId);
      resolve(value);
    };
    const timeoutId = window.setTimeout(() => finish(false), timeoutMs);

    audio.resume()
      .then(() => finish(audio.state === "running"))
      .catch(() => finish(false));
  });
}

function setRuntimeStatus(message) {
  document.body.dataset.runtimeStatus = message;

  if (els.runtimeStatus) {
    els.runtimeStatus.textContent = message;
  }
}

function ensureMasterOutput() {
  const audio = state.audioContext;
  if (!audio) {
    return null;
  }

  if (!state.masterInput) {
    const input = audio.createGain();
    const limiter = audio.createDynamicsCompressor();
    limiter.threshold.setValueAtTime(-8, audio.currentTime);
    limiter.knee.setValueAtTime(4, audio.currentTime);
    limiter.ratio.setValueAtTime(12, audio.currentTime);
    limiter.attack.setValueAtTime(0.003, audio.currentTime);
    limiter.release.setValueAtTime(0.16, audio.currentTime);
    input.connect(limiter);
    limiter.connect(audio.destination);
    state.masterInput = input;
  }

  return state.masterInput;
}

function connectToOutput(node) {
  const output = ensureMasterOutput();
  if (output) {
    node.connect(output);
  }
}

function getChannelVolume(channel) {
  if (channel === "click") {
    return Number(els.clickVolume.value) / 100;
  }

  if (channel === "cue") {
    return Number(els.cueVolume.value) / 100;
  }

  return 1;
}

function playTone(time, frequency, duration, gainLevel, type = "sine", channel = "cue") {
  const audio = state.audioContext;
  if (!audio) {
    return;
  }

  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  const outputLevel = Math.max(0.0001, gainLevel * getChannelVolume(channel));

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(outputLevel, time + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  oscillator.connect(gain);
  connectToOutput(gain);
  oscillator.start(time);
  oscillator.stop(time + duration + 0.03);
}

function getBassVolume() {
  return Number(els.bassVolume.value) / 100;
}

function getBeatDuration() {
  return 60 / state.bpm;
}

function getBassOctaveSemitones() {
  return Number(els.bassOctave.value || 0);
}

function playBassTransient(time, duration, level) {
  const audio = state.audioContext;
  if (!audio) {
    return;
  }

  const sampleRate = audio.sampleRate || 44100;
  const frameCount = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = audio.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < frameCount; index += 1) {
    const decay = 1 - index / frameCount;
    data[index] = (Math.random() * 2 - 1) * decay;
  }

  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(520, time);
  filter.frequency.exponentialRampToValueAtTime(160, time + duration);

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(level, time + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  connectToOutput(gain);
  source.start(time);
}

function createBassSampleBuffer(audio, frequency) {
  const sampleRate = audio.sampleRate || 44100;
  const duration = 2.4;
  const frameCount = Math.floor(sampleRate * duration);
  const delayLength = Math.max(2, Math.round(sampleRate / frequency));
  const delayLine = Array.from({ length: delayLength }, () => Math.random() * 2 - 1);
  const buffer = audio.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);
  let delayIndex = 0;
  let previous = 0;

  for (let index = 0; index < frameCount; index += 1) {
    const nextIndex = (delayIndex + 1) % delayLength;
    const pluck = delayLine[delayIndex];
    const next = delayLine[nextIndex];
    const decay = Math.pow(1 - index / frameCount, 1.8);
    const body = (pluck + next) * 0.496;
    const fingerNoise = index < sampleRate * 0.035
      ? (Math.random() * 2 - 1) * (1 - index / (sampleRate * 0.035)) * 0.08
      : 0;

    delayLine[delayIndex] = body;
    data[index] = (body * 0.88 + previous * 0.12 + fingerNoise) * decay;
    previous = data[index];
    delayIndex = nextIndex;
  }

  return buffer;
}

function getBassSampleBuffer(frequency) {
  const audio = state.audioContext;
  const sampleKey = String(Math.round(frequency * 100));

  if (!audio || typeof audio.createBuffer !== "function") {
    return null;
  }

  if (!state.bassSamples[sampleKey]) {
    state.bassSamples[sampleKey] = createBassSampleBuffer(audio, frequency);
  }

  return state.bassSamples[sampleKey];
}

function getBassArticulation(style = "normal") {
  if (style === "walking") {
    return {
      attack: 0.004,
      bodyLevel: 0.046,
      brightness: 760,
      decayLevel: 0.58,
      releaseMultiplier: 1.08,
      tailBrightness: 260,
      transientLevel: 0.011
    };
  }

  if (style === "pulse") {
    return {
      attack: 0.005,
      bodyLevel: 0.038,
      brightness: 650,
      decayLevel: 0.54,
      releaseMultiplier: 1.02,
      tailBrightness: 230,
      transientLevel: 0.008
    };
  }

  return {
    attack: 0.006,
    bodyLevel: 0,
    brightness: 980,
    decayLevel: 0.48,
    releaseMultiplier: 1,
    tailBrightness: 310,
    transientLevel: 0
  };
}

function playBassBodyResonance(time, frequency, duration, velocity, articulation) {
  const audio = state.audioContext;
  if (!audio || articulation.bodyLevel === 0) {
    return;
  }

  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  const bodyDuration = duration * articulation.releaseMultiplier;
  const releaseTime = time + bodyDuration;
  const level = articulation.bodyLevel * getBassVolume() * velocity;

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency * 1.008, time);
  oscillator.frequency.exponentialRampToValueAtTime(frequency, time + 0.045);

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(level, time + articulation.attack);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level * 0.42), time + Math.min(bodyDuration * 0.55, 0.3));
  gain.gain.exponentialRampToValueAtTime(0.0001, releaseTime);

  oscillator.connect(gain);
  connectToOutput(gain);
  oscillator.start(time);
  oscillator.stop(releaseTime + 0.04);
}

function playSampledBassNote(time, frequency, duration, velocity = 1, style = "normal") {
  const audio = state.audioContext;
  if (!audio || !els.rootEditEnabled.checked || getBassVolume() === 0) {
    return false;
  }

  if (typeof audio.createBufferSource !== "function" || typeof audio.createBiquadFilter !== "function") {
    return false;
  }

  const buffer = getBassSampleBuffer(frequency);
  if (!buffer) {
    return false;
  }

  const articulation = getBassArticulation(style);
  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  const level = 0.5 * getBassVolume() * velocity;
  const releaseTime = Math.max(time + 0.06, time + duration * articulation.releaseMultiplier);
  const humanize = Math.sin(frequency * 0.083 + time * 7.1) * 0.0025;

  source.buffer = buffer;
  source.playbackRate.setValueAtTime(1.006 + humanize, time);
  source.playbackRate.exponentialRampToValueAtTime(1, time + 0.03);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(articulation.brightness, time);
  filter.frequency.exponentialRampToValueAtTime(articulation.tailBrightness, time + 0.18);
  filter.Q.setValueAtTime(0.95, time);

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(level, time + articulation.attack);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level * articulation.decayLevel), time + Math.min(duration * 0.32, 0.2));
  gain.gain.exponentialRampToValueAtTime(0.0001, releaseTime);

  source.connect(filter);
  filter.connect(gain);
  connectToOutput(gain);
  source.start(time);
  source.stop(releaseTime + 0.08);
  if (articulation.transientLevel > 0) {
    playBassTransient(time, 0.024, articulation.transientLevel * getBassVolume() * velocity);
  }
  playBassBodyResonance(time, frequency, duration, velocity, articulation);
  return true;
}

function playSynthBassNote(time, frequency, duration, velocity = 1, style = "normal") {
  const audio = state.audioContext;
  if (!audio || !els.rootEditEnabled.checked || getBassVolume() === 0) {
    return;
  }

  const bodyOscillator = audio.createOscillator();
  const biteOscillator = audio.createOscillator();
  const gain = audio.createGain();
  const filter = audio.createBiquadFilter();
  const bodyGain = audio.createGain();
  const biteGain = audio.createGain();
  const articulation = getBassArticulation(style);
  const level = 0.2 * getBassVolume() * velocity;
  const releaseTime = Math.max(time + 0.05, time + duration * articulation.releaseMultiplier);
  const settleTime = time + 0.035;

  bodyOscillator.type = "triangle";
  bodyOscillator.frequency.setValueAtTime(frequency * 1.018, time);
  bodyOscillator.frequency.exponentialRampToValueAtTime(frequency, settleTime);

  biteOscillator.type = "sawtooth";
  biteOscillator.frequency.setValueAtTime(frequency * 2.02, time);
  biteOscillator.frequency.exponentialRampToValueAtTime(frequency * 2, settleTime);

  bodyGain.gain.setValueAtTime(0.82, time);
  biteGain.gain.setValueAtTime(0.22, time);
  biteGain.gain.exponentialRampToValueAtTime(0.06, time + 0.11);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(Math.min(920, articulation.brightness), time);
  filter.frequency.exponentialRampToValueAtTime(Math.min(240, articulation.tailBrightness), time + 0.16);
  filter.Q.setValueAtTime(1.1, time);

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(level, time + 0.009);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level * articulation.decayLevel), time + Math.min(duration * 0.28, 0.16));
  gain.gain.exponentialRampToValueAtTime(0.0001, releaseTime);

  bodyOscillator.connect(bodyGain);
  biteOscillator.connect(biteGain);
  bodyGain.connect(filter);
  biteGain.connect(filter);
  filter.connect(gain);
  connectToOutput(gain);
  bodyOscillator.start(time);
  biteOscillator.start(time);
  bodyOscillator.stop(releaseTime + 0.05);
  biteOscillator.stop(releaseTime + 0.05);
  playBassTransient(time, 0.028, Math.max(0.01, articulation.transientLevel) * getBassVolume() * velocity);
  playBassBodyResonance(time, frequency, duration, velocity, articulation);
}

function playBassNote(time, frequency, duration, velocity = 1, style = "normal") {
  if (playSampledBassNote(time, frequency, duration, velocity, style)) {
    return;
  }

  playSynthBassNote(time, frequency, duration, velocity, style);
}

function playKeyboardBassNote(time, frequency, duration, velocity = 1) {
  const audio = state.audioContext;
  if (!audio || !els.rootEditEnabled.checked || getBassVolume() === 0) {
    return;
  }

  const subOscillator = audio.createOscillator();
  const toneOscillator = audio.createOscillator();
  const clickOscillator = audio.createOscillator();
  const subGain = audio.createGain();
  const toneGain = audio.createGain();
  const clickGain = audio.createGain();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  const level = 0.14 * getBassVolume() * velocity;
  const releaseTime = Math.max(time + 0.12, time + duration);

  subOscillator.type = "sine";
  subOscillator.frequency.setValueAtTime(frequency, time);

  toneOscillator.type = "triangle";
  toneOscillator.frequency.setValueAtTime(frequency * 2, time);

  clickOscillator.type = "square";
  clickOscillator.frequency.setValueAtTime(frequency * 4, time);

  subGain.gain.setValueAtTime(0.9, time);
  toneGain.gain.setValueAtTime(0.26, time);
  clickGain.gain.setValueAtTime(0.12, time);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(620, time);
  filter.frequency.exponentialRampToValueAtTime(360, time + 0.18);
  filter.Q.setValueAtTime(0.65, time);

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(level, time + 0.012);
  gain.gain.setValueAtTime(Math.max(0.0001, level * 0.9), Math.max(time + 0.04, releaseTime - 0.1));
  gain.gain.exponentialRampToValueAtTime(0.0001, releaseTime);

  subOscillator.connect(subGain);
  toneOscillator.connect(toneGain);
  clickOscillator.connect(clickGain);
  subGain.connect(filter);
  toneGain.connect(filter);
  clickGain.connect(filter);
  filter.connect(gain);
  connectToOutput(gain);
  subOscillator.start(time);
  toneOscillator.start(time);
  clickOscillator.start(time);
  subOscillator.stop(releaseTime + 0.04);
  toneOscillator.stop(releaseTime + 0.04);
  clickOscillator.stop(time + 0.07);
}

function transposeBassFrequency(root, semitones) {
  const frequency = bassRootFrequencies[root] || bassRootFrequencies.C1;
  return frequency * Math.pow(2, semitones / 12);
}

function getFirstRootForBar(barIndex) {
  const entry = getCustomRootEntry(barIndex);
  return entry ? entry[0] : null;
}

function getNextAssignedRoot(barIndex) {
  const totalBars = getTotalBars();

  for (let offset = 1; offset <= totalBars; offset += 1) {
    const nextIndex = (barIndex + offset) % totalBars;
    const root = getFirstRootForBar(nextIndex);

    if (root) {
      return root;
    }
  }

  return null;
}

function getChromaticApproachSemitones(root, targetRoot) {
  if (!targetRoot || root === targetRoot) {
    return -1;
  }

  const rootPitch = bassRootSemitones[root] ?? 0;
  const targetPitch = bassRootSemitones[targetRoot] ?? rootPitch;
  const upwardDistance = (targetPitch - rootPitch + 12) % 12;

  return upwardDistance <= 6 ? upwardDistance - 1 : upwardDistance - 12 + 1;
}

function getWalkingBassSemitones(position, root) {
  if (position.beatInBar === 1) {
    return 0;
  }

  if (position.beatInBar === 2) {
    return position.barIndex % 2 === 0 ? 4 : 2;
  }

  if (position.beatInBar === 3) {
    return 7;
  }

  return getChromaticApproachSemitones(root, getNextAssignedRoot(position.barIndex));
}

function scheduleBass(position, time) {
  if (position.isCountIn || !els.rootEditEnabled.checked || shouldMuteBassSupport(position)) {
    return;
  }

  const customEntry = getCustomRootEntry(position.barIndex);
  if (!customEntry) {
    return;
  }

  const hasSplitRoot = Boolean(customEntry && customEntry.length > 1);
  const bassRoot = getBassRootForPosition(position);
  if (!bassRoot) {
    return;
  }

  const rootFrequency = transposeBassFrequency(bassRoot, getBassOctaveSemitones());
  const beatDuration = getBeatDuration();

  if (els.bassStyle.value === "walking") {
    const walkingFrequency = transposeBassFrequency(bassRoot, getBassOctaveSemitones() + getWalkingBassSemitones(position, bassRoot));
    const velocity = position.beatInBar === 1 ? 0.94 : position.beatInBar === 3 ? 0.82 : 0.72;
    playBassNote(time, walkingFrequency, beatDuration * 0.9, velocity, "walking");
    return;
  }

  if (els.bassStyle.value === "ballad") {
    if (position.beatInBar === 1 || (hasSplitRoot && isSecondHalfStart(position))) {
      const firstHalfBeats = Math.floor(state.beatsPerBar / 2);
      const noteBeats = hasSplitRoot && position.beatInBar === 1
        ? firstHalfBeats
        : state.beatsPerBar - position.beatInBar + 1;
      playKeyboardBassNote(time, rootFrequency, beatDuration * noteBeats * 0.96, 0.95);
    }
    return;
  }

  const pulseVelocity = position.beatInBar === 1 ? 0.92 : position.beatInBar === 3 ? 0.8 : 0.68;
  playBassNote(time, rootFrequency, beatDuration * 0.94, pulseVelocity, "pulse");
}

function playRideBell(time, intensity = 1) {
  playTone(time, 1480, 0.2, 0.13 * intensity, "triangle", "cue");
  playTone(time + 0.008, 2210, 0.11, 0.055 * intensity, "sine", "cue");
  playTone(time + 0.015, 2960, 0.075, 0.035 * intensity, "sine", "cue");
}

function playPhraseCue(time) {
  playRideBell(time + 0.015, 0.7);
}

function playTopCue(time) {
  playRideBell(time, 1.15);
}

function playPhraseMapCueIn(time) {
  playTone(time, 1760, 0.09, 0.09, "triangle");
  playTone(time + 0.015, 2348, 0.08, 0.045, "sine");
}

function playPhraseMapCueOut(time) {
  playTone(time, 740, 0.11, 0.085, "triangle");
  playTone(time + 0.012, 554, 0.09, 0.04, "sine");
}

function shouldPlayPhraseMapCue(position, cueType) {
  if (position.isCountIn || !els.phraseMapEnabled.checked) {
    return false;
  }

  const totalBeats = getTotalBars() * state.beatsPerBar;
  const beatInChorus = getBeatInChorus(position);

  return getCurrentPhraseMap().some((phrase) => {
    if (cueType === "in") {
      return phrase.cueIn && phrase.startBeat === beatInChorus;
    }

    return phrase.cueOut && (phrase.startBeat + phrase.lengthBeats) % totalBeats === beatInChorus;
  });
}

function scheduleVisualBeat(beatIndex, delayMs) {
  const generation = state.playbackGeneration;
  const timeoutId = window.setTimeout(() => {
    state.visualTimeoutIds.delete(timeoutId);
    if (!state.isPlaying || generation !== state.playbackGeneration) {
      return;
    }

    state.activeBeatIndex = beatIndex;
    renderPosition();
  }, delayMs);
  state.visualTimeoutIds.add(timeoutId);
}

function scheduleBeat(beatIndex, time) {
  const position = getPositionFromBeat(beatIndex);
  const accent = position.isCountIn || position.beatInBar === 1;
  const muteSupport = shouldMuteClickSupport(position);

  if (!muteSupport && shouldPlayMainClick(position)) {
    if (!position.isCountIn && els.clickMode.value === "barline") {
      playTone(time, 760, 0.075, 0.16, "triangle", "click");
    } else {
      playTone(time, accent ? 920 : 560, 0.045, accent ? 0.18 : 0.12, "square", "click");
    }
  }

  if (!muteSupport && shouldPlayPhraseCue(position)) {
    playPhraseCue(time);
  }

  if (!muteSupport && shouldPlayTopCue(position)) {
    playTopCue(time);
  }

  if (shouldPlayPhraseMapCue(position, "in")) {
    playPhraseMapCueIn(time + 0.02);
  }

  if (shouldPlayPhraseMapCue(position, "out")) {
    playPhraseMapCueOut(time + 0.02);
  }

  scheduleBass(position, time);

  const visualDelay = Math.max(0, (time - state.audioContext.currentTime) * 1000);
  scheduleVisualBeat(beatIndex, visualDelay);
}

function runScheduler() {
  while (state.nextNoteTime < state.audioContext.currentTime + scheduler.scheduleAheadSeconds) {
    scheduleBeat(state.beatIndex, state.nextNoteTime);
    state.beatIndex += 1;
    state.nextNoteTime += 60 / state.bpm;
  }
}

function runVisualScheduler() {
  const now = nowMs();

  while (state.nextVisualTimeMs < now + scheduler.scheduleAheadSeconds * 1000) {
    scheduleVisualBeat(state.beatIndex, Math.max(0, state.nextVisualTimeMs - now));
    state.beatIndex += 1;
    state.nextVisualTimeMs += (60 / state.bpm) * 1000;
  }
}

async function startMetronome(options = {}) {
  setRuntimeStatus("Starting");
  const AudioContextConstructor = getAudioContextConstructor();

  if (!state.audioContext && AudioContextConstructor) {
    state.audioContext = new AudioContextConstructor();
  }

  const countInBars = Number(els.countIn.value);
  state.beatIndex = Number.isFinite(options.initialBeatIndex)
    ? Math.max(0, options.initialBeatIndex)
    : -(countInBars * state.beatsPerBar);
  state.activeBeatIndex = state.beatIndex;
  state.playbackGeneration += 1;
  state.isPlaying = true;
  state.usesAudio = false;

  if (state.audioContext) {
    state.usesAudio = await resumeAudioContext(state.audioContext);
  }

  if (state.usesAudio) {
    state.nextNoteTime = state.audioContext.currentTime + 0.08;
    state.timerId = startLoop(runScheduler, scheduler.lookaheadMs);
  } else {
    state.nextVisualTimeMs = nowMs() + 80;
    state.timerId = startLoop(runVisualScheduler, scheduler.lookaheadMs);
  }

  els.startStop.classList.add("is-playing");
  document.body.classList.add("is-playing");
  els.startStop.setAttribute("aria-label", "Stop metronome");
  els.transportLabel.textContent = "Stop";
  renderPosition();
  setRuntimeStatus("Playing");
  requestWakeLock();
}

function stopMetronome() {
  if (state.timerId) {
    state.timerId.stop();
  }

  state.timerId = null;
  state.playbackGeneration += 1;
  state.visualTimeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
  state.visualTimeoutIds.clear();
  state.isPlaying = false;
  state.beatIndex = 0;
  state.activeBeatIndex = 0;
  els.startStop.classList.remove("is-playing");
  document.body.classList.remove("is-playing");
  els.startStop.setAttribute("aria-label", "Start metronome");
  els.transportLabel.textContent = "Start";
  renderPosition();
  setRuntimeStatus("Stopped");
  releaseWakeLock();
}

function handleStartError(error) {
  console.error("Could not start metronome", error);
  stopMetronome();
  setRuntimeStatus("Could not start metronome");
}

function clampBpm(value) {
  return Math.min(bpmLimits.max, Math.max(bpmLimits.min, Math.round(value)));
}

function setBpm(value, options = {}) {
  state.bpm = clampBpm(value);

  if (!options.preserveInput) {
    els.bpm.value = state.bpm;
  }

  els.bpmRange.value = state.bpm;
  els.bpm.classList.remove("is-pending");
  if (state.initialized && state.songPresetKey) {
    syncSongEditorState("Changed");
  }
  persistAppState();
}

function changeBpm(amount) {
  setBpm(state.bpm + amount);
}

function getBpmDraftDigits() {
  return els.bpm.value.replace(/\D/g, "");
}

function isBpmInRange(value) {
  return value >= bpmLimits.min && value <= bpmLimits.max;
}

function handleBpmInput() {
  const digits = getBpmDraftDigits();

  if (els.bpm.value !== digits) {
    els.bpm.value = digits;
  }

  if (digits === "") {
    els.bpm.classList.add("is-pending");
    return;
  }

  const draftBpm = Number(digits);

  if (isBpmInRange(draftBpm)) {
    setBpm(draftBpm, { preserveInput: true });
    return;
  }

  els.bpm.classList.add("is-pending");
}

function commitBpmInput() {
  const digits = getBpmDraftDigits();

  if (digits === "") {
    els.bpm.value = state.bpm;
    els.bpm.classList.remove("is-pending");
    return;
  }

  setBpm(Number(digits));
}

function handleBpmKeydown(event) {
  if (event.key === "Enter") {
    commitBpmInput();
    els.bpm.blur();
  }

  if (event.key === "Escape") {
    els.bpm.value = state.bpm;
    els.bpm.classList.remove("is-pending");
    els.bpm.blur();
  }
}

function handleTapTempo() {
  const now = nowMs();
  state.tapTimes = state.tapTimes.filter((time) => now - time < 2200);
  state.tapTimes.push(now);

  if (state.tapTimes.length < 2) {
    return;
  }

  const gaps = [];
  for (let index = 1; index < state.tapTimes.length; index += 1) {
    gaps.push(state.tapTimes[index] - state.tapTimes[index - 1]);
  }

  const averageGap = gaps.reduce((total, gap) => total + gap, 0) / gaps.length;
  setBpm(60000 / averageGap);
}

function restartIfPlaying(options = {}) {
  if (!state.isPlaying) {
    renderPosition();
    return;
  }

  const initialBeatIndex = options.preservePosition ? Math.max(0, state.activeBeatIndex) : undefined;
  stopMetronome();
  startMetronome({ initialBeatIndex }).catch(handleStartError);
}

function getNextSectionLabel(position) {
  const form = getCurrentForm();
  const totalBars = getTotalBars(form);

  if (position.isCountIn) {
    return `${getSectionForBar(0, form).label} in ${position.countInBeat}`;
  }

  const barsUntilNext = position.section.end - position.barIndex;
  const nextBarIndex = position.section.end % totalBars;
  const nextSection = getSectionForBar(nextBarIndex, form);
  return `${nextSection.label} in ${barsUntilNext}`;
}

function getPracticeStatus(position) {
  if (position.isCountIn) {
    return "Count-in";
  }

  if (isTradingMuteBar(position)) {
    return "You";
  }

  if (els.practiceMode.value !== "normal") {
    return "Band";
  }

  return "Normal";
}

function getSelectedOptionLabel(select) {
  return select.options[select.selectedIndex]?.textContent || "";
}

function renderActiveSummaries() {
  const cueLabel = els.cueInterval.value === "off"
    ? "Cue off"
    : els.cueInterval.value === "chorus"
      ? "Cue chorus"
      : `Cue ${els.cueInterval.value}`;
  els.settingsSummary.textContent = `${getSelectedOptionLabel(els.clickMode)} / ${cueLabel}`;

  const loop = getActiveLoopRange();
  els.loopSummary.hidden = !loop.active;
  els.loopSummary.textContent = loop.active ? `Loop: ${getSelectedOptionLabel(els.sectionLoop)}` : "";

  els.bassSummary.hidden = !els.rootEditEnabled.checked;
  els.bassSummary.textContent = els.rootEditEnabled.checked ? `Bass: ${getSelectedOptionLabel(els.bassStyle)}` : "";

  const tradingActive = els.practiceMode.value !== "normal";
  els.tradingSummary.hidden = !tradingActive;
  els.tradingSummary.textContent = tradingActive ? `Trading: ${getSelectedOptionLabel(els.practiceMode)}` : "";

  const mapCount = getCurrentPhraseMap().length;
  els.mapSummary.hidden = !els.phraseMapEnabled.checked;
  els.mapSummary.textContent = els.phraseMapEnabled.checked ? `Map: ${mapCount}` : "";
}

function renderSectionLoopOptions() {
  const form = getCurrentForm();
  const previousValue = els.sectionLoop.value || "off";

  els.sectionLoop.innerHTML = "";

  const offOption = document.createElement("option");
  offOption.value = "off";
  offOption.textContent = "Off";
  els.sectionLoop.append(offOption);

  form.sections.forEach((section, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${section.label} (${section.bars} bars)`;
    els.sectionLoop.append(option);
  });

  const hasPrevious = Array.from(els.sectionLoop.children).some((option) => option.value === previousValue);
  els.sectionLoop.value = hasPrevious ? previousValue : "off";
}

function closeBarRootEditor() {
  state.selectedBarIndex = null;
  els.barRootEditor.hidden = true;
  renderCustomRootLabels();
}

function openBarRootEditor(barIndex) {
  state.selectedBarIndex = barIndex;
  const entry = getCustomRootEntry(barIndex);
  const fallbackPosition = getPositionFromBeat(barIndex * state.beatsPerBar);
  const fallbackRoot = getDefaultBassRootForPosition(fallbackPosition);
  const roots = entry || [fallbackRoot];

  els.barRootEditor.hidden = false;
  els.selectedBarTitle.textContent = `Bar ${barIndex + 1}`;
  els.barRootPrimary.value = roots[0];
  els.barRootSplit.checked = roots.length > 1;
  els.barRootSecondary.value = roots[1] || roots[0];

  syncSplitRootVisibility();
  renderCustomRootLabels();
}

function syncSplitRootVisibility() {
  els.barRootSecondaryWrap.hidden = !els.barRootSplit.checked;
}

function syncBassEditorVisibility() {
  els.bassSettingsPanel.hidden = !els.rootEditEnabled.checked;
  els.bassEditorHint.hidden = !els.rootEditEnabled.checked;

  if (els.rootEditEnabled.checked && state.selectedBarIndex === null) {
    openBarRootEditor(0);
  }
}

function saveSelectedBarRoot() {
  if (state.selectedBarIndex === null) {
    return;
  }

  const roots = [els.barRootPrimary.value];

  if (els.barRootSplit.checked) {
    roots.push(els.barRootSecondary.value);
  }

  getCurrentFormCustomRoots()[String(state.selectedBarIndex)] = roots;
  renderCustomRootLabels();
  renderPosition();
  syncSongEditorState("Changed");
  persistAppState();
}

function clearSelectedBarRoot() {
  if (state.selectedBarIndex === null) {
    return;
  }

  delete getCurrentFormCustomRoots()[String(state.selectedBarIndex)];
  openBarRootEditor(state.selectedBarIndex);
  renderPosition();
  syncSongEditorState("Changed");
  persistAppState();
}

function setSongPresetDisplay(preset = null) {
  els.songPreset.value = preset ? state.songPresetKey : "";
  els.songKey.textContent = preset ? preset.key : "Custom";
}

function getLocalSongs() {
  const songs = readStorage(storageKeys.localSongs, {});
  return songs && typeof songs === "object" && !Array.isArray(songs) ? songs : {};
}

function isLocalSongKey(songKey) {
  return Boolean(songKey && Object.prototype.hasOwnProperty.call(getLocalSongs(), songKey));
}

function refreshSongPresetMap() {
  songPresets = { ...builtInSongPresets, ...getLocalSongs() };
}

function appendSongOption(parent, songKey, preset) {
  const option = document.createElement("option");
  option.value = songKey;
  option.textContent = preset.title;
  parent.append(option);
}

function renderSongPresetOptions() {
  const selectedValue = state.songPresetKey || els.songPreset.value;
  els.songPreset.innerHTML = "";

  const customOption = document.createElement("option");
  customOption.value = "";
  customOption.textContent = "No song / Custom";
  els.songPreset.append(customOption);

  const builtInGroup = document.createElement("optgroup");
  builtInGroup.label = "Built-in songs";
  Object.entries(builtInSongPresets).forEach(([presetKey, preset]) => appendSongOption(builtInGroup, presetKey, preset));
  els.songPreset.append(builtInGroup);

  const localSongs = getLocalSongs();
  if (Object.keys(localSongs).length) {
    const localGroup = document.createElement("optgroup");
    localGroup.label = "My songs";
    Object.entries(localSongs)
      .sort(([, first], [, second]) => first.title.localeCompare(second.title))
      .forEach(([songKey, preset]) => appendSongOption(localGroup, songKey, preset));
    els.songPreset.append(localGroup);
  }

  if (songPresets[selectedValue]) {
    els.songPreset.value = selectedValue;
  }
}

function isSongPresetMap(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function validateSongPresets(presets) {
  if (!isSongPresetMap(presets)) {
    throw new Error("Song presets should be an object");
  }

  Object.entries(presets).forEach(([presetKey, preset]) => {
    const formDefinition = core.resolveSongFormDefinition(preset, forms);
    const expectedBars = formDefinition ? getTotalBars({ sections: formDefinition.sections }) : 0;
    const rootsAreValid = Array.isArray(preset.roots)
      && preset.roots.length === expectedBars
      && preset.roots.every((entry) => entry === null || (Array.isArray(entry)
        && entry.length >= 1
        && entry.length <= 2
        && entry.every((root) => Boolean(bassRootFrequencies[root]))));

    if (!preset.title || !preset.key || !formDefinition || !rootsAreValid) {
      throw new Error(`Invalid song preset: ${presetKey}`);
    }
  });

  return presets;
}

function copySections(sections) {
  return sections.map((section) => ({ label: section.label, bars: section.bars }));
}

function getLegacySongFromSetup(setupId, setup) {
  const snapshot = setup?.snapshot;
  if (!snapshot || typeof snapshot !== "object") {
    return null;
  }

  const sourceForm = snapshot.formKey === "customUser" && snapshot.customForm?.sections
    ? snapshot.customForm
    : forms[snapshot.formKey];
  if (!sourceForm?.sections) {
    return null;
  }

  const useBuiltInForm = builtInFormKeys.includes(snapshot.formKey);
  const totalBars = getTotalBars(sourceForm);
  const rootMap = snapshot.customBassRoots?.[snapshot.formKey] || {};
  const sourceSong = builtInSongPresets[snapshot.songPresetKey];

  return {
    title: String(setup.name || "Imported song").slice(0, 60),
    key: sourceSong?.key || "Custom",
    formKey: useBuiltInForm ? snapshot.formKey : undefined,
    sections: useBuiltInForm ? undefined : copySections(sourceForm.sections),
    bpm: Number(snapshot.bpm) || 140,
    timeSignature: String(snapshot.controls?.timeSignature || snapshot.beatsPerBar || 4),
    bassStyle: snapshot.controls?.bassStyle || "ballad",
    bassVolume: Number(snapshot.controls?.bassVolume ?? 80),
    bassOctave: Number(snapshot.controls?.bassOctave ?? 0),
    roots: Array.from({ length: totalBars }, (_, index) => rootMap[String(index)] || null),
    sourceSetupId: setupId
  };
}

function migrateLegacySetups() {
  const legacySetups = readStorage(storageKeys.legacySetups, {});
  if (!legacySetups || typeof legacySetups !== "object" || Array.isArray(legacySetups)) {
    return;
  }

  const localSongs = getLocalSongs();
  let changed = false;

  Object.entries(legacySetups).forEach(([setupId, setup]) => {
    if (Object.values(localSongs).some((song) => song.sourceSetupId === setupId)) {
      return;
    }

    const migratedSong = getLegacySongFromSetup(setupId, setup);
    if (migratedSong) {
      localSongs[`local-legacy-${setupId}`] = migratedSong;
      changed = true;
    }
  });

  if (changed) {
    writeStorage(storageKeys.localSongs, localSongs);
  }
}

async function loadSongPresets() {
  if (typeof window.fetch === "function") {
    try {
      const response = await window.fetch("songs.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Unable to load songs.json (${response.status})`);
      }

      builtInSongPresets = validateSongPresets(await response.json());
    } catch (error) {
      console.warn(error);
      builtInSongPresets = fallbackSongPresets;
    }
  }

  migrateLegacySetups();
  refreshSongPresetMap();
  renderSongPresetOptions();
}

function applySongPreset(presetKey) {
  const preset = songPresets[presetKey];
  state.songPresetKey = preset ? presetKey : "";
  state.selectedPhraseId = null;
  els.savePhrase.textContent = "Add range";

  if (!preset) {
    setSongPresetDisplay(null);
    syncSongEditorFromCurrent({ clearTitle: true });
    syncSongEditorState("New");
    persistAppState();
    return;
  }

  const formDefinition = core.resolveSongFormDefinition(preset, forms);
  if (!formDefinition) {
    setRuntimeStatus(`Unable to load ${preset.title || "song"}`);
    return;
  }

  if (formDefinition.usesCustomForm) {
    state.customForm = { name: preset.title, sections: copySections(formDefinition.sections) };
    forms.customUser = state.customForm;
    state.formKey = "customUser";
  } else {
    state.customForm = null;
    delete forms.customUser;
    state.formKey = formDefinition.formKey;
  }

  renderCustomFormOption();
  setSelectValue(els.formPreset, preset.displayFormKey || state.formKey);
  state.customBassRoots[state.formKey] = {};

  (preset.roots || []).forEach((roots, index) => {
    if (Array.isArray(roots) && roots.length) {
      state.customBassRoots[state.formKey][String(index)] = roots;
    }
  });

  setBpm(preset.bpm || 140);
  setSelectValue(els.timeSignature, preset.timeSignature || 4);
  state.beatsPerBar = Number(els.timeSignature.value);
  setSelectValue(els.bassStyle, preset.bassStyle);
  els.bassOctave.value = String(preset.bassOctave ?? 0);
  els.bassVolume.value = String(preset.bassVolume ?? 80);
  renderSectionLoopOptions();
  renderTradingModeOptions();
  renderFormGrid();
  els.rootEditEnabled.checked = true;
  syncBassEditorVisibility();
  openBarRootEditor(0);

  setSongPresetDisplay(preset);
  syncSongEditorFromCurrent();
  syncSongEditorState(isLocalSongKey(presetKey) ? "Saved" : "Built-in");
  persistAppState();
  restartIfPlaying();
}

function handleFormGridClick(event) {
  if (!els.rootEditEnabled.checked) {
    return;
  }

  const cell = event.target.closest(".bar-cell");
  if (!cell) {
    return;
  }

  openBarRootEditor(Number(cell.dataset.barIndex));
}

function renderCustomRootLabels() {
  state.barCells.forEach((cell) => {
    const barIndex = Number(cell.dataset.barIndex);
    const entry = getCustomRootEntry(barIndex);
    const label = cell.querySelector(".bar-root-label");

    cell.classList.toggle("has-custom-root", Boolean(entry));
    cell.classList.toggle("is-selected-edit", state.selectedBarIndex === barIndex);

    if (label) {
      label.textContent = getRootEntryLabel(entry);
    }

    const rootText = getRootEntryLabel(entry);
    cell.setAttribute("aria-label", rootText ? `Bar ${barIndex + 1}, bass ${rootText}` : `Bar ${barIndex + 1}, no bass note`);
    cell.setAttribute("aria-disabled", String(!els.rootEditEnabled.checked));
    cell.tabIndex = els.rootEditEnabled.checked ? 0 : -1;
  });
}

function getCurrentPhraseMapKey() {
  return state.songPresetKey || state.formKey;
}

function getCurrentPhraseMap() {
  const key = getCurrentPhraseMapKey();
  if (!state.phraseMaps[key]) {
    state.phraseMaps[key] = [];
  }

  state.phraseMaps[key].forEach((phrase, index) => {
    if (!phrase.id) {
      phrase.id = `phrase-${Date.now()}-${index}`;
    }
  });

  return state.phraseMaps[key];
}

function getBeatInChorus(position) {
  return position.barIndex * state.beatsPerBar + position.beatInBar - 1;
}

function clampPhraseRange(startBeat, lengthBeats) {
  return core.clampPhraseRange(startBeat, lengthBeats, getTotalBars() * state.beatsPerBar);
}

function renderPhraseBeatOptions() {
  const previousStart = Number(els.phraseStartBeat.value) || 1;
  const previousEnd = Number(els.phraseEndBeat.value) || state.beatsPerBar;
  els.phraseStartBeat.innerHTML = "";
  els.phraseEndBeat.innerHTML = "";

  for (let beat = 1; beat <= state.beatsPerBar; beat += 1) {
    const startOption = document.createElement("option");
    startOption.value = String(beat);
    startOption.textContent = String(beat);
    els.phraseStartBeat.append(startOption);

    const endOption = startOption.cloneNode(true);
    els.phraseEndBeat.append(endOption);
  }

  els.phraseStartBeat.value = String(Math.min(previousStart, state.beatsPerBar));
  els.phraseEndBeat.value = String(Math.min(previousEnd, state.beatsPerBar));
}

function syncPhraseMapInputs() {
  const totalBars = getTotalBars();

  els.phraseStartBar.max = String(totalBars);
  els.phraseStartBar.value = String(Math.min(Math.max(1, Number(els.phraseStartBar.value) || 1), totalBars));
  els.phraseEndBar.max = String(totalBars);
  els.phraseEndBar.value = String(Math.min(Math.max(1, Number(els.phraseEndBar.value) || 1), totalBars));
  renderPhraseBeatOptions();
}

function getSelectedPhraseColor() {
  return els.phraseColors.find((input) => input.checked)?.value || "blue";
}

function getPhrasePositionLabel(beatIndex, isEnd = false) {
  const adjustedBeat = isEnd ? Math.max(0, beatIndex - 1) : beatIndex;
  const bar = Math.floor(adjustedBeat / state.beatsPerBar) + 1;
  const beat = adjustedBeat % state.beatsPerBar + 1;
  return `${bar}.${beat}`;
}

function renderPhraseRanges() {
  const phrases = getCurrentPhraseMap();
  els.phraseRanges.innerHTML = "";

  if (!phrases.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No mapped ranges";
    els.phraseRanges.append(empty);
    return;
  }

  phrases.forEach((phrase, index) => {
    const row = document.createElement("div");
    row.className = "phrase-range-row";
    row.dataset.phraseId = phrase.id;

    const marker = document.createElement("span");
    marker.className = `range-marker is-${phrase.color}`;
    marker.setAttribute("aria-hidden", "true");

    const label = document.createElement("strong");
    label.textContent = `${index + 1}. ${getPhrasePositionLabel(phrase.startBeat)}-${getPhrasePositionLabel(phrase.startBeat + phrase.lengthBeats, true)}`;

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "icon-button range-action";
    edit.dataset.action = "edit";
    edit.setAttribute("aria-label", `Edit phrase range ${index + 1}`);
    edit.textContent = "Edit";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "icon-button range-action danger-button";
    remove.dataset.action = "delete";
    remove.setAttribute("aria-label", `Delete phrase range ${index + 1}`);
    remove.textContent = "Delete";

    row.append(marker, label, edit, remove);
    els.phraseRanges.append(row);
  });
}

function renderPhraseMapStatus() {
  const phraseCount = getCurrentPhraseMap().length;
  if (!els.phraseMapEnabled.checked) {
    els.phraseMapStatus.textContent = "Off";
    return;
  }

  els.phraseMapStatus.textContent = phraseCount === 1 ? "1 range" : `${phraseCount} ranges`;
}

function renderPhraseMap() {
  document.querySelectorAll(".phrase-map-fill").forEach((fill) => fill.remove());
  syncPhraseMapInputs();
  renderPhraseMapStatus();

  renderPhraseRanges();
  renderActiveSummaries();

  if (!els.phraseMapEnabled.checked) {
    return;
  }

  const phrases = getCurrentPhraseMap();
  state.barCells.forEach((cell) => {
    const barIndex = Number(cell.dataset.barIndex);
    const barStartBeat = barIndex * state.beatsPerBar;
    const barEndBeat = barStartBeat + state.beatsPerBar;

    phrases.forEach((phrase) => {
      const phraseEndBeat = phrase.startBeat + phrase.lengthBeats;
      const visibleStartBeat = Math.max(barStartBeat, phrase.startBeat);
      const visibleEndBeat = Math.min(barEndBeat, phraseEndBeat);

      if (visibleStartBeat >= visibleEndBeat) {
        return;
      }

      const fill = document.createElement("span");
      fill.className = `phrase-map-fill is-${phrase.color}`;
      fill.classList.toggle("is-range-start", visibleStartBeat === phrase.startBeat);
      fill.classList.toggle("is-range-end", visibleEndBeat === phraseEndBeat);
      fill.style.setProperty("--phrase-left", `${((visibleStartBeat - barStartBeat) / state.beatsPerBar) * 100}%`);
      fill.style.setProperty("--phrase-width", `${((visibleEndBeat - visibleStartBeat) / state.beatsPerBar) * 100}%`);
      fill.title = phrase.label;
      cell.prepend(fill);
    });
  });
}

function savePhraseMapRange() {
  const startBar = Number(els.phraseStartBar.value) || 1;
  const startBeat = Number(els.phraseStartBeat.value) || 1;
  const endBar = Number(els.phraseEndBar.value) || startBar;
  const endBeat = Number(els.phraseEndBeat.value) || state.beatsPerBar;
  const startBeatIndex = (startBar - 1) * state.beatsPerBar + startBeat - 1;
  const endBeatIndex = (endBar - 1) * state.beatsPerBar + endBeat;
  const phrase = clampPhraseRange(startBeatIndex, Math.max(1, endBeatIndex - startBeatIndex));
  const phrases = getCurrentPhraseMap();
  const existing = phrases.find((item) => item.id === state.selectedPhraseId);
  const nextPhrase = {
    id: existing?.id || `phrase-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label: existing?.label || `Phrase ${phrases.length + 1}`,
    startBeat: phrase.startBeat,
    lengthBeats: phrase.lengthBeats,
    color: getSelectedPhraseColor(),
    cueIn: els.phraseCueIn.checked,
    cueOut: els.phraseCueOut.checked
  };

  if (existing) {
    Object.assign(existing, nextPhrase);
  } else {
    phrases.push(nextPhrase);
  }

  state.selectedPhraseId = null;
  els.phraseMapEnabled.checked = true;
  els.savePhrase.textContent = "Add range";
  renderPhraseMap();
  persistAppState();
}

function clearPhraseMapRanges() {
  state.phraseMaps[getCurrentPhraseMapKey()] = [];
  state.selectedPhraseId = null;
  els.savePhrase.textContent = "Add range";
  renderPhraseMap();
  persistAppState();
}

function editPhraseRange(phraseId) {
  const phrase = getCurrentPhraseMap().find((item) => item.id === phraseId);
  if (!phrase) {
    return;
  }

  state.selectedPhraseId = phraseId;
  const endBeatIndex = phrase.startBeat + phrase.lengthBeats;
  els.phraseStartBar.value = String(Math.floor(phrase.startBeat / state.beatsPerBar) + 1);
  els.phraseStartBeat.value = String(phrase.startBeat % state.beatsPerBar + 1);
  els.phraseEndBar.value = String(Math.floor(Math.max(0, endBeatIndex - 1) / state.beatsPerBar) + 1);
  els.phraseEndBeat.value = String((Math.max(0, endBeatIndex - 1) % state.beatsPerBar) + 1);
  els.phraseColors.forEach((input) => {
    input.checked = input.value === phrase.color;
  });
  els.phraseCueIn.checked = phrase.cueIn;
  els.phraseCueOut.checked = phrase.cueOut;
  els.savePhrase.textContent = "Update range";
}

function handlePhraseRangeClick(event) {
  const button = event.target.closest("button[data-action]");
  const row = event.target.closest(".phrase-range-row");
  if (!button || !row) {
    return;
  }

  if (button.dataset.action === "edit") {
    editPhraseRange(row.dataset.phraseId);
    return;
  }

  state.phraseMaps[getCurrentPhraseMapKey()] = getCurrentPhraseMap().filter((phrase) => phrase.id !== row.dataset.phraseId);
  if (state.selectedPhraseId === row.dataset.phraseId) {
    state.selectedPhraseId = null;
    els.savePhrase.textContent = "Add range";
  }
  renderPhraseMap();
  persistAppState();
}

function renderFormGrid() {
  const form = getCurrentForm();
  let barNumber = 1;

  els.formGrid.innerHTML = "";
  els.formName.textContent = form.name;
  state.barCells = [];
  state.currentBarCell = null;
  state.lastTradingVisualKey = "";

  form.sections.forEach((section) => {
    const row = document.createElement("div");
    row.className = "section-row";

    const label = document.createElement("div");
    label.className = "section-label";
    label.textContent = section.label;

    const bars = document.createElement("div");
    bars.className = "bar-row";
    bars.style.setProperty("--bar-count", section.bars);

    for (let index = 0; index < section.bars; index += 1) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "bar-cell";
      cell.dataset.barIndex = String(barNumber - 1);
      cell.setAttribute("aria-label", `Bar ${barNumber}`);

      const number = document.createElement("span");
      number.className = "bar-number";
      number.textContent = String(barNumber);

      const rootLabel = document.createElement("span");
      rootLabel.className = "bar-root-label";

      cell.append(number, rootLabel);

      if (index === 0 || index === 4) {
        cell.classList.add("phrase-start");
      }

      bars.append(cell);
      state.barCells.push(cell);
      barNumber += 1;
    }

    row.append(label, bars);
    els.formGrid.append(row);
  });

  renderCustomRootLabels();
  renderPhraseMap();
  renderTradingOverlay(getPositionFromBeat(state.activeBeatIndex));
  renderActiveSummaries();
}

function renderTradingOverlay(position) {
  const loop = getActiveLoopRange();
  const visualKey = `${els.practiceMode.value}:${els.sectionLoop.value}:${position.chorus}`;
  if (visualKey === state.lastTradingVisualKey) {
    return;
  }

  state.lastTradingVisualKey = visualKey;
  state.barCells.forEach((cell) => {
    const barIndex = Number(cell.dataset.barIndex);
    const outsideLoop = loop.active && (barIndex < loop.start || barIndex >= loop.start + loop.bars);
    const samplePosition = {
      isCountIn: false,
      barIndex,
      beatInBar: 1,
      chorus: position.chorus,
      section: getSectionForBar(barIndex)
    };
    cell.classList.toggle("is-trading-you", !outsideLoop && isTradingMuteBar(samplePosition));
    cell.classList.toggle("is-outside-loop", outsideLoop);
  });
}

function renderPosition() {
  const position = getPositionFromBeat(state.activeBeatIndex);
  const totalBars = getTotalBars();
  const phraseIndex = position.isCountIn ? 1 : Math.floor(position.barIndex / 8) + 1;
  const phraseCount = Math.max(1, Math.ceil(totalBars / 8));

  els.currentSection.textContent = position.isCountIn ? "In" : position.section.label;
  els.currentBar.textContent = position.isCountIn ? String(position.countInBeat) : String(position.barIndex + 1);
  els.currentBar.classList.toggle("is-counting-in", position.isCountIn);
  els.currentBeat.textContent = position.isCountIn ? String(position.countInBeat) : String(position.beatInBar);
  els.currentChorus.textContent = String(position.chorus);
  els.nextSection.textContent = getNextSectionLabel(position);
  els.phraseStatus.textContent = `Phrase ${phraseIndex} of ${phraseCount}`;
  els.practiceStatus.textContent = getPracticeStatus(position);
  document.body.dataset.tradeTurn = getPracticeStatus(position).toLowerCase();

  if (state.currentBarCell) {
    state.currentBarCell.classList.remove("is-current");
  }

  state.currentBarCell = position.isCountIn ? null : state.barCells[position.barIndex] || null;
  if (state.currentBarCell) {
    state.currentBarCell.classList.add("is-current");
  }

  renderTradingOverlay(position);
  renderActiveSummaries();
}

function setSelectValue(select, value) {
  if (value === undefined || value === null) {
    return;
  }

  const nextValue = String(value);
  if (Array.from(select.options).some((option) => option.value === nextValue)) {
    select.value = nextValue;
  }
}

function renderCustomFormOption() {
  let option = els.formPreset.querySelector('option[value="customUser"]');
  if (!option) {
    option = document.createElement("option");
    option.value = "customUser";
    option.textContent = "Custom form";
    els.formPreset.append(option);
  }

  if (state.customForm) {
    forms.customUser = state.customForm;
  } else {
    delete forms.customUser;
  }
}

function formatSectionDefinition(sections) {
  return sections.map((section) => `${section.label}:${section.bars}`).join(", ");
}

function appendSongEditorFormOption(value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  els.songEditorForm.append(option);
}

function getSongEditorFormValue() {
  if (state.songPresetKey && !isLocalSongKey(state.songPresetKey)) {
    return "currentSong";
  }

  if (builtInFormKeys.includes(state.formKey) || state.formKey === "customUser") {
    return state.formKey;
  }

  return "currentSong";
}

function syncSongEditorCustomFields() {
  const isCustom = els.songEditorForm.value === "customUser";
  els.songEditorSectionsWrap.hidden = !isCustom;
  els.songEditorHint.hidden = !isCustom;

  if (isCustom && !els.songEditorSections.value.trim()) {
    els.songEditorSections.value = "A:8, A:8, B:8, A:8";
  }

  if (!isCustom) {
    els.songEditorHint.classList.remove("is-error");
  }
}

function renderSongEditorFormOptions() {
  const selectedValue = getSongEditorFormValue();
  els.songEditorForm.innerHTML = "";

  if (selectedValue === "currentSong") {
    const title = songPresets[state.songPresetKey]?.title || getCurrentForm()?.name || "Current song";
    appendSongEditorFormOption("currentSong", `Song form: ${title}`);
  }

  builtInFormKeys.forEach((formKey) => appendSongEditorFormOption(formKey, forms[formKey].name));
  appendSongEditorFormOption("customUser", "Custom form");
  setSelectValue(els.songEditorForm, selectedValue);

  if (selectedValue === "customUser" && state.customForm?.sections) {
    els.songEditorSections.value = formatSectionDefinition(state.customForm.sections);
  }

  syncSongEditorCustomFields();
}

function syncSongEditorState(status) {
  const isSavedSong = isLocalSongKey(state.songPresetKey);
  els.deleteSong.disabled = !isSavedSong;
  els.saveSong.textContent = isSavedSong ? "Update song" : "Save song";
  els.songEditorStatus.textContent = status || (isSavedSong ? "Saved" : state.songPresetKey ? "Built-in" : "New");
}

function markSongEditorChanged() {
  if (state.initialized) {
    syncSongEditorState("Changed");
  }
}

function syncSongEditorFromCurrent(options = {}) {
  const preset = songPresets[state.songPresetKey];
  if (preset) {
    els.songEditorTitle.value = preset.title || "";
    els.songEditorKey.value = preset.key || "";
  } else if (options.clearTitle) {
    els.songEditorTitle.value = "";
    els.songEditorKey.value = "";
  } else {
    els.songEditorTitle.value ||= state.customForm?.name || "";
  }

  renderSongEditorFormOptions();
  syncSongEditorState();
}

function applySongEditorDraft(options = {}) {
  const formValue = els.songEditorForm.value;

  if (formValue === "currentSong") {
    els.songKey.textContent = els.songEditorKey.value.trim() || songPresets[state.songPresetKey]?.key || "Custom";
    syncSongEditorState(options.status || "In use");
    if (options.announce !== false) {
      setRuntimeStatus(`Using ${els.songEditorTitle.value.trim() || "current song"}`);
    }
    return true;
  }

  const isCustom = formValue === "customUser";
  const sections = isCustom ? core.parseSectionDefinition(els.songEditorSections.value) : null;
  const totalBars = sections ? sections.reduce((total, section) => total + section.bars, 0) : 0;

  if ((!isCustom && !builtInFormKeys.includes(formValue)) || (isCustom && (!sections || totalBars > 64))) {
    els.songEditorHint.hidden = false;
    els.songEditorHint.textContent = "Use entries such as A:8, B:8, with 64 bars or fewer.";
    els.songEditorHint.classList.add("is-error");
    return false;
  }

  const previousFormKey = state.formKey;
  state.formKey = formValue;
  state.songPresetKey = "";
  state.selectedBarIndex = null;
  state.selectedPhraseId = null;
  els.savePhrase.textContent = "Add range";

  if (previousFormKey !== formValue) {
    state.customBassRoots[formValue] = {};
    state.phraseMaps[formValue] = [];
  }

  if (isCustom) {
    const name = els.songEditorTitle.value.trim().slice(0, 60) || "Custom form";
    state.customForm = { name, sections };
    forms.customUser = state.customForm;
    els.songEditorHint.textContent = `${totalBars} bars ready.`;
    els.songEditorHint.classList.remove("is-error");
  } else {
    state.customForm = null;
    delete forms.customUser;
    if (previousFormKey === "customUser") {
      delete state.customBassRoots.customUser;
      delete state.phraseMaps.customUser;
    }
  }

  renderCustomFormOption();
  setSelectValue(els.formPreset, state.formKey);
  setSongPresetDisplay(null);
  els.songKey.textContent = els.songEditorKey.value.trim() || "Custom";
  closeBarRootEditor();
  renderSectionLoopOptions();
  renderTradingModeOptions();
  renderFormGrid();
  if (els.rootEditEnabled.checked) {
    openBarRootEditor(0);
  }
  renderSongEditorFormOptions();
  syncSongEditorState(options.status || "In use");
  persistAppState();
  restartIfPlaying();
  if (options.announce !== false) {
    setRuntimeStatus(`Using ${isCustom ? state.customForm.name : forms[state.formKey].name}`);
  }
  return true;
}

function getCurrentSongRoots() {
  const rootMap = getCurrentFormCustomRoots();
  return Array.from({ length: getTotalBars() }, (_, index) => rootMap[String(index)] || null);
}

function createLocalSongRecord(title, key) {
  const usesBuiltInForm = builtInFormKeys.includes(state.formKey);
  return {
    title: title.slice(0, 60),
    key: key.slice(0, 40) || "Custom",
    formKey: usesBuiltInForm ? state.formKey : undefined,
    sections: usesBuiltInForm ? undefined : copySections(getCurrentForm().sections),
    bpm: state.bpm,
    timeSignature: String(els.timeSignature.value),
    bassStyle: els.bassStyle.value,
    bassVolume: Number(els.bassVolume.value),
    bassOctave: Number(els.bassOctave.value),
    roots: getCurrentSongRoots()
  };
}

function saveLocalSong() {
  const title = els.songEditorTitle.value.trim();
  if (!title) {
    els.songEditorTitle.focus();
    return;
  }

  const selectedLocalKey = isLocalSongKey(state.songPresetKey) ? state.songPresetKey : "";
  if (!applySongEditorDraft({ announce: false, status: "Saving" })) {
    return;
  }

  const localSongs = getLocalSongs();
  const songKey = selectedLocalKey || `local-${Date.now()}`;
  localSongs[songKey] = createLocalSongRecord(title, els.songEditorKey.value.trim());
  writeStorage(storageKeys.localSongs, localSongs);
  refreshSongPresetMap();
  state.songPresetKey = songKey;
  renderSongPresetOptions();
  setSongPresetDisplay(songPresets[songKey]);
  syncSongEditorFromCurrent();
  syncSongEditorState("Saved");
  persistAppState();
  setRuntimeStatus(`Saved song ${title}`);
}

function deleteLocalSong() {
  const songKey = state.songPresetKey;
  if (!isLocalSongKey(songKey)) {
    return;
  }

  const title = songPresets[songKey].title;
  const localSongs = getLocalSongs();
  delete localSongs[songKey];
  writeStorage(storageKeys.localSongs, localSongs);
  refreshSongPresetMap();
  state.songPresetKey = "";
  renderSongPresetOptions();
  setSongPresetDisplay(null);
  els.songKey.textContent = els.songEditorKey.value.trim() || "Custom";
  renderSongEditorFormOptions();
  syncSongEditorState("New");
  persistAppState();
  setRuntimeStatus(`Deleted song ${title}`);
}

function getPracticeSnapshot() {
  return {
    version: 2,
    bpm: state.bpm,
    beatsPerBar: state.beatsPerBar,
    formKey: state.formKey,
    songPresetKey: state.songPresetKey,
    customForm: state.formKey === "customUser" ? state.customForm : null,
    customBassRoots: state.customBassRoots,
    phraseMaps: state.phraseMaps,
    controls: {
      timeSignature: els.timeSignature.value,
      clickMode: els.clickMode.value,
      countIn: els.countIn.value,
      cueInterval: els.cueInterval.value,
      chorusCue: els.chorusCue.checked,
      clickVolume: els.clickVolume.value,
      cueVolume: els.cueVolume.value,
      bassStyle: els.bassStyle.value,
      bassVolume: els.bassVolume.value,
      bassOctave: els.bassOctave.value,
      bassEnabled: els.rootEditEnabled.checked,
      practiceMode: els.practiceMode.value,
      tradingBass: els.tradingBass.value,
      sectionLoop: els.sectionLoop.value,
      phraseMapEnabled: els.phraseMapEnabled.checked
    }
  };
}

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Unable to read ${key}`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Unable to save ${key}`, error);
    return false;
  }
}

function persistAppState() {
  if (!state.initialized) {
    return;
  }

  writeStorage(storageKeys.current, getPracticeSnapshot());
}

function applyPracticeSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object") {
    return false;
  }

  const snapshotCustomForm = snapshot.formKey === "customUser" && snapshot.customForm?.sections
    ? snapshot.customForm
    : null;
  state.customForm = snapshotCustomForm;
  if (snapshotCustomForm) {
    forms.customUser = snapshotCustomForm;
  } else {
    delete forms.customUser;
  }
  renderCustomFormOption();

  const nextFormKey = forms[snapshot.formKey] ? snapshot.formKey : "aaba32";
  state.formKey = nextFormKey;
  state.songPresetKey = songPresets[snapshot.songPresetKey] ? snapshot.songPresetKey : "";
  state.customBassRoots = snapshot.customBassRoots && typeof snapshot.customBassRoots === "object" ? snapshot.customBassRoots : {};
  state.phraseMaps = snapshot.phraseMaps && typeof snapshot.phraseMaps === "object" ? snapshot.phraseMaps : {};
  state.beatsPerBar = Number(snapshot.beatsPerBar) || 4;
  setBpm(Number(snapshot.bpm) || 140);
  const displayFormKey = songPresets[state.songPresetKey]?.displayFormKey || nextFormKey;
  setSelectValue(els.formPreset, displayFormKey);
  setSelectValue(els.timeSignature, snapshot.controls?.timeSignature || state.beatsPerBar);
  state.beatsPerBar = Number(els.timeSignature.value);

  renderSectionLoopOptions();
  setSelectValue(els.sectionLoop, snapshot.controls?.sectionLoop);
  renderTradingModeOptions();
  setSelectValue(els.practiceMode, snapshot.controls?.practiceMode);
  setSelectValue(els.tradingBass, snapshot.controls?.tradingBass);
  setSelectValue(els.clickMode, snapshot.controls?.clickMode);
  setSelectValue(els.countIn, snapshot.controls?.countIn);
  setSelectValue(els.cueInterval, snapshot.controls?.cueInterval);
  setSelectValue(els.bassStyle, snapshot.controls?.bassStyle);
  setSelectValue(els.bassOctave, snapshot.controls?.bassOctave);
  els.chorusCue.checked = snapshot.controls?.chorusCue ?? true;
  els.rootEditEnabled.checked = snapshot.controls?.bassEnabled ?? false;
  els.phraseMapEnabled.checked = snapshot.controls?.phraseMapEnabled ?? false;
  els.clickVolume.value = snapshot.controls?.clickVolume ?? 70;
  els.cueVolume.value = snapshot.controls?.cueVolume ?? 85;
  els.bassVolume.value = snapshot.controls?.bassVolume ?? 80;

  renderFormGrid();
  syncBassEditorVisibility();
  if (els.rootEditEnabled.checked) {
    openBarRootEditor(0);
  }
  setSongPresetDisplay(songPresets[state.songPresetKey] || null);
  syncSongEditorFromCurrent();
  renderPosition();
  return true;
}

async function requestWakeLock() {
  if (!state.isPlaying || !navigator.wakeLock?.request || state.wakeLock) {
    return;
  }

  try {
    state.wakeLock = await navigator.wakeLock.request("screen");
    state.wakeLock.addEventListener("release", () => {
      state.wakeLock = null;
    });
  } catch (error) {
    console.warn("Screen wake lock unavailable", error);
  }
}

async function releaseWakeLock() {
  if (!state.wakeLock) {
    return;
  }

  try {
    await state.wakeLock.release();
  } catch (error) {
    console.warn("Could not release wake lock", error);
  }
  state.wakeLock = null;
}

async function toggleSoloView() {
  const entering = !document.body.classList.contains("solo-view");
  document.body.classList.toggle("solo-view", entering);
  els.soloToggle.textContent = entering ? "Exit solo" : "Solo view";

  try {
    if (entering && document.documentElement.requestFullscreen && !document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else if (!entering && document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen();
    }
  } catch (error) {
    setRuntimeStatus(entering ? "Solo view active" : "Solo view closed");
  }
}

function bindEvents() {
  els.startStop.addEventListener("click", () => {
    if (state.isPlaying) {
      stopMetronome();
    } else {
      startMetronome().catch(handleStartError);
    }
  });

  els.bpm.addEventListener("input", handleBpmInput);
  els.bpm.addEventListener("blur", commitBpmInput);
  els.bpm.addEventListener("keydown", handleBpmKeydown);
  els.bpmRange.addEventListener("input", () => setBpm(Number(els.bpmRange.value)));
  els.bpmDown.addEventListener("click", () => changeBpm(-1));
  els.bpmUp.addEventListener("click", () => changeBpm(1));
  els.tapTempo.addEventListener("click", handleTapTempo);
  els.formGrid.addEventListener("click", handleFormGridClick);
  els.rootEditEnabled.addEventListener("change", () => {
    syncBassEditorVisibility();

    if (!els.rootEditEnabled.checked) {
      closeBarRootEditor();
    }

    renderCustomRootLabels();
    renderActiveSummaries();
  });
  els.barRootPrimary.addEventListener("change", saveSelectedBarRoot);
  els.barRootSplit.addEventListener("change", () => {
    syncSplitRootVisibility();
    saveSelectedBarRoot();
  });
  els.barRootSecondary.addEventListener("change", saveSelectedBarRoot);
  els.saveBarRoot.addEventListener("click", saveSelectedBarRoot);
  els.clearBarRoot.addEventListener("click", clearSelectedBarRoot);
  els.phraseMapEnabled.addEventListener("change", renderPhraseMap);
  els.savePhrase.addEventListener("click", savePhraseMapRange);
  els.clearPhrases.addEventListener("click", clearPhraseMapRanges);
  els.phraseRanges.addEventListener("click", handlePhraseRangeClick);
  els.useSongDraft.addEventListener("click", () => applySongEditorDraft());
  els.songEditorForm.addEventListener("change", () => {
    syncSongEditorCustomFields();
    markSongEditorChanged();
  });
  [els.songEditorTitle, els.songEditorKey, els.songEditorSections].forEach((control) => {
    control.addEventListener("input", markSongEditorChanged);
  });
  els.saveSong.addEventListener("click", saveLocalSong);
  els.deleteSong.addEventListener("click", deleteLocalSong);
  els.soloToggle.addEventListener("click", () => toggleSoloView());

  els.songPreset.addEventListener("change", () => {
    applySongPreset(els.songPreset.value);
  });

  els.formPreset.addEventListener("change", () => {
    const previousFormKey = state.formKey;
    state.formKey = els.formPreset.value;
    state.songPresetKey = "";
    state.selectedPhraseId = null;
    els.savePhrase.textContent = "Add range";

    if (state.formKey === "customUser") {
      if (previousFormKey !== "customUser") {
        state.customBassRoots.customUser = {};
        state.phraseMaps.customUser = [];
      }
      const sections = core.parseSectionDefinition(els.songEditorSections.value)
        || [{ label: "A", bars: 8 }, { label: "A", bars: 8 }, { label: "B", bars: 8 }, { label: "A", bars: 8 }];
      state.customForm = {
        name: "Custom form",
        sections
      };
      forms.customUser = state.customForm;
      els.songEditorPanel.open = true;
    } else {
      state.customForm = null;
      delete forms.customUser;
    }

    setSongPresetDisplay(null);
    closeBarRootEditor();
    renderSectionLoopOptions();
    renderTradingModeOptions();
    renderFormGrid();
    if (els.rootEditEnabled.checked) {
      openBarRootEditor(0);
    }
    syncSongEditorFromCurrent({ clearTitle: true });
    syncSongEditorState("Changed");
    restartIfPlaying();
  });

  els.timeSignature.addEventListener("change", () => {
    state.beatsPerBar = Number(els.timeSignature.value);
    renderPhraseMap();
    markSongEditorChanged();
    restartIfPlaying();
  });

  [els.practiceMode, els.sectionLoop, els.tradingBass].forEach((control) => {
    control.addEventListener("change", () => {
      state.lastTradingVisualKey = "";
      renderPosition();
      persistAppState();
    });
  });

  [els.clickMode, els.countIn, els.cueInterval, els.chorusCue, els.bassStyle, els.bassOctave, els.clickVolume, els.cueVolume, els.bassVolume].forEach((control) => {
    control.addEventListener("change", () => {
      renderActiveSummaries();
      if ([els.bassStyle, els.bassOctave, els.bassVolume].includes(control)) {
        markSongEditorChanged();
      }
      persistAppState();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      requestWakeLock();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && document.body.classList.contains("solo-view")) {
      document.body.classList.remove("solo-view");
      els.soloToggle.textContent = "Solo view";
    }
  });

  document.querySelector(".app-shell").addEventListener("change", persistAppState);
}

async function init() {
  setRuntimeStatus("Ready");
  await loadSongPresets();
  setBpm(state.bpm);
  const restored = applyPracticeSnapshot(readStorage(storageKeys.current, null));

  if (!restored) {
    setSongPresetDisplay(null);
    syncBassEditorVisibility();
    renderSectionLoopOptions();
    renderTradingModeOptions();
    renderFormGrid();
    renderPosition();
  }

  syncSongEditorFromCurrent();
  bindEvents();
  const mobileSettings = window.matchMedia("(max-width: 560px)");
  if (mobileSettings.matches) {
    els.settingsPanel.open = false;
  }
  mobileSettings.addEventListener?.("change", (event) => {
    if (!event.matches) {
      els.settingsPanel.open = true;
    }
  });
  state.initialized = true;
  persistAppState();

  if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.warn("Offline mode unavailable", error);
    });
  }
}

init().catch((error) => {
  console.error(error);
  setRuntimeStatus("Unable to start");
});
