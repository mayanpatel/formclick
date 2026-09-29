const CHORD_SYMBOLS = [
  "Cm7", "F7", "Bbmaj7", "Ebmaj7", "Am7b5", "D7", "Gm7", "Gm7",
  "Cm7", "F7", "Bbmaj7", "Ebmaj7", "Am7b5", "D7", "Gm7", "Gm7",
  "Am7b5", "D7", "Gm7", "Gm7", "Cm7", "F7", "Bbmaj7", "Ebmaj7",
  "Am7b5", "D7", "Gm7", "Cm7", "F7", "Bbmaj7", "Ebmaj7", "D7"
];
const PITCH_CLASSES = { C: 0, D: 2, Eb: 3, F: 5, G: 7, A: 9, Bb: 10 };
const CHORD_INTERVALS = {
  m7: [0, 3, 7, 10],
  "7": [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  m7b5: [0, 3, 6, 10]
};

function parseChord(symbol) {
  const match = /^([A-G](?:b|#)?)(m7b5|maj7|m7|7)$/.exec(symbol);
  if (!match || PITCH_CLASSES[match[1]] === undefined) throw new Error(`Unsupported chord: ${symbol}`);
  return { symbol, root: match[1], intervals: CHORD_INTERVALS[match[2]] };
}

const CHORDS = CHORD_SYMBOLS.map(parseChord);

function rootMidi(root) {
  return 36 + PITCH_CLASSES[root];
}

function isBackingBar(barIndex) {
  return Math.floor(barIndex / 4) % 2 === 0;
}

if (typeof module !== "undefined") {
  module.exports = { CHORD_SYMBOLS, CHORDS, parseChord, rootMidi, isBackingBar };
}
