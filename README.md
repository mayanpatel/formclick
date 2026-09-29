# FormClick

FormClick is a form-aware metronome prototype for jazz drummers. The app is intentionally built in small, testable iterations so each practice feature can be checked before the next layer is added.

## Current Milestone: v2.0

Version 2.0 turns the prototype into a more complete, installable practice tool while preserving the sequencer-first workflow.

Included:

- Start and stop transport.
- BPM input, ±1 and ±10 buttons, slider, and tap tempo.
- Time signature selection.
- Count-in with numeric countdown in the bar readout.
- Click modes: quarter notes, 2 & 4, beat 1 only, barline only, and off.
- Cue intervals for phrase landmarks.
- Fixed ride-bell cue sound for regular cues and top-of-chorus cues.
- Optional top-of-chorus bell.
- Jazz form grid with section labels, current bar highlight, chorus count, and next-section indicator.
- Built-in form presets: 12-bar blues, 32-bar AABA, 32-bar ABAC, rhythm changes, 16-bar tune, and modal/vamp.
- Song presets for Autumn Leaves, Sunny Side of the Street, Blue Bossa, I Got Rhythm, and Have You Met Miss Jones.
- Song presets dropdown is populated from `songs.json`.
- Separate No song and Custom choices, with a Clear current song button that keeps the form but removes its bass assignments.
- Song presets automatically enable Bass editor.
- Song presets set a recommended bass octave.
- Practice tools panel combining section looping, form-aware trading, and click-gap practice.
- Click gaps alternate 1, 2, 4, or 8 audible bars with the same number of silent bars; cues and bass remain independent.
- Trading bass has an inline hover/focus explanation of Full form and Band only.
- Trading mode dropdown shows form-aware options.
- Trading bass control with Full form and Band only options.
- Section loop control for drilling part of a form.
- Phrase map panel for highlighting full or partial-bar ranges on top of the form.
- Optional phrase-map cue-in and cue-out sounds.
- Bass tone uses generated plucked-string samples with synth fallback.
- Bass editor switch with style, volume, and octave controls.
- Bass editor guidance explains that you select a bar in the sequencer before assigning its note.
- Bass styles: whole notes, walking bass, and jazz quarter pulse.
- Walking bass and jazz quarter pulse use warmer, more humanized note articulation.
- Preset-aware root movement for AABA, ABAC, blues, rhythm changes, 16-bar tune, and modal/vamp.
- Bass editor for assigning custom roots to individual bars.
- Optional half-bar split roots, such as C/F inside one bar.
- Edited bars display their custom root labels in the form grid.
- Compact practice-first layout with sticky playback readouts.
- Responsive iPad layout and horizontally scrollable, touch-sized mobile form grid.
- Song section containing Song presets, the Song editor, and the Bass editor.
- Song editor combines form choice, custom sections, title/key details, and local song saving.
- Custom forms appear as a single `Custom form` choice instead of adding named entries to the main Form dropdown.
- Expandable Phrase map, Song editor, and mixer tools.
- Active loop, bass, trading, and map summaries beside the form title.
- Editable phrase-map ranges with individual edit and delete actions.
- Automatic settings restore and locally saved songs with Save/Update/Delete states.
- Conditional custom form editing using section definitions such as `A:8, B:8`.
- Separate click, cue, and bass volumes with master output limiting.
- Working Trade 2s, Trade Sections, and Trade Choruses modes.
- Form-grid Band/You indicators during trading.
- Fullscreen Solo View and screen wake lock while playing.
- Audio interruptions pause playback and offer a Resume control at the same bar, with a longer reconnect window and a fresh audio engine on retry when needed.
- Installable PWA shell with verified offline loading.
- Testable form, loop, phrase, and trading logic in `core.js`.

## Run

Open `index.html` directly in a browser, or serve this folder locally:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

Use the localhost or hosted version when installing FormClick or testing offline mode. In Safari on iPad, choose Share, then Add to Home Screen. Open the installed app online once so its files are cached before relying on it offline.

## Song Data

Built-in song presets live in `songs.json`. Each song defines its title, key, BPM, bass octave, and bar-by-bar bass roots. Songs created in the Song editor are kept in browser storage and appear under My songs in the same dropdown.

For a standard structure, add its known `formKey`, such as `aaba32`, `blues12`, or `sixteen16`. For an unusual structure, use `sections` instead (or include `formKey: "custom"` as a readable label); FormClick uses the sections whenever the form key is not recognised. A song must provide either a recognised form key or valid sections.

```json
"customExample": {
  "title": "My 20-bar Tune",
  "key": "D minor",
  "formKey": "custom",
  "sections": [{ "label": "A", "bars": 8 }, { "label": "B", "bars": 4 }, { "label": "C", "bars": 8 }],
  "bpm": 150,
  "bassOctave": 0,
  "roots": [["D1"], ["G1"], ["A1"], ["D1"], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
}
```

Use `null` for a bar that should not trigger a bass note.

When opening the app directly as a `file://` page, some browsers block loading JSON files. The app keeps a built-in fallback copy of the current songs so local file testing still works. When served over localhost or hosted online, the dropdown loads from `songs.json`.

## v2.0 Check

- Start and stop the metronome.
- Change BPM with the ±1 and ±10 buttons, input, slider, and tap tempo. Check that the number and slider stay in sync at the 30 and 320 BPM limits.
- Try click modes: quarter notes, 2 & 4, beat 1 only, and barline only.
- Set Click to Off and confirm cue intervals still sound.
- Switch form presets and confirm the grid, section, bar, beat, chorus, and next-section readouts update.
- Select Autumn Leaves from Song presets and confirm the key shows G minor.
- Select Custom and confirm the Song editor opens, then clear it and confirm the dropdown returns to No song with no bass notes assigned.
- Confirm the form changes to Autumn Leaves and the grid fills with bass-root labels.
- Select Sunny Side of the Street and confirm the key shows C major.
- Select Blue Bossa and confirm the key shows C minor.
- Confirm each song preset resets Bass octave to its recommended value.
- Confirm Bass editor turns on automatically after choosing Autumn Leaves.
- Test cue intervals, especially every 8 bars and every chorus.
- Try count-in off, 1 bar, and 2 bars.
- Turn Bass editor on and check that bass enters after the count-in.
- Confirm Whole notes is the default Bass style.
- Compare Bass style options: whole notes, walking bass, and jazz quarter pulse.
- Try Bass octave at normal, -1 octave, and +1 octave.
- Adjust Bass volume so it sits under the click.
- Try 12-bar Blues and confirm the bass roots move through C / F / G.
- Try 32-bar AABA and confirm the bridge section changes bass root.
- With Bass editor on, click a bar and assign a custom whole-bar root.
- Enable Split half bar and assign a second root.
- Confirm edited bars show labels like C or C/F in the grid.
- Clear a custom bar root and confirm that bar no longer triggers bass audio.
- Try Trade 4s and Trade 8s with Trading bass set to Full form and confirm the bass continues during the You bars.
- Change Trading bass to Band only and confirm the bass mutes during the You bars.
- Switch between 32-bar, 16-bar, 12-bar, and 8-bar forms and confirm the Trading mode options update for the form. Only Trade 4s and Trade 8s change audio behavior in this version.
- Loop a section and confirm the highlighted bar stays inside that section.
- Enable Phrase map, set Start bar 2, Start beat 3, Length 5, then press Set.
- Confirm bar 2 shows a half-bar phrase fill and bar 3 shows a three-beat fill.
- Start playback and confirm phrase cue-in and cue-out sounds trigger at the mapped range boundaries.
- Reload and confirm the last BPM, song, loop, mixer, bass, phrase-map, and trading settings return.
- In Song editor, save a named song, change settings, reload it, and confirm its state returns.
- Choose Custom form, enter `A:8, B:4, C:8` in Song editor, select Use now, and confirm 20 bars appear.
- Confirm editing a locally saved song changes Save song to Update song and enables Delete.
- Add, edit, and delete one phrase-map range.
- Confirm 12-bar forms offer Trade 2s and 32-bar forms offer Trade Sections.
- Enter Solo View and confirm the setup panels hide while the form remains visible.
- On iPad, confirm the screen stays awake while playback is running.
- Install to the Home Screen, load once online, then reopen without a connection.
- Run `/Users/mayan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tests/core.test.js`.

## Version Notes

### v2.0: Practice Tool Upgrade

Built:

- Reworked the visual hierarchy around the form grid and active practice state.
- Added responsive tablet/mobile layouts with 44px-or-larger bar targets.
- Completed the form-aware trading choices and Band/You form overlays.
- Added automatic restore, a unified Song editor workflow, and editable phrase ranges.
- Preserved `.rollback-v2.0-before-song-editor` as the rollback point before local songs replaced named setups.
- Added mixer controls, output limiting, Solo View, wake lock, and offline installation support.
- Extracted pure form/trading logic into `core.js` with automated tests.
- Added stale visual-callback protection and an audio-permission fallback.
- Preserved `.rollback-v1.8-before-full-upgrade` as the pre-v2.0 rollback snapshot.

### v1.8: Phrase Map

Built:

- Added the first Phrase map layer for full and partial-bar visual ranges.
- Added optional cue-in and cue-out sounds for mapped phrase ranges.
- Kept the previous v1.7 layout as the rollback point before this feature.

### v1.7: Trading Bass

Built:

- Added a Trading bass control to the Trading mode panel.
- Split click/cue muting from bass muting during trading sections.
- Let bass continue across the full form during Trade 4s or Trade 8s when Trading bass is set to Full form.
- Kept Band only available for the previous support-mute behavior.
- Moved Section loop into its own panel outside Trading mode.

### v1.6.1: Trading Panel Cleanup

Changed:

- Renamed Practice mode to Trading mode.
- Removed Goal deck and Goal readout.
- Removed Chorus goals mode.

### v1.6: Practice Modes and Loops

Built:

- Practice mode selector with Normal, Trade 4s, Trade 8s, and Chorus goals.
- Chorus goal prompt decks for phrasing, vocabulary, and time feel.
- Section loop selector generated from the current form.
- Trading modes mute support sounds during You blocks while the form keeps moving.

### v1.5.9: Preset Bass Octave

Built:

- Song presets can define `bassOctave`.
- Applying a song preset updates the Bass octave control.
- The Bass octave control remains editable after preset selection.

### v1.5.8: Whole Notes Keyboard Bass

Built:

- Whole notes now use the keyboard bass sound.
- Removed the separate Keyboard whole notes option.
- Bass volume defaults higher.
- Added Bass octave control beside volume.

### v1.5.7: Keyboard Whole Notes

Built:

- Keyboard whole-note bass style.
- Sustained sine/triangle voice with a short keyboard-style attack.
- Uses the same whole-bar and split-bar timing as Whole notes.

### v1.5.6: Blue Bossa Preset

Built:

- Blue Bossa song preset in C minor.
- 16-bar A/B form for Blue Bossa.
- Preset fills all 16 bass-root labels.

### v1.5.5: Sunny Side and Style Cleanup

Built:

- Sunny Side of the Street preset in C major.
- Whole notes restored as the default bass style.
- Removed Rock eighths.
- Walking bass and Jazz quarter pulse have slightly longer sustain.

### v1.5.4: Sustained Whole Notes

Built:

- Dedicated sustained bass voice for Whole notes.
- Whole-note bass now holds through most of the bar.
- Walking bass keeps the shorter sampled articulation.

### v1.5.3: Walking Bass Lite

Built:

- Walking bass style as the default bass style.
- Quarter-note line using root, inner motion, fifth, and chromatic approach to the next assigned bar root.
- Simple velocity shaping so beat 1 speaks more strongly.

### v1.5.2: Lightweight Sampled Bass

Built:

- Runtime-generated plucked bass sample buffers for each root.
- Sample playback path before the synth fallback.
- Reused sample buffers so repeated notes stay lightweight.

### v1.5.1: Better Bass Tone

Built:

- Two-oscillator bass voice with a round fundamental and subtle harmonic bite.
- Moving low-pass filter and faster pluck envelope.
- Short filtered transient for a more fingered attack.
- Song presets now auto-enable Bass editor.

### v1.5: Song Preset Layer

Built:

- Song preset panel above Bass editor.
- Autumn Leaves preset in G minor.
- Preset application fills the 32-bar form and explicit bass-root labels.

### v1.4.3: Explicit Bar Playback

Changed:

- Bass editor opens the selected-bar panel immediately.
- Added a Set button so default-looking roots, such as C on bar 1, can be explicitly assigned.
- Bass notes only play on bars with explicit saved roots.

### v1.4.2: Bar-Driven Bass Roots

Changed:

- Removed Bass roots and Single root controls.
- Whole notes is now the default bass style.

### v1.4.1: Bass Editor Bug Fixes

Fixed:

- Bar 1 now shows a bass root label when its editable value matches the default form root.
- Split bars now trigger a second-half bass note in ballad style instead of sustaining only the first root.

### v1.4: Bass Editor Cleanup

The bass controls now sit under the form editor, and Bass editor replaces the separate Bass on/off checkbox.

Built:

- Bass editor toggle as the single switch for bass playback and bar-root editing.
- Bass style and volume hidden inside the Bass editor.
- Bass editor controls stay hidden until the editor is enabled.

### v1.3: Bar Root Editor

The first lightweight sequencer editing milestone is complete.

Built:

- Bass editor toggle.
- Click-to-select bars in the form grid.
- Whole-bar root assignment.
- Optional split half-bar roots.
- Clear button for returning a bar to the default bass root behavior.
- Custom root labels on edited bars.

### v1.2: Form-Aware Bass Roots

Phase 2 bass is complete.

Built:

- Form-aware bass root fallback.
- Preset-aware section root maps.
- Current bass root readout beside the phrase readout.
- Simple root movement for blues, AABA, ABAC, rhythm changes, 16-bar tune, and modal/vamp forms.

### v1.1: Bass Pulse Layer

Phase 1 bass is complete.

Built:

- Bass on/off toggle.
- Bass volume control.
- Root note selector, default C.
- Style selector with jazz quarter pulse, rock eighths, and whole notes.
- Basic synthesized bass sound locked to the existing metronome scheduler.

### v1.0: Form-Aware Metronome

The first milestone established the core practice tool: transport, tempo, click modes, count-in, cue intervals, top-of-chorus bell, form presets, and the live jazz form grid.

## Bassline Development Cycle

The bassline should be added as a practice layer, not as a full backing-track engine. Each phase should be small enough to test by playing along for a few minutes.

### Phase 1: Bass Pulse Layer

Goal: add a simple, reliable bass pulse that locks to the existing metronome scheduler.

Status: complete in v1.1.

Build:

- Bass on/off toggle.
- Bass volume control.
- Root note selector, default C.
- Style selector with three simple patterns: jazz quarter notes, rock eighth notes, and whole notes.
- Basic synthesized bass sound.

Test:

- Start/stop keeps bass and click aligned.
- BPM changes do not drift.
- Bass volume can sit under the click.
- Jazz quarter pulse and whole-note patterns feel clearly different.

Done when:

- You can practice a full 32-bar AABA form with click cues and a stable bass pulse.

### Phase 2: Form-Aware Bass Roots

Goal: make the bassline reflect the form without requiring full chord charts yet.

Status: complete in v1.2.

Build:

- Section root mapping, such as A = C and B = F.
- Preset-aware roots for blues and modal/vamp forms.
- Optional fifth movement for simple bass motion.
- Visual root label per current section.

Test:

- Roots change at the right section boundaries.
- 12-bar blues feels like I / IV / V rather than one static note.
- AABA and ABAC forms make the bridge feel different.

Done when:

- The bassline helps you hear the form, not just the tempo.

### Phase 2.5: Bar Root Editor

Goal: allow lightweight root sequencing before full chord-symbol entry.

Status: complete in v1.3.

Build:

- Click a bar in edit mode.
- Assign one root for the whole bar.
- Optionally split the bar into first-half and second-half roots.
- Show custom roots directly on edited bars.

Test:

- Custom roots override the form root map.
- Split roots change halfway through a bar.
- Clear restores the default root behavior.

### Phase 3: Style Expansion and Practice Control

Goal: add musical variety while keeping the controls clear.

Build:

- Add funk and Latin-style patterns.
- Add simple/busy variation control.
- Add bass mute option for gap-style practice.
- Save bass settings inside practice presets.

Test:

- Each style has a recognizable rhythmic identity.
- Muting the bass helps independence practice without breaking the form display.
- Saved presets recall click, cue, form, and bass settings together.

Done when:

- FormClick can switch between jazz, rock, funk, Latin, and ballad practice feels without becoming cluttered.

## Future Iterations

1. Add local saved presets.
2. Add a custom form builder.
3. Add gap-click and random mute modes.
4. Add fullscreen solo mode.
