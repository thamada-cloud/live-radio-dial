# Live Radio Dial

A live radio player laid out as an electronic programming guide: stations down the vertical axis, the clock across the horizontal axis. Built to test whether seeing the whole dial at once gets radio listeners to explore beyond their one usual station.

Originally prototyped in Claude Design; extracted here so it can be developed in Claude Code and hosted for research.

## Where it runs

**Live:** https://thamada-cloud.github.io/live-radio-dial/

Served from `main` by GitHub Pages, which is why this repo is public: unmoderated participants have to reach the prototype with no login. Pushing to `main` redeploys it.

**Locally.** Any static server works, there is no build step.

```
python3 -m http.server 8788
```

Then open http://127.0.0.1:8788/index.html, or reach it from a phone on the same wifi at `http://<your-lan-ip>:8788/index.html`.

## How it is put together

The Claude Design export was a single 823KB HTML file with everything inlined as base64 in a `__bundler/manifest` script tag. That has been unpacked into real files:

| Path | What it is |
| :-- | :-- |
| `index.html` | The whole app: `x-dc` template markup plus the `DCLogic` component class. This is the file you edit. |
| `vendor/dc-runtime.js` | Claude Design runtime. Interprets `sc-if`, `sc-for`, `{{ }}` bindings and the `DCLogic` class. Do not edit. |
| `vendor/react.js`, `vendor/react-dom.js` | React 18.3.1 UMD builds. The runtime would otherwise fetch these from unpkg. |
| `assets/*.png` | Station logos, favorite icons, ad creative. |

`window.__resources` is declared at the top of `index.html` and maps friendly ids to asset paths. It also maps the two unpkg React URLs to the local vendor copies, which is how the runtime is kept off the network (see `cdnScriptFor` in the runtime).

The app renders with no network access at all.

### Editing notes

The template uses Claude Design's custom elements rather than JSX:

- `<sc-if value="{{ someProp }}">` for conditionals
- `<sc-for list="{{ items }}" as="item">` for loops
- `{{ expr }}` for bindings, resolved against whatever the component's `render()` returns
- `sc-camel-on-click` becomes `onClick`, `sc-camel-view-box` becomes `viewBox`, and so on

Component logic lives in the `class Component extends DCLogic` block inside the `<script type="text/x-dc">` tag near the bottom of `index.html`.

Ignore the `{{ row.logo }}` style 404s in the console on first paint. They are the browser pre-fetching placeholder `src` attributes before the runtime hydrates them.

## Current state, and what it needs before research

The EPG mechanics are real: cell width is proportional to show duration (210px per hour), a red now-line sits at the true current minute, header and body scroll in sync, the station column pins, audio genuinely streams, and favorites persist to `localStorage`.

Three discovery mechanisms coexist on the one screen: scanning the grid, the Previous/Next buttons in the media pill (which cycle stations), and the Filter sheet (Location, Genre, Sort).

### Research build configuration

`Component.RESEARCH` at the top of the component class holds three flags, set for unmoderated research rather than for demoing. Flip them back (`adsEnabled` and `externalLinks` to `true`, `pinnedNow` to `null`) for a stakeholder demo.

| Flag | Set to | Why |
| :-- | :-- | :-- |
| `pinnedNow` | `[9, 20]` | Pins the wall clock to 9:20am. Everything reads it through `now()`. Without it the grid renders only from the real current hour to 11pm, so a 10am participant sees thirteen columns and a 9pm participant sees two, capping the study's primary exploration measure by time of day. |
| `adsEnabled` | `false` | `setupAds` otherwise starts a cycle 30s after load regardless of the `showAd` prop, which is roughly ten interruptions over a 25-minute session. |
| `externalLinks` | `false` | "Go to Station" otherwise `window.open`s the station homepage, stranding a participant on an external site. |

### Data

The lineup is a single market, New York, in `data/stations.js`. Station names, dial positions, call letters, genres, logos and stream URLs all come from iHeart's own live API (`liveStations?marketId=159`), so they are real rather than invented. Twelve of the 62 stations that endpoint returns were selected for format spread, and every stream was verified to return HTTP 200 with an audio content type, so every row actually plays.

Worth knowing about the product: that endpoint shows the iHeartRadio app in New York carries competitors' stations too. WCBS-FM, ALT 92.3, WFAN and Mega 97.9 are Audacy or SBS properties. A guide of "the dial" therefore legitimately includes them, which is why they are in the lineup.

Schedules are hand-authored and fixed, with day-parts that match the clock and block lengths from 1 to 5 hours so the grid's width encoding stays testable. Verified in the browser: cells render at 210, 428, 646, 864 and 1082 px, exactly 210px per hour.

### Measured dimensions

At a 375px-wide mobile viewport, with the clock pinned to 9:20am:

| | |
| :-- | :-- |
| Station rows | 12 |
| Time columns | 14 (10:00 AM to 11:00 PM) |
| Grid width | 4054px against a 359px window, about 11 screen-widths |
| Scroll to reach the 8pm column | ~3700px, on the order of ten swipes |
| Cell widths | 210 / 428 / 646 / 864 / 1082 px, exactly 210px per hour |

The horizontal dimension is the harsher constraint. Twelve rows scroll comfortably; fourteen columns do not. Whether a listener will scroll eleven screen-widths unprompted is the concept's biggest open question, which is why the study's time-axis task asks for a show ten hours out rather than one.

### Still outstanding

- **Show and host names need a polish pass.** Drawn from well-known day-parts, but line-ups shift and the API does not expose schedules. Affects realism, not any measure the study takes.
- **The now-playing marquee.** `shouldMarquee` triggers above 30 characters, which catches 3 of the 65 show titles. Two of those three are morning shows, so at the pinned 9:20am the home station's title (`Elvis Duran and the Morning Show`, 32 chars) scrolls continuously as the participant's first impression. The non-marquee branch already ellipsises with a fade, which reads better. Left as-is because it is a design call, not a defect.

### Fixed

- **Lineup replaced.** Thirteen public radio stations spanning alternative, indie, folk, americana, jazz and news, with no Top 40, country, hip hop or mainstream pop, swapped for the real New York dial. The old lineup could not have satisfied any mainstream-format task, and would have turned the study's head-to-head into a test of an unfamiliar catalog rather than of the layout.
- **Schedules are fixed, not generated.** `generateSchedule` used `Math.random()` for durations and hosts. Measured across six loads, one station's schedule varied between 8 and 12 blocks with different boundaries every time, so no two participants would have seen the same grid. A second bug went with it: titles were drawn from a per-genre list by array index rather than by clock, so a station showed "Evening Alt" at lunchtime.
- **Row order is the dial.** FM ascending by frequency, then AM. The "Default" sort option used to fall through to a name sort, which both overrode the dial order and made "Default" and "A-Z" in the Sort sheet behave identically, so two of the four controls did the same thing.
- **Host surfaced in the cell subtitle.** It is the only per-cell value that varies down a row, so it is what makes the time axis worth reading. The station tagline that used to sit there repeated identically in every cell of a row, and the station is already identified by the pinned logo column.
- **Home station seeded.** The participant starts on Z100, playing and pre-favorited, because Task 5 asks them to return to "the station you usually listen to" and that has nothing to measure unless they arrived with one.
- **Orphaned assets removed.** The thirteen public radio logos went with the old lineup.

## Research

The study plan that drives the backlog above lives outside this repo, at `~/.claude/plans/i-need-you-to-serialized-hummingbird.md`.
