/*
 * Deterministic schedule builder
 * ==============================
 *
 * data/stations.js carries hand-authored schedules for twelve New York
 * stations. The full market is 60. Hand-authoring the other 48 is not
 * realistic, so they get a schedule generated here.
 *
 * WHY THIS IS NOT THE BUG THAT WAS REMOVED EARLIER. The original prototype
 * generated schedules with Math.random() at construction time, so every page
 * load produced a different grid: over six loads one station varied between 8
 * and 12 blocks with different boundaries each time. In an unmoderated study
 * that makes sessions non-comparable. The defect was the randomness, not the
 * fact that the data was synthetic.
 *
 * Everything below is a pure function of the station id:
 *
 *   - Block boundaries come from one of four fixed day-part patterns, chosen by
 *     hashing the id. Same station, same pattern, every load, every participant.
 *   - Titles are indexed by DAY-PART, never by a running counter. The original
 *     walked an array, so a station could show "Evening Alt" at lunchtime.
 *   - Hosts are picked from a fixed list by hash, so they are stable too.
 *
 * Reload the page a hundred times and the grid is byte-identical.
 */

(function () {
  // FNV-1a. Small, stable, and does not vary between browsers the way a
  // home-rolled hash with overflow can.
  function hash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h >>> 0;
  }

  // Day-part patterns, as [start, end] pairs covering 6am to midnight.
  //
  // Every pattern has exactly five blocks, one per day-part, so a title can be
  // chosen by INDEX and two consecutive blocks can never land on the same label.
  // An earlier version derived the day-part from the start hour, which meant a
  // pattern with two blocks before 10am printed "Rock & Roll Mornings" twice in
  // a row. Boundaries still vary between patterns, so block widths differ.
  const PATTERNS = [
    [[6, 10], [10, 14], [14, 19], [19, 22], [22, 24]],
    [[6, 10], [10, 15], [15, 19], [19, 22], [22, 24]],
    [[6, 9],  [9, 13],  [13, 17], [17, 21], [21, 24]],
    [[6, 11], [11, 15], [15, 19], [19, 23], [23, 24]],
  ];

  const PARTS = ['morning', 'midday', 'afternoon', 'evening', 'night'];

  const TITLES = {
    'Top 40 & Pop':   { morning:'The Morning Show', midday:'Middays',            afternoon:'Afternoon Drive',   evening:'Hit Nights',            night:'Late Night Hits' },
    'Hip Hop and R&B':{ morning:'The Morning Hustle',midday:'Middays',           afternoon:'The Drive',         evening:'Nights',                night:'The Late Night Mix' },
    'R&B':            { morning:'Morning Soul',      midday:'Quiet Storm Middays',afternoon:'Afternoon R&B',    evening:'Evening Soul',          night:'The Quiet Storm' },
    'Classic Rock':   { morning:'Rock & Roll Mornings',midday:'Middays',         afternoon:'Afternoon Drive',   evening:'The Rock Block',        night:'Classic Rock Overnight' },
    'Rock':           { morning:'Rock Mornings',     midday:'Middays',           afternoon:'The Drive Home',    evening:'Rock Nights',           night:'Overnight Rock' },
    'Alternative':    { morning:'ALT Mornings',      midday:'The ALT Workday',   afternoon:'ALT Drive',         evening:'ALT Nights',            night:'Late Night ALT' },
    'Country':        { morning:'Country Mornings',  midday:'Middays',           afternoon:'The Country Drive', evening:'Country Nights',        night:'After MidNite' },
    'Oldies':         { morning:'The Greatest Hits Morning Show', midday:'Middays', afternoon:'Afternoon Drive',evening:'Nights',                night:'Overnight Oldies' },
    '80s & 90s Hits': { morning:'Morning Rewind',    midday:'The Workday Rewind',afternoon:'Drive Time Rewind', evening:'The Big Countdown',     night:'After Dark' },
    'Decades':        { morning:'Morning Rewind',    midday:'The Workday Rewind',afternoon:'Drive Time Rewind', evening:'Evening Rewind',        night:'Late Night Rewind' },
    'Mix':            { morning:'Mornings',          midday:'The Workday',       afternoon:'Afternoons',        evening:'Evenings',              night:'Overnight' },
    'Dance':          { morning:'Morning Mix',       midday:'The Workday Mix',   afternoon:'Drive Time Dance Party', evening:'Dance Nights',     night:'After Hours' },
    'Spanish':        { morning:'Mañanas',           midday:'Mediodía',          afternoon:'La Tarde',          evening:'Noches',                night:'Trasnoche' },
    'Hispanic Heritage Month':{ morning:'Mañanas',   midday:'Mediodía',          afternoon:'La Tarde',          evening:'Noches',                night:'Trasnoche' },
    'News & Talk':    { morning:'Morning News',      midday:'Midday Report',     afternoon:'Afternoon Drive',   evening:'Evening Edition',       night:'Overnight News' },
    'Sports':         { morning:'Morning Sports',    midday:'Middays',           afternoon:'Afternoon Drive',   evening:'The Evening Show',      night:'Sports Overnight' },
    'Public Radio':   { morning:'Morning Edition',   midday:'Midday Programming',afternoon:'All Things Considered', evening:'Evening Programming', night:'Overnight Programming' },
    'Classical':      { morning:'Morning Classical', midday:'Midday Masterworks',afternoon:'Afternoon Symphony',evening:'Evening Concert',       night:'Night Music' },
    'Jazz':           { morning:'Morning Jazz',      midday:'Midday Jazz',       afternoon:'Afternoon Jazz',    evening:'Evening Standards',     night:'Late Night Jazz' },
    'Christian & Gospel':{ morning:'Morning Praise', midday:'Midday Worship',    afternoon:'Afternoon Praise',  evening:'Evening Worship',       night:'Overnight Praise' },
    'Kids & Family':  { morning:'Morning Playlist',  midday:'Midday Playlist',   afternoon:'Afternoon Playlist',evening:'Evening Playlist',      night:'Bedtime' },
    'Commercial Free':{ morning:'Morning Mix',       midday:'The Workday',       afternoon:'Afternoon Mix',     evening:'Evening Mix',           night:'Overnight Mix' },
    'iHeartRadio Originals':{ morning:'Morning Mix', midday:'The Workday',       afternoon:'Afternoon Mix',     evening:'Evening Mix',           night:'Overnight Mix' },
    'default':        { morning:'Mornings',          midday:'Middays',           afternoon:'Afternoon Drive',   evening:'Evenings',              night:'Overnight' },
  };

  const HOSTS = [
    'Alex Rivera','Sarah Mitchell','Mike Johnson','Lisa Chen','David Martinez',
    'Emma Rodriguez','Chris Anderson','Maya Patel','Ryan Thompson','Sophie Kim',
    'James Wilson','Olivia Taylor','Marcus Brown','Zoe Davis','Tyler Scott',
    'Hannah Lee','Jordan White','Ava Martin','Noah Garcia','Mia Robinson',
  ];

  window.LRD_buildSchedule = function (station) {
    const h = hash(station.id || station.name || '');
    const pattern = PATTERNS[h % PATTERNS.length];
    const titles = TITLES[station.genre] || TITLES.default;
    return pattern.map(([start, end], i) => ({
      start,
      end,
      title: titles[PARTS[i]],
      // Offset by the block index so one station does not use one host all day,
      // while staying a pure function of the id.
      host: HOSTS[(h + i * 7) % HOSTS.length],
    }));
  };
})();
