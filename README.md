# Live Radio Dial

A live radio player laid out as an electronic programming guide: stations down the vertical axis, the clock across the horizontal axis. Built to test whether seeing the whole dial at once gets radio listeners to explore beyond their one usual station.

Originally prototyped in Claude Design; extracted here so it can be developed in Claude Code and hosted for research.

## Running it

Any static server works. There is no build step.

```
python3 -m http.server 8788
```

Then open http://127.0.0.1:8788/index.html

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

### Still outstanding

Two blockers remain, and both need a decision before they can be built:

1. **Lineup is not iHeart.** Thirteen public radio stations (KEXP, WFUV, WWOZ, WNYC, KQED and similar), spanning alternative, indie, folk, americana, jazz and news. No Top 40, country, hip hop or mainstream pop. Blocked on the national-mix versus single-market decision.
2. **Schedules are randomly generated per page load.** `generateSchedule` uses `Math.random()` for durations and hosts, so no two participants see the same grid and neither does one participant across a reload. Measured across six loads, a single station's schedule varied between 8 and 12 blocks with different boundaries every time.

   A second bug rides along with it: show titles are drawn from a per-genre template list by array index rather than by clock, so the names desync from the time they sit in. At the pinned 9:20am, KEXP runs "Alternative Hour", then "Afternoon Alt", "Drive Time Alt", and "Evening Alt" by early afternoon. Replacing generation with a fixed hand-authored dataset fixes both at once.

### Fixed

- Host surfaced in the cell subtitle. It is the only per-cell value that varies down a row, so it is what makes the time axis worth reading. The station tagline that used to sit there repeated identically in every cell of a row, and the station is already identified by the pinned logo column.

## Research

The study plan that drives the backlog above lives outside this repo, at `~/.claude/plans/i-need-you-to-serialized-hummingbird.md`.
