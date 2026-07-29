(function attachFormClickCore(root, factory) {
  const api = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  root.FormClickCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createFormClickCore() {
  function getTotalBars(form) {
    return form.sections.reduce((total, section) => total + section.bars, 0);
  }

  function getSectionForBar(barIndex, form) {
    let runningBars = 0;

    for (let index = 0; index < form.sections.length; index += 1) {
      const section = form.sections[index];
      const start = runningBars;
      const end = start + section.bars;

      if (barIndex >= start && barIndex < end) {
        return { index, label: section.label, start, end, bars: section.bars };
      }

      runningBars = end;
    }

    const index = form.sections.length - 1;
    const section = form.sections[index];
    return {
      index,
      label: section.label,
      start: getTotalBars(form) - section.bars,
      end: getTotalBars(form),
      bars: section.bars
    };
  }

  function getLoopRange(form, sectionLoopValue) {
    const totalBars = getTotalBars(form);

    if (sectionLoopValue === "off") {
      return { active: false, start: 0, bars: totalBars, sectionIndex: null };
    }

    const sectionIndex = Number(sectionLoopValue);
    const section = form.sections[sectionIndex];
    if (!section) {
      return { active: false, start: 0, bars: totalBars, sectionIndex: null };
    }

    const start = form.sections
      .slice(0, sectionIndex)
      .reduce((total, current) => total + current.bars, 0);

    return { active: true, start, bars: section.bars, sectionIndex };
  }

  function getPositionFromBeat({ beatIndex, form, beatsPerBar, sectionLoopValue = "off" }) {
    const totalBars = getTotalBars(form);
    const beatsPerChorus = totalBars * beatsPerBar;

    if (beatIndex < 0) {
      return {
        isCountIn: true,
        countInBeat: Math.abs(beatIndex),
        barIndex: 0,
        beatInBar: 1,
        chorus: 1,
        section: getSectionForBar(0, form)
      };
    }

    const loop = getLoopRange(form, sectionLoopValue);
    let absoluteBeatInForm = beatIndex % beatsPerChorus;
    let chorus = Math.floor(beatIndex / beatsPerChorus) + 1;

    if (loop.active) {
      const loopBeats = loop.bars * beatsPerBar;
      absoluteBeatInForm = loop.start * beatsPerBar + beatIndex % loopBeats;
      chorus = Math.floor(beatIndex / loopBeats) + 1;
    }

    const barIndex = Math.floor(absoluteBeatInForm / beatsPerBar);
    return {
      isCountIn: false,
      barIndex,
      beatInBar: absoluteBeatInForm % beatsPerBar + 1,
      chorus,
      section: getSectionForBar(barIndex, form)
    };
  }

  function getTradingOptions(totalBars) {
    if (totalBars === 8 || totalBars === 12) {
      return [
        { value: "normal", label: "Normal" },
        { value: "trade4", label: "Trade 4s" },
        { value: "trade2", label: "Trade 2s" },
        { value: "tradeChoruses", label: "Trade choruses" }
      ];
    }

    if (totalBars === 16) {
      return [
        { value: "normal", label: "Normal" },
        { value: "trade4", label: "Trade 4s" },
        { value: "trade8", label: "Trade 8s" },
        { value: "tradeChoruses", label: "Trade choruses" }
      ];
    }

    return [
      { value: "normal", label: "Normal" },
      { value: "trade4", label: "Trade 4s" },
      { value: "trade8", label: "Trade 8s" },
      { value: "tradeSections", label: "Trade sections" },
      { value: "tradeChoruses", label: "Trade choruses" }
    ];
  }

  function getTradeBlockBars(mode) {
    const match = /^trade(2|4|8)$/.exec(mode);
    return match ? Number(match[1]) : 0;
  }

  function isTradingMuteBar(position, mode, loop) {
    if (position.isCountIn || mode === "normal") {
      return false;
    }

    if (mode === "tradeChoruses") {
      return position.chorus % 2 === 0;
    }

    if (mode === "tradeSections") {
      return loop.active ? position.chorus % 2 === 0 : position.section.index % 2 === 1;
    }

    const tradeBars = getTradeBlockBars(mode);
    if (!tradeBars) {
      return false;
    }

    const relativeBar = loop.active ? position.barIndex - loop.start : position.barIndex;
    return Math.floor(Math.max(0, relativeBar) / tradeBars) % 2 === 1;
  }

  function clampPhraseRange(startBeat, lengthBeats, totalBeats) {
    const safeStart = Math.min(Math.max(0, startBeat), Math.max(0, totalBeats - 1));
    const safeLength = Math.min(Math.max(1, lengthBeats), totalBeats - safeStart);
    return { startBeat: safeStart, lengthBeats: safeLength, endBeat: safeStart + safeLength };
  }

  function parseSectionDefinition(value) {
    const parts = value.split(",").map((part) => part.trim()).filter(Boolean);
    if (!parts.length) {
      return null;
    }

    const sections = [];
    for (const part of parts) {
      const match = /^([^:]+):([1-9][0-9]?)$/.exec(part);
      if (!match) {
        return null;
      }

      sections.push({ label: match[1].trim().slice(0, 4), bars: Number(match[2]) });
    }

    return sections;
  }

  function normalizeSongSections(sections) {
    if (!Array.isArray(sections) || !sections.length) {
      return null;
    }

    const normalized = sections.map((section) => ({
      label: typeof section?.label === "string" ? section.label.trim() : "",
      bars: Number(section?.bars)
    }));
    const totalBars = normalized.reduce((total, section) => total + section.bars, 0);

    if (normalized.some((section) => !section.label || !Number.isInteger(section.bars) || section.bars < 1) || totalBars > 64) {
      return null;
    }

    return normalized;
  }

  function resolveSongFormDefinition(preset, availableForms) {
    const knownForm = typeof preset?.formKey === "string" && preset.formKey !== "customUser"
      ? availableForms[preset.formKey]
      : null;
    if (knownForm?.sections) {
      return {
        formKey: preset.formKey,
        sections: knownForm.sections,
        usesCustomForm: false
      };
    }

    const customSections = normalizeSongSections(preset?.sections);
    if (!customSections) {
      return null;
    }

    return {
      formKey: "customUser",
      sections: customSections,
      usesCustomForm: true
    };
  }

  return {
    clampPhraseRange,
    getLoopRange,
    getPositionFromBeat,
    getSectionForBar,
    getTotalBars,
    getTradeBlockBars,
    getTradingOptions,
    isTradingMuteBar,
    normalizeSongSections,
    resolveSongFormDefinition,
    parseSectionDefinition
  };
});
