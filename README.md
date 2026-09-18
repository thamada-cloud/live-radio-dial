# Live Radio Dial

A live radio player laid out as an electronic programming guide: stations down the vertical axis, the clock across the horizontal axis. Built to test whether seeing the whole dial at once gets radio listeners to explore beyond their one usual station.

Originally prototyped in Claude Design; extracted here so it can be developed in Claude Code and hosted for research.

## Where it runs

Two versions, both deployed:

| | Live | Source |
| :-- | :-- | :-- |
| **v1** — two-axis EPG grid | https://thamada-cloud.github.io/live-radio-dial/ | `index.html` |
| **v2** — station list with filter chips | https://thamada-cloud.github.io/live-radio-dial/v2.html | `v2.html` |

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
| `index.html` | v1: `x-dc` template markup plus the `DCLogic` component class. |
| `v2.html` | v2: standalone vanilla HTML/CSS/JS. No React, no runtime. |
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

### Why `.nojekyll` matters

GitHub Pages runs Jekyll over a branch build by default, and Jekyll breaks this project two separate ways:

1. `index.html` is full of `{{ ... }}` bindings, which is also Liquid's tag syntax. Jekyll tries to parse them as template tags and the build fails.
2. Jekyll's default excludes contain `vendor/`, so React and the DC runtime would be dropped from the published site even if the build succeeded, serving a blank page.

The empty `.nojekyll` file at the repo root disables Jekyll and publishes the tree verbatim. Do not delete it.

### Icons

All icons come from the iHeartRadio iOS app's own asset catalog (`iheartradio/Apple`, `Multiplatform/Resources/Assets.xcassets`), which ships them as SVG. They replace the generic Lucide stroke icons the Claude Design export came with, so the prototype now looks like the app participants are being asked to compare it against.

Three things had to be handled when porting them:

- The SVGs carry an inline `style="fill:...;fill:color(display-p3 ...)"` that overrides the `fill` attribute. Both are stripped and replaced with `currentColor` so icons inherit colour on the light header and the dark media pill.
- `talkback`, `playback_play` and `playback_pause` ship as composites: a filled disc with the glyph knocked out. The prototype draws its own red talkback circle and white play button, so only the inner glyph is used, with the viewBox tightened around it.
- viewBoxes are not uniform (14, 16, 20, 24, 25, 32, 36, 44, 46). Each icon keeps its own. `navigation_back` sits small inside a 44x44 box and needed cropping to `14 14 16 16`; `preset_add` fills its 14x14 box edge to edge and needed padding to `-5 -5 24 24`.

Like and dislike previously toggled via `fill="{{ likeFill }}"`. That cannot work with iOS glyphs, whose outline variants are themselves filled shapes rather than strokes, so the template now switches between `thumbs_up` / `thumbs_up_filled` with `sc-if` on the existing `liked` state.

`dial_button_icon` (Go to Station) deliberately keeps its brand red disc and white triangle rather than inheriting `currentColor`, which would flatten it into a solid blob.

**The filter icon is the one exception.** The iOS app has no filter icon in its catalog and uses no filter SF Symbol, so there was nothing to copy. The glyph in the header is drawn to match the set's weight (2px bars, 1px radius, 24x24). Worth knowing that the filter control itself has no counterpart in the shipping app.

## v2 — the list version

Built from Figma: [Live-Radio-Dial-v2, node 314:13377](https://www.figma.com/design/5kls3jYtOTAuoFjtHAW2HS/Live-Radio-Dial-v2?node-id=314-13377). Lives at `v2.html` and shares `data/stations.js` with v1, so the lineup and schedules stay in one place.

**v2 is a different information architecture, not a restyle.** The changes that matter:

| | v1 | v2 |
| :-- | :-- | :-- |
| Layout | Two-axis grid, stations x time | One row per station |
| Time | 14 columns, ~11 screen-widths of horizontal scroll | A time range on each row, no horizontal scroll |
| Filtering | Icon opening a bottom sheet | Scrolling chip row, always visible |
| Now playing | 300x250 slot (ad-shaped) | 248x248 square |
| Transport | Talkback, prev, play, next, more | none: tap a row to play |
| Thumbs | Playlist, like, dislike | Dislike, like (no playlist) |

**The time axis is gone.** Each row shows the show that is on now plus its time range; there is no way to look at what is on later. Since the research plan's hypothesis is about a guide that shows what is coming up, and its time-axis task asks for a show ten hours out, v2 does not answer the same question v1 does. That is worth settling before either goes into a study.

### Implementation notes

Deliberately vanilla. v1 runs on the Claude Design `x-dc` runtime; keeping v2 independent means neither version can break the other, and v2's UI (a list, chips, a control pill) does not need a framework.

Icons in `assets/v2/` are the exported assets from the Figma file, committed rather than hotlinked because Figma's asset URLs expire in about seven days. They already ship in the right colours per context (dark for the light header and rows, white for the dark pill), so they are used as `<img>` with no recolouring.

`RESEARCH` at the top of the script mirrors v1:

| Flag | Set to | Why |
| :-- | :-- | :-- |
| `pinnedNow` | `[9, 20]` | Same pinned clock as v1, so the two are comparable in a study. |
| `showStatusBar` | `true` | The Figma frame includes an iOS status bar. Faithful on desktop, but on a real phone it sits under the device's own status bar and reads as a bug. **Turn this off before fielding on devices.** |

### Stations

v2 loads **every live US station the iHeartRadio app carries**: 2,721 unique stations across 251 markets, in `data/stations-us.js`.

That list is not in GitHub, it comes from the same AMP API the iOS app uses. A market's lineup is not simply its local stations: the API merges in a curated slice of the national digital channels, so New York returns 62 while only 32 stations actually list New York as their market. Each market was therefore fetched on its own endpoint rather than derived from one unfiltered dump.

```
https://us.api.iheart.com/api/v2/content/liveStations?limit=200&marketId=<id>
```

311 rows were dropped because the API exposes no playable stream for them (Hot 97 and 107.5 WBLS in New York among them). A row that cannot play is a dead end in a task, so they are left out rather than shown broken.

The file is 458KB, 140KB gzipped, which Pages serves compressed. Stations are stored as arrays and URLs are prefix-packed, because spelling out `https://playerservices.streamtheworld.com/api/livestream-redirect/` 532 times was most of the file. Both unpack once on load. Logos are hotlinked to iHeart's CDN rather than committed, since 2,721 logos is far too many and v2 already needs the network for audio. **v2 therefore needs a connection; v1 still runs fully offline.**

**Schedules are real.** The show name and time on each row come from iHeart's own RadioEdit GraphQL API, the same `OnAirSchedule` query the iOS app runs:

```
POST https://webapi.radioedit.iheart.com/graphql
query OnAirSchedule($id: String!, $dayOfWeek: SITES_ONAIR_DAY!, $timeZone: String!)
```

`id` is the call letters lowercased (`whtz-fm`). Fetched once for all 2,721 stations and baked into `data/onair.js` (179KB, 26KB gzipped) rather than called live: a study needs every participant to see the same thing, and the browser would otherwise make thousands of requests.

933 stations publish a schedule. That drives the **now-playing block**, which shows the show on air and the station beneath it.

**Rows show the station name and its description**, both straight from the API, the same pairing the production web radio-dial uses. Show and time are not repeated per row: they belong to whatever is playing, not to every station in the list. Nothing in a row is synthetic; the earlier generated schedules are gone, along with `data/schedule.js`.

This is also how the Figma frame was made: the "Crystal Rosas" in it is Z100's real 2pm host, straight out of this API.

### Filter sheets

The Genre and Location chips open a bottom sheet listing every value, following the sheet pattern v1 already uses (grab handle, title and close, options with counts and a checkmark, Apply footer). No sheet is designed in the Figma file for these, so the pattern is carried over rather than invented.

The **Genre** sheet lists every genre in the lineup with a station count, built from the data rather than a hardcoded list.

The **Location** sheet follows the iOS app rather than being a flat city list. `iHeart/SharedUI/Headers/SectionHeaderDropdownPills/LocationSheet.swift` offers three selection *methods*, each a 64px row with a location-services icon that is filled for the active method and unfilled for the others:

1. **Use Current Location** — subtitle shows the resolved location
2. **Use Zip Code** — subtitle shows the entered zip once that is the method
3. **Choose a City** — pushes a city picker

Header title is "Update Location". Row height, insets, icon size and fonts come from `HeaderSheetStyle.swift` (64px rows, 4px insets, 20px icons, 44px header with 24px padding). On iOS the city picker is two wheel pickers, country and city; on the web it is a searchable list, since 251 markets is too many to scroll.

Picking a city switches the whole lineup. `DETECTED_MARKET` stands in for CoreLocation: the prototype cannot detect a real location, so "Use Current Location" always resolves to New York, which is also the market the app opens on. Resolving a ZIP to a market needs a lookup the AMP station endpoints do not expose, so only the detected market's ZIPs are accepted; that needs a real geocode before it is more than a demo.

The zip flow uses `prompt()`, which is the closest web equivalent to iOS's `IHRTextFieldAlert`. It validates five digits and rejects a code with no stations, matching how iOS gates Save on `ZipCodeValidator` and only commits inside the success branch. Worth replacing with an in-sheet field before fielding, since `prompt()` is blocked in some embedded contexts.

### Deliberate deviations from the frame

**Transport arrows are swapped** relative to Figma node 314:13377, which puts the down chevron on the left and the up chevron on the right. The guide is a vertical list, so the left button (previous, moving up the list) points up and the right button (next, moving down) points down. Noted in the source so it does not get "fixed" back.

**The control pill, the bottom fade and the whole top header are removed**, and a bottom tab bar takes their place. Playback is now a row tap.

**A bottom tab bar was added**, which the Figma file does not contain. It comes from the iOS app: `iHeart/AppNavigation/TabBarConfigFiveTabs.json` defines the five tabs and their order (Home, Search, Radio, Podcasts, Playlists), `TabBarViewModel` puts the bar at 49pt, and `IHRAppDelegate` configures `UITabBarAppearance` with an opaque `containerPrimaryInverse` background, `onSurfaceSecondary` for unselected items and `onSurfaceEmphasis` for the selected one. Icons are the real `TabBar.xcassets` SVGs. Radio is the active tab.

Colours resolve in `Multiplatform/DesignTokens/ColorManager.swift`, which holds a light and a dark value per token. In **light** theme `container_primary_inverse` is `trueWhite` (#ffffff) and `on_surface_emphasis` is `red600` (#c6002b), so the bar is white with a red selected tab and `grey500` (#3f4447) unselected. Reading "inverse" as dark gives the dark-theme pairing, which is wrong for this screen.

The tab glyphs are inlined rather than referenced as `<img>`. An SVG loaded through `<img>` cannot inherit the page's `color`, so `currentColor` resolved to black and the icons disappeared into the bar.

### Sticky header

The artwork, metadata, thumbs and filter chips hold position while only the station rows scroll under them.

### Now playing

The hero leads with the **song actually on air**, pulled live from the same live-meta service the iOS app reads:

```
GET https://us.api.iheart.com/api/v3/live-meta/stream/<id>/trackHistory?limit=1
```

It serves `Access-Control-Allow-Origin: *`, so the browser calls it directly. The track title is the headline, the artist and station sit beneath it, and the album art replaces the station logo. The show, time remaining, dial position and genre move to the line below.

Talk, news and sports stations have no track feed and return nothing, which is the expected case rather than a failure: those fall back to the show name and station, with the station logo as artwork. 710 WOR shows "Mark Simone / 710 WOR"; Z100 shows the song.

Two details worth knowing. The API returns album art over `http`, which an `https` page blocks as mixed content, so the URL is upgraded on the way in. And the request is keyed to the station that was selected when it was fired, so stepping quickly between stations cannot land one station's track on another.

`RESEARCH.liveTrackData` turns this off. It is live data, so two people looking at once do not see an identical hero. **Set it to `false` for a study build**, where the hero then falls back to the show and station, both of which are fixed.

### Responsive layout

| Breakpoint | Layout |
| :-- | :-- |
| < 1024px | Phone layout. Compact now-playing block stacked over the list; artwork, metadata, thumbs and chips sticky, rows scrolling under them. |
| ≥ 1024px | The now-playing block becomes a hero: copy set large on the left, 360px artwork on the right. Adds a live badge, time remaining in the show, dial position, genre and the station description, none of which fit on a phone. The station list below is unchanged. |
| ≥ 1280px | The list splits into two columns of rows. |

Time remaining is computed from the real schedule and handles a block that runs past midnight. At the pinned 9:20am with Elvis Duran on 6-10, it reads "40m left".

The tab bar stays the mobile app shell at every width. Whether a desktop build should have a bottom tab bar at all is a separate question; iHeart web uses a left nav.

### Row overflow sheet

The three dots on a row open a bottom sheet with four actions. Structure and toggling behaviour follow `iHeart/SharedUI/Menu/View/OverflowMenu+Radio.swift`: Presets and Library each flip their label *and* icon depending on whether the station is already saved, exactly as the iOS menu does.

| Action | Icon (from `BottomSheet.xcassets`) |
| :-- | :-- |
| Add to Preset / Remove from Presets | `add_to_preset` / `delete_dash_circle` |
| Add to Library / Remove from Library | `add_to` / `remove_from` |
| Go to Station | `dial_button_icon` |
| Share | `share` |

Presets writes through to the same favourites the Presets chip filters on, so saving here changes what that chip shows. Library is its own set, persisted separately.

**Go to Station is not an iOS menu option.** The app has no `goToStation` case (a UI test comment states this outright), but it is in v1's media sheet and was asked for here, so it uses the dial button icon. That icon carries its own brand red rather than being monochrome like the other three, which is the same call made in v1.

Share uses the Web Share sheet where the browser has one and falls back to copying the link. A dismissed share sheet is treated as a cancel, not an error.

### Chips stow on scroll

The filter chips collapse out of the way when you scroll down the list and come back as soon as you scroll up. Only below 1024px, since the wide layout does not pin its header and there is nothing to reclaim. They never stow within 120px of the top, and `prefers-reduced-motion` drops the transition.

Implemented as a plain scroll listener with no `requestAnimationFrame` throttle. An earlier version set a `ticking` flag and cleared it inside rAF; when frames are throttled (backgrounded tab, low power mode, busy renderer) that flag latches true and every later scroll is dropped, leaving the chips stowed while scrolling up. Frames were measured at 1-2 per second during testing. The handler does two `classList` calls, so running it per event costs less than the bookkeeping did.

### Bottom-of-list fade

A gradient above the tab bar is present the whole way down the list and goes only when you actually reach the end. An earlier version suppressed it whenever a partial row was already peeking, on the theory that the peek said "more" by itself; in practice it appeared and vanished as you scrolled, which reads worse than simply always having it.

### Artwork as the play control

Tapping a station's artwork in the list starts it, and tapping it again stops it. While a station is playing, its artwork carries a filled stop control: a brand-red disc with a white square, the same pairing v2's transport button used, derived from the geometry of the iOS `playback_stop` asset. That is also what tells you at a glance which row is live. With a pointer it appears on hover so the control is discoverable; on touch it shows only for the playing station.

A bare white stop glyph was tried first and read as too subtle against busy album art. The filled disc carries itself, so the scrim behind it dropped from 55% to 34% black: it now only has to keep the control legible over pale artwork rather than signal "playing" on its own.

Stopping pauses and resets `currentTime`, so resuming rejoins the live stream rather than replaying buffered audio. Tapping the row body (rather than the artwork) still selects and plays, as before.

Play state repaints only the overlay and the button's label rather than rebuilding all 60 rows, so starting or stopping a station cannot disturb the scroll position.

### Buffering

Connecting to a live stream is not instant, so the artwork shows a spinner from the moment you tap until audio actually starts, then swaps to the stop glyph.

The spinner is set on tap rather than waiting for the audio element's `waiting` event: the browser can take a moment to emit it, and a tap with no feedback reads as a dead control. `waiting` and `stalled` also drive it, so a stream that rebuffers mid-play shows the spinner again. `playing`, `pause` and `error` all clear it.

The glyph is the iOS `loading_circle` arc recoloured white for the dark scrim, with its gradient id renamed so it cannot clash with anything else on the page. Under `prefers-reduced-motion` it slows rather than stopping, since a frozen spinner would read as a hang.

Verified through the full cycle: idle → "Connecting to ALT 92.3" with `aria-busy="true"` and the spinner up → "Stop ALT 92.3" with the stop glyph → back to idle.
