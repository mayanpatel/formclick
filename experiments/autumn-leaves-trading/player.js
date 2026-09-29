(() => {
  "use strict";

  const chart = typeof module !== "undefined" ? require("./chart.js") : { CHORDS, isBackingBar };
  const barBeats = 4;
  const chorusBeats = chart.CHORDS.length * barBeats;

  function parseTake(base64, MidiClass) {
    const bytes = Uint8Array.from(window.atob(base64), (character) => character.charCodeAt(0));
    const midi = new MidiClass(bytes);
    const track = midi.tracks.find((item) => item.notes.length);
    if (!track) throw new Error("The MIDI take has no notes");
    track.notes.forEach((note) => {
      const startBeat = note.ticks / midi.header.ppq;
      const endBeat = (note.ticks + note.durationTicks) / midi.header.ppq;
      const bar = Math.floor(startBeat / barBeats);
      const phraseEnd = (Math.floor(bar / 4) + 1) * 4 * barBeats;
      if (bar < 0 || bar >= chart.CHORDS.length || !chart.isBackingBar(bar) || endBeat > phraseEnd + 0.001) {
        throw new Error("MIDI note crosses a trading boundary");
      }
    });
    return { midi, track };
  }

  if (typeof module !== "undefined") module.exports = { parseTake };
  if (typeof document === "undefined") return;

  const els = {
    bpm: document.querySelector("#bpm"),
    play: document.querySelector("#play"),
    readout: document.querySelector("#readout"),
    turn: document.querySelector("#turn"),
    bar: document.querySelector("#bar"),
    chord: document.querySelector("#chord"),
    chorus: document.querySelector("#chorus"),
    dots: document.querySelector("#beat-dots"),
    grid: document.querySelector("#grid"),
    status: document.querySelector("#status")
  };
  const cells = chart.CHORDS.map((chord, index) => {
    const cell = document.createElement("div");
    cell.className = `bar${chart.isBackingBar(index) ? "" : " yours"}`;
    cell.innerHTML = `<small>${index + 1}</small><strong>${chord.symbol}</strong>`;
    els.grid.append(cell);
    return cell;
  });
  const dots = Array.from(els.dots.children);
  const take = parseTake(MIDI_BASE64, Midi);
  let sampler = null;
  let playing = false;
  let starting = false;
  let generation = 0;
  let bpm = 136;
  let beatCounter = 0;

  function draw(absoluteBeat) {
    const safeBeat = Math.max(0, absoluteBeat);
    const beatInChorus = safeBeat % chorusBeats;
    const barIndex = Math.floor(beatInChorus / barBeats);
    const beatInBar = beatInChorus % barBeats;
    const backing = chart.isBackingBar(barIndex);
    els.turn.textContent = backing ? "Backing solo" : "Your solo";
    els.readout.classList.toggle("is-yours", !backing);
    els.bar.textContent = String(barIndex + 1);
    els.chord.textContent = chart.CHORDS[barIndex].symbol;
    els.chorus.textContent = String(Math.floor(safeBeat / chorusBeats) + 1);
    cells.forEach((cell, index) => cell.classList.toggle("current", index === barIndex));
    dots.forEach((dot, index) => dot.classList.toggle("active", index === beatInBar));
    els.dots.setAttribute("aria-label", `Beat ${beatInBar + 1} of 4`);
  }

  function scheduleTake(runGeneration) {
    const transport = Tone.getTransport();
    transport.cancel(0);
    transport.bpm.value = bpm;
    transport.timeSignature = 4;
    transport.loop = true;
    transport.loopStart = 0;
    transport.loopEnd = "32m";
    beatCounter = 0;

    take.track.notes.forEach((note) => {
      const toneTicks = Math.round(note.ticks * transport.PPQ / take.midi.header.ppq);
      const duration = note.durationTicks / take.midi.header.ppq * 60 / bpm;
      transport.schedule((time) => {
        if (runGeneration === generation) {
          sampler.triggerAttackRelease(note.name, duration, time, note.velocity);
        }
      }, `${toneTicks}i`);
    });
    transport.scheduleRepeat((time) => {
      const beat = beatCounter++;
      Tone.getDraw().schedule(() => {
        if (runGeneration === generation) draw(beat);
      }, time);
    }, "4n");
  }

  function stop(message = "Stopped") {
    generation += 1;
    playing = false;
    starting = false;
    Tone.getTransport().stop();
    Tone.getTransport().cancel(0);
    if (sampler) sampler.releaseAll();
    els.play.textContent = "Start";
    els.play.disabled = false;
    els.bpm.disabled = false;
    els.status.textContent = message;
    draw(0);
  }

  async function start() {
    if (starting || playing) return;
    starting = true;
    els.play.disabled = true;
    const runGeneration = ++generation;
    bpm = Math.min(240, Math.max(60, Number(els.bpm.value) || 136));
    els.bpm.value = String(bpm);
    try {
      await Tone.start();
      if (runGeneration !== generation) return;
      if (!sampler) {
        sampler = new Tone.Sampler({
          urls: {
            C2: `data:audio/mpeg;base64,${BASS_SAMPLES[36]}`,
            F2: `data:audio/mpeg;base64,${BASS_SAMPLES[41]}`,
            Bb2: `data:audio/mpeg;base64,${BASS_SAMPLES[46]}`,
            Eb3: `data:audio/mpeg;base64,${BASS_SAMPLES[51]}`,
            A3: `data:audio/mpeg;base64,${BASS_SAMPLES[57]}`
          },
          attack: 0.003,
          release: 0.14
        }).toDestination();
        sampler.volume.value = -2;
      }
      els.status.textContent = "Loading bass sound";
      await Tone.loaded();
      if (runGeneration !== generation || document.hidden) return;
      scheduleTake(runGeneration);
      Tone.getTransport().start("+0.08");
      playing = true;
      els.play.textContent = "Stop";
      els.bpm.disabled = true;
      els.status.textContent = "Playing MIDI take";
    } catch (error) {
      stop("Audio unavailable. Press Start again to retry.");
    } finally {
      starting = false;
      els.play.disabled = false;
    }
  }

  els.play.addEventListener("click", () => playing ? stop() : start());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && (playing || starting)) stop("Paused in background");
  });
  draw(0);
})();
