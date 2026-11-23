---
name: Lautaro Volcan
description: A DJ's home booth after dark, with oxblood walls, lamp-amber readouts and one red mark that says play.
colors:
  oxblood: "#1C0A0C"
  wine: "#36121A"
  wine-2: "#4A1A22"
  lcd-well: "#120506"
  volcan: "#B23730"
  volcan-hot: "#C9433B"
  amber: "#F0A04B"
  lava: "#7BE0C3"
  text: "#F3DDD4"
  text-soft: "#E6CBC1"
  muted: "#C7A49A"
  line: "rgba(243, 221, 212, .16)"
  sink: "rgba(0, 0, 0, .25)"
  fader-cap: "#E9D6CE"
typography:
  display:
    fontFamily: "Unbounded, Arial Black, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 12.5vw, 12.5rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Unbounded, Arial Black, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Unbounded, Arial Black, system-ui, sans-serif"
    fontSize: "clamp(1rem, 2vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  statement:
    fontFamily: "Helvetica Neue, Helvetica, Heros, Arial, sans-serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  readout:
    fontFamily: "Helvetica Neue, Helvetica, Heros, Arial, sans-serif"
    fontSize: "clamp(1.6rem, 3.6vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  body:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.02em"
rounded:
  hair: "3px"
  screen: "0.7rem"
  well: "0.9rem"
  photo: "1.25rem"
  vdeck: "1.5rem"
  deck: "2rem"
  pill: "999px"
spacing:
  tight: "0.75rem"
  stack: "1.25rem"
  block: "2.5rem"
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(5rem, 12vw, 9rem)"
  wrap: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.volcan}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 1.4rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.oxblood}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0 1.4rem"
    height: "3rem"
  button-ghost-hover:
    backgroundColor: "{colors.text}"
    textColor: "{colors.oxblood}"
  link-chip:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0 1.2rem"
    height: "2.75rem"
  lang-toggle-active:
    backgroundColor: "{colors.text}"
    textColor: "{colors.oxblood}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "2rem"
  transport-play:
    backgroundColor: "{colors.volcan}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    size: "4rem"
  transport-play-hover:
    backgroundColor: "{colors.volcan-hot}"
  transport-secondary:
    backgroundColor: "{colors.sink}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    size: "3rem"
  lcd:
    backgroundColor: "{colors.lcd-well}"
    textColor: "{colors.amber}"
    typography: "{typography.readout}"
    rounded: "{rounded.well}"
    padding: "1rem 1.25rem 1.1rem"
  crate-item:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.title}"
    padding: "1.1rem 0.75rem"
  crate-item-current:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.amber}"
---

# Design System: Lautaro Volcan

## Overview

**Creative North Star: "The Home Booth"**

This is the room in the hero photo after dark: decks within reach, a lava lamp glowing, red and amber light on the walls. The page is that room. Oxblood is the wall with the lights off, amber is the lamp and the LCD, and the single brand red marks the one thing to press. Nothing is lit unless it has a reason to be: a readout, a playing state, the next action.

The system is **warm and restrained**. Everyday chrome is quiet: pill buttons, thin warm hairlines, muted secondary text. Hardware detail is spent in one place, on the players. The music deck (platter, LCD well, waveform, fader) and the two video decks with their mixer are where the interface becomes equipment. Everything else steps back so the photography and the deck carry the identity.

Type does the shouting. A huge, tight, uppercase Unbounded wordmark anchors the hero. A warm humanist grotesk carries the reading, and a Helvetica voice handles readouts and first-person statements. Real photographs of Lautaro in his own light are the only imagery.

Explicitly rejected: the neon club-flyer look (saturated purple/cyan gradients, lasers, glitch type), raw stock SoundCloud/YouTube embeds in place of the custom players, any light theme, and flat SaaS card grids.

**Key Characteristics:**
- Dark-only, warm-tinted palette. No neutral greys, and no pure black except inside the video screen.
- One red for action, amber for light and information, lava green only for "live".
- Unbounded at poster scale for the name and section heads, Hanken Grotesk for reading, Helvetica for readouts and statements.
- Hardware-grade detail on the players only. Everywhere else, pills and hairlines.
- Real photography with an oxblood gradient falling into the page.

## Colors

A low-light palette of reds and browns. Every neutral is tinted toward wine, and three small accents each have one job.

### Primary
- **Volcan Red** (volcan): the brand red, and the color of "act here". Solid primary buttons, the play transport, the header dot, video deck number badges, the current-item rail in the crate, text selection. **Volcan Hot** (volcan-hot) is its hover on circular transport buttons only.

### Secondary
- **Lamp Amber** (amber): light and information. LCD text, the played portion of waveforms, the platter's cue marker, the volume fill, focus rings, the genre list, link hover, the current crate title, and the halo around a playing transport (`rgba(240,160,75,.18)` ring and `.35` glow). It is also the hover fill of the solid button: red ignites to amber.

### Tertiary
- **Lava Glow** (lava): signal only. The playing LED on the deck and the mixer's level meters. It never appears on text, buttons or backgrounds.

### Neutral
- **Oxblood** (oxblood): the page base, the room with the lights off. Also the theme color, the manifest background, and the text color on light pills.
- **Wine** (wine) and **Deep Wine** (wine-2): raised surfaces. Together with `#2A0E13` they form the 160° panel gradient behind every deck. Wine alone fills the current crate row.
- **LCD Well** (lcd-well): recessed wells such as the LCD, the time readout and the video screen bezels. It is darker than the page, so these read as cut into the panel.
- **Warm Bone** (text): primary text, and the fill of active toggles and ghost-button hovers.
- **Soft Bone** (text-soft): long-form paragraphs in About, a step down from Warm Bone.
- **Dusty Rose** (muted): secondary text such as intros, genres, durations, footer and credits.
- **Hairline** (line): every divider and quiet border, at 16% Warm Bone.
- **Sink** (sink): the recessed face of secondary transport controls.
- **Fader Bone** (fader-cap): fader caps, always with a dark center line (`#2A0E13` across 45–55%).

### Named Rules
**The One Red Rule.** Volcan Red marks only the action you're meant to take (play, download, listen) or the identity dot. Never use it for decoration, section backgrounds or large fills.

**The Lamp Rule.** Amber means "this is lit": live information, focus, or the part of the track already played. If nothing is happening, it isn't amber.

**The Lava-Is-Live Rule.** Lava green appears only where a signal is present: the playing LED and the meters. Anything else in green is a bug.

## Typography

**Display Font:** Unbounded (with Arial Black, system-ui)
**Body Font:** Hanken Grotesk (with system-ui, -apple-system, Segoe UI)
**Readout/Statement Font:** Helvetica Neue / Helvetica, with self-hosted TeX Gyre Heros ("Heros") as the fallback

**Character:** Unbounded is wide, round and loud, a poster wordmark. Hanken Grotesk is warm and easy to read, and Helvetica brings the cool precision of a CDJ screen and a printed press sheet. All three are self-hosted.

### Hierarchy
- **Display** (800, clamp(3.2rem, 12.5vw, 12.5rem), 0.86, -0.045em, uppercase): the hero name only, split onto two lines. On narrow phones it drops to clamp(2.4rem, 14vw, 5rem).
- **Headline** (700, clamp(1.75rem, 4vw, 3rem), 1.08, -0.02em, balanced wrap): section titles (Mixes, Videos).
- **Title** (600, clamp(1rem, 2vw, 1.25rem), 1.2): crate item names, video deck titles (1.1rem) and the header mark (0.9rem).
- **Statement** (Helvetica 700, clamp(1.6rem, 3.2vw, 2.6rem), 1.1, -0.025em): first-person headings, such as the About intro. The booking email scales the same voice up until it fills the column on phones and caps at 4.4rem on desktop, at -0.045em.
- **Readout** (Helvetica 700, tabular numerals): LCD time, the video player clock and waveform hover times. Always amber or bone on an LCD well.
- **Body** (400, 1.0625rem, 1.6): running text. Intros cap at 34ch, About copy at 36rem.
- **Label** (600, 0.8rem, 0.02em): the language toggle and small UI labels. Buttons use 600 at 1rem.

### Named Rules
**The Three Voices Rule.** Unbounded names things (the artist, sections, mixes). Hanken reads, and Helvetica measures and speaks in first person. Don't put body copy in Unbounded or headings in Hanken.

**The Tabular Clock Rule.** Every time, duration and counter uses tabular numerals so it doesn't jitter while playing.

## Layout

A single scrolling page: Hero, then Mixes, Videos, About, Booking and Footer. Content sits in a centered wrap (72rem max) with a fluid gutter (clamp(1.25rem, 4vw, 3rem)). Sections breathe on a fluid rhythm (clamp(5rem, 12vw, 9rem)): one section between the media blocks (Mixes to Videos), one and a half between chapters (Videos to About, About to Booking). The hero is full-bleed at 100svh, with the name bottom-left and the role line ("DJ based in Barcelona"), a short lede and two actions bottom-right. While side by side, the name scales down so that column never drops below 16rem. On touch screens (`pointer: coarse`), header links and the language pills grow to 44px targets.

Section heads pair a headline with a muted intro on one baseline row that wraps on narrow screens. The deck is a two-column grid (platter at 14–22rem, then the panel). The videos are three columns: deck, mixer (7.5rem) and deck. About is a 1 : 1.1 split with a sticky 4:5 portrait.

Breakpoints, wider to narrower:
- **900px:** the hero, video decks and About collapse to one column, and the mixer hides.
- **760px:** the deck reorders into one compact column: LCD, waveform, then a small 5.25rem platter spinning beside the transport, so the whole deck and the first crate row fit one phone screen. The hero's "Listen to the mixes" brings the deck into view with focus on play. Crate rows reflow to title/genre over duration, and the volume fader hides because phones use hardware volume.
- **600px:** the header nav keeps only Booking (Contacto in Spanish), so a booker on a phone always has a way to the contact block.
- **520px:** the header keeps only the red dot, and the hero name and email shrink.

## Elevation & Depth

Depth comes from light falling on hardware, not from floating cards. Surfaces sit at three levels: the oxblood room, raised wine panels, and recessed LCD wells darker than the room. Panels get a top-edge highlight and a long, soft drop below. Wells get an inner shadow. Glow is a state, not a resting style.

### Shadow Vocabulary
- **Panel** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 30px 60px -30px rgba(0,0,0,.7)`): the deck, the video decks, the mixer and the video dialog panel.
- **Well** (`box-shadow: inset 0 2px 12px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.05)`): the LCD and time readouts.
- **Bezel** (`box-shadow: 0 0 0 5px #120506, 0 0 0 6px rgba(255,255,255,.06)`): video screens.
- **Live halo** (`box-shadow: 0 0 0 4px rgba(240,160,75,.18), 0 0 24px rgba(240,160,75,.35)`): a play button whose media is playing.
- **Cap** (`box-shadow: 0 2px 6px rgba(0,0,0,.6)`): fader caps.

### Named Rules
**The Glow Means Playing Rule.** Halos, LED glow and meter glow appear only while media plays or loads. At rest, nothing glows.

**The Hardware Budget Rule.** Panel gradients, wells and bezels belong to the players. Content sections such as About and Booking stay flat on oxblood.

## Shapes

Circles and pills for things you press, generous soft corners for equipment, and hairlines for structure. Buttons, toggles, chips and transport controls are fully round (999px or 50%). Equipment corners scale with the object: the deck at 2rem, video decks and the dialog at 1.5rem, the portrait at 1.25rem, the LCD at 0.9rem and video screens at 0.7rem. The platter is a true circle with vinyl grooves and a red label. Fader caps are the one hard-edged form (3px). Lists divide with full-width 1px hairlines rather than boxes.

## Components

### Buttons
Quiet pills, with red reserved for the main action.
- **Shape:** full pill (999px), 3rem minimum height, 0 1.4rem padding, Hanken 600 at 1rem.
- **Primary:** Volcan Red fill and border with Warm Bone text. On hover the fill and border turn amber and the text turns oxblood.
- **Ghost:** transparent with a 1px Warm Bone border. On hover it fills Warm Bone and the text turns oxblood.
- **Link chips** (socials): a 2.75rem pill with a Hairline border, and the border turns amber on hover.
- **Focus:** a 2px amber outline at 3px offset, used site-wide.
- Transitions: background, color and border over 0.2s.

### Booking contact
The email is the payoff of the page: Statement type sized to fill the column, with an underline that draws in on hover. Beside it (below it on phones) sits a Copy email pill, styled like the link chips with a small copy icon. On success it turns amber and reads "Copied" for 2.5s. If the browser blocks the clipboard, it selects the address and says so. A polite status region announces either outcome.

### Language toggle
A pill track (Hairline border, translucent oxblood) holding two 2.4rem pills. The active one fills Warm Bone with oxblood text, and the inactive ones are Dusty Rose until hover.

### Navigation
A fixed header: the red dot and Unbounded wordmark on the left, then Hanken 500 links and the language toggle on the right. It is transparent over the hero. Once scrolled, it turns to `rgba(28,10,12,.82)` with a 10px backdrop blur. Links underline on hover.

### Music Deck (signature)
The one place the interface becomes equipment.
- **Platter:** a vinyl-groove jog wheel with a Volcan Red label showing the mix artwork (or an "LV" fallback), a bone spindle and an amber cue marker. A fixed amber sheen sits on top. It spins at 33⅓ rpm (1.8s per turn) only while playing.
- **Announcements:** a visually hidden status line speaks only changes the visitor caused ("Playing Tech House #1", "… paused", "Loading …"). The ticking clock is never live.
- **LCD:** an LCD Well with a status LED (dark at rest, blinking amber while loading, glowing lava while playing), the state (Dusty Rose at rest, amber while loading or playing), the genre, the mix title in bone, and a tappable elapsed/remaining clock in amber readout type.
- **Waveform:** a canvas slider. The played portion is amber, the rest is bone at 30% (with reflections at 35% and 10%), and a hover line shows a time tooltip.
- **Transport:** 3rem circular secondary buttons and a 4rem Volcan Red play button that gains the live halo while playing. The volume fader has a 4px amber-filled track and a bone cap.
- **Fallback:** if the browser blocks the custom player, the stock SoundCloud widget appears inside the deck with an amber notice. It is never the default.

### Now Playing Bar
A slim floating deck that follows a listener away from the player. It appears only after a mix has started and only while the deck's play button is not fully visible below the fixed header. It stays hidden while the hero's actions are on screen, so it never covers the name. Its readout, like the crate row's, follows the LCD's elapsed/remaining mode. It sits bottom-center in the thumb zone (max 30rem wide, above the safe area) on the panel surface with 1.25rem corners. It holds a 3rem red play/pause with the live halo while playing, a lava LED, the mix title (Unbounded 600), an amber tabular `elapsed / total` readout, and a 2px amber progress line along its top edge. Tapping the title scrolls back to the deck and focuses its play button. It slides up on entry (.35s ease-out), is static under reduced motion, and the footer gains bottom padding while it shows.

### Crate (track list)
Full-width rows between hairlines, laid out as title (Unbounded) / genre (muted) / duration (tabular, right-aligned). Hover tints the row with wine at 70%. The current row fills wine, gets a 3px Volcan Red left rail, and shows its title in amber. It also carries the deck's LED before its title (dark when paused, lava while playing), and once started its duration becomes a tabular `elapsed / total` readout (bone when paused, amber while playing). Hover tints apply only on devices that can hover.

### Video Decks and Mixer (signature)
Two panels showing the YouTube thumbnail inside a bezel, with a red number badge (the title is said once, under the screen) and a waveform silhouette (mirrored on deck 2) in faint bone that turns amber on hover, focus or while live. Under each is a 3.6rem red play button and the title. Between them, a purely decorative mixer: meters (dark at rest, lit only for the deck in focus), channel faders and a crossfader that slides toward whichever deck you hover, focus or play. The video opens in a dialog styled as a panel, with the same transport, waveform scrubber and amber clock. The deck's thumbnail stays on the screen as a poster until YouTube's first frame plays. If a phone blocks playback from our button, after 3.5s our tap layer steps aside and a short note asks the visitor to tap the video itself.

## Do's and Don'ts

### Do:
- **Do** keep every surface on the oxblood/wine family and every neutral warm-tinted.
- **Do** limit Volcan Red to the action, the identity dot and the current-item marker (The One Red Rule).
- **Do** use amber for anything lit or informational, and lava only for live signal.
- **Do** build media into the deck and video-deck language: LCD wells, waveform scrubbers, round transport buttons with the live halo.
- **Do** use only real photographs of Lautaro, fading into oxblood with a bottom-up gradient.
- **Do** keep times in tabular Helvetica readouts.
- **Do** honor `prefers-reduced-motion`: no platter spin, no meter animation, no transitions.
- **Do** keep the 2px amber focus ring visible on every interactive element, including custom ones like the waveform and crate rows.

### Don't:
- **Don't** use the neon club-flyer look: purple/cyan gradients, laser beams, glitch or chrome type.
- **Don't** drop raw SoundCloud or YouTube embeds onto the page in place of the custom players.
- **Don't** introduce a light theme or light sections.
- **Don't** use flat SaaS cards, icon-feature grids or gradient CTA banners.
- **Don't** spread hardware detail (panel gradients, wells, bezels, glow) to content sections. Keep About and Booking flat (The Hardware Budget Rule).
- **Don't** let anything glow at rest (The Glow Means Playing Rule).
- **Don't** set body copy in Unbounded or use more than these three typefaces.
