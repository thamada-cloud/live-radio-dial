/*
 * Live Radio Dial — station lineup and schedule
 * ============================================
 *
 * SINGLE MARKET: NEW YORK (iHeart market id 159).
 * Chosen because the hypothesis is about a listener exploring the dial
 * available to them, so a national grab-bag would quietly change the question.
 * New York also matches the market used in the Text-to-Station study, which
 * keeps the two studies comparable.
 *
 * Station names, dial positions, call letters, genres, logos and stream URLs
 * are pulled from iHeart's own live API:
 *
 *   https://us.api.iheart.com/api/v2/content/liveStations?limit=80&marketId=159
 *
 * That endpoint returns 62 stations for New York. The twelve below were
 * selected for format spread. Every stream was verified to return HTTP 200
 * with an audio content type, so every row in the grid actually plays.
 *
 * Note what the API reveals about the product: the iHeartRadio app in New York
 * carries competitors' stations too (WCBS-FM, ALT 92.3, WFAN and Mega 97.9 are
 * Audacy or SBS properties). A guide of "the dial" therefore legitimately
 * includes them, which is why they are here. Hot 97 was excluded despite being
 * a major New York station because the API returns no playable stream for it,
 * and a dead row in the grid would be a task-blocking dead end.
 *
 * Genres are as the API labels them, not as we might describe them. 103.5 KTU
 * comes back "Top 40 & Pop" rather than Dance, and 106.7 Lite FM comes back
 * "Mix". Those are the labels the real app filters on, so they are kept.
 *
 * SCHEDULES ARE HAND-AUTHORED AND FIXED. This replaces the original
 * generateSchedule(), which used Math.random() for durations and hosts and so
 * produced a different grid on every page load. Measured over six loads, one
 * station's schedule varied between 8 and 12 blocks with different boundaries
 * each time, which would have made 30 unmoderated sessions non-comparable.
 *
 * Two rules hold across every schedule below, and both matter to the study:
 *
 *   - Day-parts match the clock. Mornings run in the morning, drive shows at
 *     drive time. The original pulled titles from a per-genre list by array
 *     index, so a station showed "Evening Alt" at lunchtime.
 *   - Block lengths vary from 1 to 5 hours. Cell width encodes duration in the
 *     grid, so a run of uniform blocks would leave that encoding untestable.
 *
 * STILL NEEDS A POLISH PASS BEFORE FIELDING: show and host names are drawn from
 * well-known day-parts but line-ups shift, and the API does not expose
 * schedules. Accuracy here affects realism, not any measure the study takes,
 * so it is a polish item rather than a blocker. Anything uncertain is marked.
 *
 * Hours are 24h integers. `end` is exclusive.
 */

window.LRD_STATIONS = [
  {
    id: 'z100', apiId: 1469, name: 'Z100', dial: '100.3 FM', callLetters: 'WHTZ-FM',
    genre: 'Top 40 & Pop', location: 'New York, NY', logo: 'assets/logos/1469.png',
    description: "New York's #1 Hit Music Station",
    stream: 'https://stream.revma.ihrhls.com/zc1469',
    shows: [
      { start: 6,  end: 10, title: 'Elvis Duran and the Morning Show', host: 'Elvis Duran' },
      { start: 10, end: 14, title: 'On Air with Ryan Seacrest',        host: 'Ryan Seacrest' },
      { start: 14, end: 15, title: 'The Top 5 at 2',                   host: 'Danielle Monaro' },
      { start: 15, end: 19, title: 'Afternoon Drive',                  host: "Mo' Bounce" },
      { start: 19, end: 20, title: 'New Music Hour',                   host: 'Maxwell' },
      { start: 20, end: 24, title: 'Z100 Nights',                      host: 'Maxwell' },
    ],
  },
  {
    id: 'power1051', apiId: 1481, name: 'Power 105.1', dial: '105.1 FM', callLetters: 'WWPR-FM',
    genre: 'Hip Hop and R&B', location: 'New York, NY', logo: 'assets/logos/1481.png',
    description: "New York's Hip Hop and R&B",
    stream: 'https://stream.revma.ihrhls.com/zc1481',
    shows: [
      { start: 6,  end: 10, title: 'The Breakfast Club',  host: 'Charlamagne tha God and DJ Envy' },
      { start: 10, end: 12, title: 'Power Middays',       host: 'Nyla Symone' },
      { start: 12, end: 13, title: 'The Lunch Hour Mix',  host: 'DJ Suss One' },
      { start: 13, end: 16, title: 'Afternoons on Power', host: 'Honey German' },
      { start: 16, end: 19, title: 'The Drive',           host: 'DJ Self' },
      { start: 19, end: 22, title: 'Power Nights',        host: 'Kayla Nicole' },
      { start: 22, end: 24, title: 'The Late Night Mix',  host: 'DJ Camilo' },
    ],
  },
  {
    id: 'q1043', apiId: 1465, name: 'Q104.3', dial: '104.3 FM', callLetters: 'WAXQ-FM',
    genre: 'Classic Rock', location: 'New York, NY', logo: 'assets/logos/1465.png',
    description: "New York's Classic Rock",
    stream: 'https://stream.revma.ihrhls.com/zc1465',
    shows: [
      { start: 6,  end: 10, title: 'Rock & Roll Morning Show', host: 'Jim Kerr' },
      { start: 10, end: 14, title: 'Middays',                  host: 'Ken Dashow' },
      { start: 14, end: 18, title: 'Afternoon Drive',          host: 'Maria Milito' },
      { start: 18, end: 19, title: 'Get The Led Out',          host: 'Carol Miller' },
      { start: 19, end: 22, title: 'The Rock Block',           host: 'Eddie Trunk' },
      { start: 22, end: 24, title: 'Classic Rock Overnight',   host: 'Q104.3' },
    ],
  },
  {
    id: 'lite1067', apiId: 1477, name: '106.7 Lite FM', dial: '106.7 FM', callLetters: 'WLTW-FM',
    genre: 'Mix', location: 'New York, NY', logo: 'assets/logos/1477.png',
    description: "New York's Best Variety",
    stream: 'https://stream.revma.ihrhls.com/zc1477',
    shows: [
      { start: 6,  end: 10, title: 'Mornings with Christine Nagy', host: 'Christine Nagy' },
      { start: 10, end: 15, title: 'The Lite Workday',             host: 'Bill Lee' },
      { start: 15, end: 19, title: 'Afternoons',                   host: 'Helen Little' },
      { start: 19, end: 24, title: 'Delilah',                      host: 'Delilah' },
    ],
  },
  {
    id: 'ktu1035', apiId: 1473, name: '103.5 KTU', dial: '103.5 FM', callLetters: 'WKTU-FM',
    genre: 'Top 40 & Pop', location: 'New York, NY', logo: 'assets/logos/1473.png',
    description: 'The Beat of New York',
    stream: 'https://stream.revma.ihrhls.com/zc1473',
    shows: [
      { start: 6,  end: 10, title: 'Cubby & Carolina in the Morning', host: 'Cubby and Carolina Bermudez' },
      { start: 10, end: 14, title: 'The KTU Workday Mix',             host: 'Jamie Lopez' },
      { start: 14, end: 18, title: 'Drive Time Dance Party',          host: 'Paul Costa' },
      { start: 18, end: 20, title: 'Beatbox Radio',                   host: 'DJ Skribble' },
      { start: 20, end: 24, title: 'KTU Dance Nights',                host: 'DJ Trixx' },
    ],
  },
  {
    id: 'wor710', apiId: 5874, name: '710 WOR', dial: '710 AM', callLetters: 'WOR-AM',
    genre: 'News & Talk', location: 'New York, NY', logo: 'assets/logos/5874.png',
    description: "New York's Talk Radio",
    stream: 'https://stream.revma.ihrhls.com/zc5874',
    shows: [
      { start: 6,  end: 10, title: 'Len Berman and Michael Riedel in the Morning', host: 'Len Berman and Michael Riedel' },
      { start: 10, end: 13, title: 'WOR Midday News',       host: 'WOR Newsroom' },
      { start: 13, end: 15, title: 'The Mark Simone Show',  host: 'Mark Simone' },
      { start: 15, end: 18, title: 'The Sean Hannity Show', host: 'Sean Hannity' },
      { start: 18, end: 21, title: 'The Mark Levin Show',   host: 'Mark Levin' },
      { start: 21, end: 24, title: 'Coast to Coast AM',     host: 'George Noory' },
    ],
  },
  {
    id: 'wcbsfm', apiId: 10983, name: 'WCBS-FM', dial: '101.1 FM', callLetters: 'WCBS-FM',
    genre: 'Oldies', location: 'New York, NY', logo: 'assets/logos/10983.png',
    description: "New York's Greatest Hits",
    stream: 'https://live.amperwave.net/direct/audacy-wcbsfmaac-imc',
    shows: [
      { start: 6,  end: 10, title: 'The Greatest Hits Morning Show', host: 'Scott Shannon' },
      { start: 10, end: 14, title: 'Middays',                        host: 'Broadway Bill Lee' },
      { start: 14, end: 15, title: 'The Lunch Break Countdown',      host: 'Sue ONeal' },
      { start: 15, end: 19, title: 'Afternoon Drive',                host: 'Joe Causi' },
      { start: 19, end: 24, title: 'Nights on 101.1',                host: 'Steve Ardolina' },
    ],
  },
  {
    id: 'alt923', apiId: 10952, name: 'ALT 92.3', dial: '92.3 FM', callLetters: 'WINS-HD2',
    genre: 'Alternative', location: 'New York, NY', logo: 'assets/logos/10952.png',
    description: "New York's Alternative",
    stream: 'https://live.amperwave.net/direct/audacy-winshd2aac-imc',
    shows: [
      { start: 6,  end: 10, title: 'ALT Mornings',      host: 'Kevan Kenney' },
      { start: 10, end: 14, title: 'The ALT Workday',   host: 'Marisa' },
      { start: 14, end: 18, title: 'ALT Drive',         host: 'Nicole Alvarez' },
      { start: 18, end: 20, title: 'New Music Now',     host: 'Matt Pinfield' },
      { start: 20, end: 24, title: 'ALT Nights',        host: 'Sammy' },
    ],
  },
  {
    id: 'country947', apiId: 10978, name: "New York's Country 94.7", dial: '94.7 FM', callLetters: 'WXBK-HD2',
    genre: 'Country', location: 'New York, NY', logo: 'assets/logos/10978.png',
    description: "New York's Country",
    stream: 'https://live.amperwave.net/direct/audacy-wxbkhd2aac-imc',
    shows: [
      { start: 6,  end: 10, title: 'Country Mornings',        host: 'Jesse Addy' },
      { start: 10, end: 14, title: 'Middays',                 host: 'Kelly Ford' },
      { start: 14, end: 19, title: 'The Country Drive',       host: 'Ty Bentli' },
      { start: 19, end: 22, title: 'Nights on 94.7',          host: 'Katie Neal' },
      { start: 22, end: 24, title: 'Late Night Country',      host: 'Jesse Addy' },
    ],
  },
  {
    id: 'wfan660', apiId: 10930, name: 'WFAN Sports Radio', dial: '660 AM', callLetters: 'WFAN-AM',
    genre: 'Sports', location: 'New York, NY', logo: 'assets/logos/10930.png',
    description: 'Sports Radio 66 and 101.9 FM',
    stream: 'https://live.amperwave.net/direct/audacy-wfanamaac-imc',
    shows: [
      { start: 6,  end: 10, title: 'Boomer and Gio',      host: 'Boomer Esiason and Gregg Giannotti' },
      { start: 10, end: 14, title: 'Middays',             host: 'Tiki Barber and Brandon Tierney' },
      { start: 14, end: 18, title: 'Carton and Roberts',  host: 'Craig Carton and Evan Roberts' },
      { start: 18, end: 21, title: 'The Evening Show',    host: 'Sal Licata' },
      { start: 21, end: 24, title: 'FAN Nights',          host: 'Shaun Morash' },
    ],
  },
  {
    id: 'mega979', apiId: 10031, name: 'Mega 97.9', dial: '97.9 FM', callLetters: 'WSKQ-FM',
    genre: 'Spanish', location: 'New York, NY', logo: 'assets/logos/10031.png',
    description: 'La Mega',
    stream: 'https://liveaudio.lamusica.com/NY_WSKQ_icy?aw_0_1st.playerId=lamusica.iheart',
    shows: [
      { start: 6,  end: 10, title: 'El Vacilón de la Mañana', host: 'Ramon Broox' },
      { start: 10, end: 14, title: 'Mediodía con Mega',       host: 'Zuleyka' },
      { start: 14, end: 18, title: 'La Tarde',                host: 'Vaso' },
      { start: 18, end: 21, title: 'Mega Mix',                host: 'DJ Camilo' },
      { start: 21, end: 24, title: 'Noches de Mega',          host: 'Yeidy' },
    ],
  },
  {
    id: 'wnyc939', apiId: 5068, name: '93.9 WNYC', dial: '93.9 FM', callLetters: 'WNYC-FM',
    genre: 'Public Radio', location: 'New York, NY', logo: 'assets/logos/5068.png',
    description: 'New York Public Radio',
    stream: 'https://iheart.wnyc.org/wnycfm-iheart.aac',
    shows: [
      { start: 6,  end: 10, title: 'Morning Edition',   host: 'Michael Hill' },
      { start: 10, end: 12, title: 'The Brian Lehrer Show', host: 'Brian Lehrer' },
      { start: 12, end: 14, title: 'All Of It',         host: 'Alison Stewart' },
      { start: 14, end: 16, title: 'Fresh Air',         host: 'Terry Gross' },
      { start: 16, end: 19, title: 'All Things Considered', host: 'Sean Carlson' },
      { start: 19, end: 24, title: 'Evening Programming',   host: 'WNYC' },
    ],
  },
];

/*
 * The station a participant is treated as already loyal to. Task 5 of the study
 * asks them to get back to their usual station after exploring, so the prototype
 * has to start somewhere and have that station pre-favorited.
 * Z100 is the default: Top 40 is the broadest-appeal format in the lineup, and
 * it matches the Text-to-Station scenario.
 */
window.LRD_HOME_STATION = 'z100';
