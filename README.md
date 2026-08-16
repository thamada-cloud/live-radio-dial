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

Known gaps, in priority order. The first two block the planned study:

1. **Lineup is not iHeart.** Thirteen public radio stations (KEXP, WFUV, WWOZ, WNYC, KQED and similar), spanning alternative, indie, folk, americana, jazz and news. No Top 40, country, hip hop or mainstream pop.
2. **Schedules are randomly generated per page load.** `generateSchedule` uses `Math.random()` for durations and hosts, so every visitor sees a different grid. Two knock-on effects: show titles cycle through a genre template list by index rather than by clock, so a station can show "Late Night Rock" at 9am; and the generated host names are never displayed, because the cell subtitle renders station name and description instead.
3. **The grid only renders from the current hour to 11pm.** A 10am visitor sees thirteen columns, a 9pm visitor sees two.
4. **Ads fire regardless of the `showAd` prop.** `setupAds` starts its cycle 30 seconds after load either way: a 300x250 appears, rotates every 10 seconds, hides after 30, returns after 120.
5. **Go to Station calls `window.open`** on the station homepage, navigating the user out of the prototype.

## Research

The study plan that drives the backlog above lives outside this repo, at `~/.claude/plans/i-need-you-to-serialized-hummingbird.md`.
