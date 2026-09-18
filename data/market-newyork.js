/*
 * Full New York market lineup (iHeart market 159).
 * ===============================================
 *
 * Every live station the iHeartRadio app carries in New York that has a
 * playable stream: 60 of the 62 the API returns. Hot 97 and 107.5 WBLS are the
 * two omissions, because the API exposes no stream for them and a row that
 * cannot play is a dead end in a task.
 *
 * Pulled from iHeart's own API, the same endpoint the iOS app uses:
 *   https://us.api.iheart.com/api/v2/content/liveStations?limit=200&marketId=159
 *
 * Fields are the API's, not invented: name, freq/band (combined into `dial`),
 * callLetters, the first genre, description, logo and stream URL. Logos are
 * downloaded into assets/market and downscaled to 496px, which is 2x the
 * largest size the UI renders them at.
 *
 * These stations carry NO schedule. data/stations.js holds hand-authored
 * schedules for twelve of them; everything else gets a deterministic schedule
 * from data/schedule.js. See that file for why deterministic matters.
 */

window.LRD_MARKET = {
  id: 159,
  city: 'New York',
  state: 'NY',
  label: 'New York, NY',
  stations: [
    {
      "id": "s1477",
      "apiId": 1477,
      "name": "106.7 Lite FM",
      "dial": "106.7 FM",
      "callLetters": "WLTW-FM",
      "genre": "Mix",
      "description": "New York's Best Variety",
      "logo": "assets/market/1477.png",
      "stream": "https://stream.revma.ihrhls.com/zc1477"
    },
    {
      "id": "s1469",
      "apiId": 1469,
      "name": "Z100",
      "dial": "100.3 FM",
      "callLetters": "WHTZ-FM",
      "genre": "Top 40 & Pop",
      "description": "New York's #1 Hit Music Station",
      "logo": "assets/market/1469.png",
      "stream": "https://stream.revma.ihrhls.com/zc1469"
    },
    {
      "id": "s1473",
      "apiId": 1473,
      "name": "103.5 KTU",
      "dial": "103.5 FM",
      "callLetters": "WKTU-FM",
      "genre": "Top 40 & Pop",
      "description": "The Beat of New York",
      "logo": "assets/market/1473.png",
      "stream": "https://stream.revma.ihrhls.com/zc1473"
    },
    {
      "id": "s1465",
      "apiId": 1465,
      "name": "Q104.3",
      "dial": "104.3 FM",
      "callLetters": "WAXQ-FM",
      "genre": "Classic Rock",
      "description": "New York's Rock",
      "logo": "assets/market/1465.png",
      "stream": "https://stream.revma.ihrhls.com/zc1465"
    },
    {
      "id": "s1481",
      "apiId": 1481,
      "name": "Power 105.1",
      "dial": "105.1 FM",
      "callLetters": "WWPR-FM",
      "genre": "Hip Hop and R&B",
      "description": "New York's Hip Hop and R&B",
      "logo": "assets/market/1481.png",
      "stream": "https://stream.revma.ihrhls.com/zc1481"
    },
    {
      "id": "s5874",
      "apiId": 5874,
      "name": "710 WOR",
      "dial": "710 AM",
      "callLetters": "WOR-AM",
      "genre": "News & Talk",
      "description": "The Voice of New York",
      "logo": "assets/market/5874.png",
      "stream": "https://stream.revma.ihrhls.com/zc5874"
    },
    {
      "id": "s10983",
      "apiId": 10983,
      "name": "WCBS-FM",
      "dial": "101.1 FM",
      "callLetters": "WCBS-FM",
      "genre": "Oldies",
      "description": "New York's Greatest Hits!",
      "logo": "assets/market/10983.png",
      "stream": "https://live.amperwave.net/direct/audacy-wcbsfmaac-imc"
    },
    {
      "id": "s10984",
      "apiId": 10984,
      "name": "NEW 102.7",
      "dial": "102.7 FM",
      "callLetters": "WNEW-FM",
      "genre": "Top 40 & Pop",
      "description": "New York's Upbeat Variety",
      "logo": "assets/market/10984.png",
      "stream": "https://live.amperwave.net/direct/audacy-wnewfmaac-imc"
    },
    {
      "id": "s10955",
      "apiId": 10955,
      "name": "1010 WINS",
      "dial": "1010 AM",
      "callLetters": "WINS-AM",
      "genre": "News & Talk",
      "description": "All News 92.3 FM",
      "logo": "assets/market/10955.png",
      "stream": "https://live.amperwave.net/direct/audacy-winsamaac-imc"
    },
    {
      "id": "s10930",
      "apiId": 10930,
      "name": "WFAN Sports Radio New York",
      "dial": "660 AM",
      "callLetters": "WFAN-AM",
      "genre": "Sports",
      "description": "The Home to Talk New York Sports.",
      "logo": "assets/market/10930.png",
      "stream": "https://live.amperwave.net/direct/audacy-wfanamaac-imc"
    },
    {
      "id": "s5349",
      "apiId": 5349,
      "name": "77 WABC",
      "dial": "770 AM",
      "callLetters": "WABC-AM",
      "genre": "News & Talk",
      "description": "New York's News, Talk & Music Radio",
      "logo": "assets/market/5349.png",
      "stream": "https://playerservices.streamtheworld.com/api/livestream-redirect/WABCAMAAC.aac"
    },
    {
      "id": "s10941",
      "apiId": 10941,
      "name": "94.7 The Block",
      "dial": "94.7 FM",
      "callLetters": "WXBK-FM",
      "genre": "Hip Hop and R&B",
      "description": "New York's #1 For Throwbacks",
      "logo": "assets/market/10941.png",
      "stream": "https://live.amperwave.net/direct/audacy-wxbkfmaac-imc"
    },
    {
      "id": "s10978",
      "apiId": 10978,
      "name": "New York’s Country 94.7",
      "dial": "94.7 HD2",
      "callLetters": "WXBK-HD2",
      "genre": "Country",
      "description": "Today's New Country",
      "logo": "assets/market/10978.png",
      "stream": "https://live.amperwave.net/direct/audacy-wxbkhd2aac-imc"
    },
    {
      "id": "s10952",
      "apiId": 10952,
      "name": "ALT 92.3",
      "dial": "92.3 HD2",
      "callLetters": "WINS-HD2",
      "genre": "Alternative",
      "description": "New York’s NEW Alternative",
      "logo": "assets/market/10952.png",
      "stream": "https://live.amperwave.net/direct/audacy-winshd2aac-imc"
    },
    {
      "id": "s10031",
      "apiId": 10031,
      "name": "Mega 97.9",
      "dial": "97.9 FM",
      "callLetters": "WSKQ-FM",
      "genre": "Spanish",
      "description": "La Mega se Pega de New York",
      "logo": "assets/market/10031.png",
      "stream": "https://liveaudio.lamusica.com/NY_WSKQ_icy?aw_0_1st.playerId=lamusica.iheart"
    },
    {
      "id": "s5173",
      "apiId": 5173,
      "name": "La X96.3 FM",
      "dial": "96.3 FM",
      "callLetters": "WXNY-FM",
      "genre": "Spanish",
      "description": "El Ritmo de New York",
      "logo": "assets/market/5173.png",
      "stream": "https://tu.streamguys1.com/wxnyfm-icy?key=553805653f0a519930eabc643243f71416f03a8431bb326debd6af99ef9345ed&aw_0_1st.playerId=iheart"
    },
    {
      "id": "s10032",
      "apiId": 10032,
      "name": "Amor 93.1",
      "dial": "93.1 FM",
      "callLetters": "WPAT-FM",
      "genre": "Spanish",
      "description": "El Ritmo Latino de New York",
      "logo": "assets/market/10032.png",
      "stream": "https://liveaudio.lamusica.com/NY_WPAT_icy?aw_0_1st.playerId=lamusica.iheart"
    },
    {
      "id": "s5068",
      "apiId": 5068,
      "name": "93.9 WNYC",
      "dial": "93.9 FM",
      "callLetters": "WNYC-FM",
      "genre": "Public Radio",
      "description": "Public Radio from New York to the World",
      "logo": "assets/market/5068.png",
      "stream": "https://iheart.wnyc.org/wnycfm-iheart.aac"
    },
    {
      "id": "s5611",
      "apiId": 5611,
      "name": "105.9 WQXR",
      "dial": "105.9 FM",
      "callLetters": "WQXR-FM",
      "genre": "Classical",
      "description": "New York's Classical Music Station",
      "logo": "assets/market/5611.png",
      "stream": "https://iheart.wnyc.org/wqxr-iheart.aac"
    },
    {
      "id": "s6430",
      "apiId": 6430,
      "name": "90.7 WFUV",
      "dial": "90.7 FM",
      "callLetters": "WFUV-FM",
      "genre": "Public Radio",
      "description": "Fordham University's Music Discovery",
      "logo": "assets/market/6430.png",
      "stream": "https://onair.wfuv.org/onair-aacplus"
    },
    {
      "id": "s11180",
      "apiId": 11180,
      "name": "New York Traffic",
      "dial": "Digital",
      "callLetters": "TRFNYC-FL",
      "genre": "News & Talk",
      "description": "New York Traffic Updates",
      "logo": "assets/market/11180.png",
      "stream": "https://stream.revma.ihrhls.com/zc11180"
    },
    {
      "id": "s8772",
      "apiId": 8772,
      "name": "BIN 1600",
      "dial": "1600 AM",
      "callLetters": "WWRL-AM",
      "genre": "News & Talk",
      "description": "New York's Black Information Network",
      "logo": "assets/market/8772.png",
      "stream": "https://stream.revma.ihrhls.com/zc8772"
    },
    {
      "id": "s6286",
      "apiId": 6286,
      "name": "Bloomberg 1130",
      "dial": "1130 AM",
      "callLetters": "WBBR-AM",
      "genre": "News & Talk",
      "description": "New York's Business & Financial Leader",
      "logo": "assets/market/6286.png",
      "stream": "https://stream.revma.ihrhls.com/zc6286"
    },
    {
      "id": "s5172",
      "apiId": 5172,
      "name": "WADO 1280 AM",
      "dial": "1280 AM",
      "callLetters": "WADO-AM",
      "genre": "Spanish",
      "description": "Mas de 50 Aus en New York",
      "logo": "assets/market/5172.png",
      "stream": "https://tu.streamguys1.com/wadoam-icy?key=553805653f0a519930eabc643243f71416f03a8431bb326debd6af99ef9345ed&aw_0_1st.playerId=iheart"
    },
    {
      "id": "s5999",
      "apiId": 5999,
      "name": "AM 970 WNYM The Answer",
      "dial": "970 AM",
      "callLetters": "WNYM-AM",
      "genre": "News & Talk",
      "description": "Conservative Talk for New York",
      "logo": "assets/market/5999.png",
      "stream": "https://playerservices.streamtheworld.com/api/livestream-redirect/WNYMAMAAC.aac"
    },
    {
      "id": "s5998",
      "apiId": 5998,
      "name": "AM 570 WMCA",
      "dial": "570 AM",
      "callLetters": "WMCA-AM",
      "genre": "Christian & Gospel",
      "description": "The Mission New York",
      "logo": "assets/market/5998.png",
      "stream": "https://playerservices.streamtheworld.com/api/livestream-redirect/WMCAAMAAC.aac"
    },
    {
      "id": "s4242",
      "apiId": 4242,
      "name": "Smooth Jazz",
      "dial": "Digital",
      "callLetters": "IJAZ-FL",
      "genre": "Commercial Free",
      "description": "Smooth Jazz, Commercial-Free",
      "logo": "assets/market/4242.png",
      "stream": "https://stream.revma.ihrhls.com/zc4242"
    },
    {
      "id": "s6377",
      "apiId": 6377,
      "name": "iHeartClassical",
      "dial": "Digital",
      "callLetters": "CLASS-FL",
      "genre": "Classical",
      "description": "Classical Music, Commercial-Free",
      "logo": "assets/market/6377.png",
      "stream": "https://stream.revma.ihrhls.com/zc6377"
    },
    {
      "id": "s10951",
      "apiId": 10951,
      "name": "New York Yankees en Español",
      "dial": "Digital",
      "callLetters": "ESYANKEE-FL",
      "genre": "US Partner Digital",
      "description": "El hogar del béisbol de los Yankees",
      "logo": "assets/market/10951.png",
      "stream": "https://live.amperwave.net/direct/audacy-wfanamyankeesesaac-imc"
    },
    {
      "id": "s10963",
      "apiId": 10963,
      "name": "WFAN2",
      "dial": "101.9 HD2",
      "callLetters": "WFAN-HD2",
      "genre": "US Partner Digital",
      "description": "The Flagship Station for NY Sports",
      "logo": "assets/market/10963.png",
      "stream": "https://live.amperwave.net/direct/audacy-wfanam2aac-imc"
    },
    {
      "id": "s10021",
      "apiId": 10021,
      "name": "iHeartFamily Christian",
      "dial": "Digital",
      "callLetters": "IHFC-FL",
      "genre": "Christian & Gospel",
      "description": "Today's Christian, Commercial-Free",
      "logo": "assets/market/10021.png",
      "stream": "https://stream.revma.ihrhls.com/zc10021"
    },
    {
      "id": "s10958",
      "apiId": 10958,
      "name": "Mets en Español",
      "dial": "Digital",
      "callLetters": "ESMETS-FL",
      "genre": "US Partner Digital",
      "description": "El hogar del béisbol de los Mets",
      "logo": "assets/market/10958.png",
      "stream": "https://live.amperwave.net/direct/audacy-wcbsammetsesaac-imc"
    },
    {
      "id": "s11097",
      "apiId": 11097,
      "name": "Mets Radio",
      "dial": "880 AM",
      "callLetters": "WHSQ-AM",
      "genre": "Sports",
      "description": "Amazin' Mets, Amazin' Radio!",
      "logo": "assets/market/11097.png",
      "stream": "https://live.amperwave.net/direct/audacy-metsradioaac-imc"
    },
    {
      "id": "s4455",
      "apiId": 4455,
      "name": "Big Classic Hits",
      "dial": "Digital",
      "callLetters": "CLHT-FL",
      "genre": "80s & 90s Hits",
      "description": "70s, 80s & 90s Pop Hits",
      "logo": "assets/market/4455.png",
      "stream": "https://stream.revma.ihrhls.com/zc4455"
    },
    {
      "id": "s6495",
      "apiId": 6495,
      "name": "RUSA Russian American Radio",
      "dial": "Digital",
      "callLetters": "DANU-FL",
      "genre": "International",
      "description": "Radio RUSA Made in the USA",
      "logo": "assets/market/6495.png",
      "stream": "https://stream.revma.ihrhls.com/zc6495"
    },
    {
      "id": "s3949",
      "apiId": 3949,
      "name": "PRIDE Radio",
      "dial": "Digital",
      "callLetters": "IPRI-FL",
      "genre": "Dance",
      "description": "Our Culture, Our Music",
      "logo": "assets/market/3949.png",
      "stream": "https://stream.revma.ihrhls.com/zc3949"
    },
    {
      "id": "s4409",
      "apiId": 4409,
      "name": "Today's Mix",
      "dial": "Digital",
      "callLetters": "HACM-FL",
      "genre": "Mix",
      "description": "The 90s to Now",
      "logo": "assets/market/4409.png",
      "stream": "https://stream.revma.ihrhls.com/zc4409"
    },
    {
      "id": "s9254",
      "apiId": 9254,
      "name": "WSJU Radio",
      "dial": "88.5 FM",
      "callLetters": "WSJU-FM",
      "genre": "Public Radio",
      "description": "St. John's University",
      "logo": "assets/market/9254.png",
      "stream": "https://radio.stjohns.edu:8443/wsjuAAC"
    },
    {
      "id": "s6648",
      "apiId": 6648,
      "name": "89.1 WFDU",
      "dial": "89.1 FM",
      "callLetters": "WFDU-FM",
      "genre": "Public Radio",
      "description": "Fairleigh Dickinson University",
      "logo": "assets/market/6648.png",
      "stream": "https://peridot.streamguys1.com:5355/iheart-aac"
    },
    {
      "id": "s5060",
      "apiId": 5060,
      "name": "iHeart80s",
      "dial": "Digital",
      "callLetters": "IEIG-FL",
      "genre": "80s & 90s Hits",
      "description": "80s Pop Hits",
      "logo": "assets/market/5060.png",
      "stream": "https://stream.revma.ihrhls.com/zc5060"
    },
    {
      "id": "s4418",
      "apiId": 4418,
      "name": "iHeartCountry",
      "dial": "Digital",
      "callLetters": "CTYM-FL",
      "genre": "Country",
      "description": "#1 For New Country",
      "logo": "assets/market/4418.png",
      "stream": "https://stream.revma.ihrhls.com/zc4418"
    },
    {
      "id": "s4447",
      "apiId": 4447,
      "name": "ALT Radio",
      "dial": "Digital",
      "callLetters": "ALTR-FL",
      "genre": "Alternative",
      "description": "Alternative Hits",
      "logo": "assets/market/4447.png",
      "stream": "https://stream.revma.ihrhls.com/zc4447"
    },
    {
      "id": "s4717",
      "apiId": 4717,
      "name": "Real Oldies",
      "dial": "Digital",
      "callLetters": "ROLD-FL",
      "genre": "Oldies",
      "description": "60s & 70s Pop Hits",
      "logo": "assets/market/4717.png",
      "stream": "https://stream.revma.ihrhls.com/zc4717"
    },
    {
      "id": "s7905",
      "apiId": 7905,
      "name": "ESPN 880",
      "dial": "1050 AM",
      "callLetters": "WEPN-AM",
      "genre": "Sports",
      "description": "New York's Choice for Sports",
      "logo": "assets/market/7905.png",
      "stream": "https://live.amperwave.net/direct/goodkarma-whsqamaac-ibc"
    },
    {
      "id": "s10130",
      "apiId": 10130,
      "name": "Vida Unida, New York City",
      "dial": "93.5 FM",
      "callLetters": "WNVU-FM",
      "genre": "Spanish",
      "description": "NY, Nueva York - La que te inspira",
      "logo": "assets/market/10130.png",
      "stream": "https://ais-sa8.cdnstream1.com/3345_64.aac"
    },
    {
      "id": "s6043",
      "apiId": 6043,
      "name": "iHeartRadio 24/7 News",
      "dial": "Digital",
      "callLetters": "INWS-FL",
      "genre": "News & Talk",
      "description": "24/7 News Headlines from iHeartRadio",
      "logo": "assets/market/6043.png",
      "stream": "https://stream.revma.ihrhls.com/zc6043"
    },
    {
      "id": "s4732",
      "apiId": 4732,
      "name": "Fox Sports Radio",
      "dial": "Digital",
      "callLetters": "FSR-PR",
      "genre": "Sports",
      "description": "The Nation's Premiere Sports Line-Up",
      "logo": "assets/market/4732.png",
      "stream": "https://stream.revma.ihrhls.com/zc4732"
    },
    {
      "id": "s4443",
      "apiId": 4443,
      "name": "Rock Nation",
      "dial": "Digital",
      "callLetters": "ROCK-FL",
      "genre": "Rock",
      "description": "America's Rock Station",
      "logo": "assets/market/4443.png",
      "stream": "https://stream.revma.ihrhls.com/zc4443"
    },
    {
      "id": "s4433",
      "apiId": 4433,
      "name": "R&B Jams",
      "dial": "Digital",
      "callLetters": "RBAC-FL",
      "genre": "Black History Month",
      "description": "Today's R&B and Throwbacks",
      "logo": "assets/market/4433.png",
      "stream": "https://stream.revma.ihrhls.com/zc4433"
    },
    {
      "id": "s9414",
      "apiId": 9414,
      "name": "Disney Resorts Radio",
      "dial": "Digital",
      "callLetters": "DISRES-FL",
      "genre": "Commercial Free",
      "description": "Disney Classics, Commercial-Free",
      "logo": "assets/market/9414.png",
      "stream": "https://stream.revma.ihrhls.com/zc9414"
    },
    {
      "id": "s6551",
      "apiId": 6551,
      "name": "Kids Club Radio",
      "dial": "Digital",
      "callLetters": "KIDSCLUB-FL",
      "genre": "Commercial Free",
      "description": "Music for Kids, Commercial-Free",
      "logo": "assets/market/6551.png",
      "stream": "https://stream.revma.ihrhls.com/zc6551"
    },
    {
      "id": "s7903",
      "apiId": 7903,
      "name": "ESPN Radio",
      "dial": "Digital",
      "callLetters": "ESPN-FL",
      "genre": "Sports",
      "description": "24/7 Sports Coverage",
      "logo": "assets/market/7903.png",
      "stream": "https://live.amperwave.net/direct/espn-network-48"
    },
    {
      "id": "s4451",
      "apiId": 4451,
      "name": "Rumba",
      "dial": "Digital",
      "callLetters": "SPHC-FL",
      "genre": "Hispanic Heritage Month",
      "description": "#1 Para Hits y Variedad",
      "logo": "assets/market/4451.png",
      "stream": "https://stream.revma.ihrhls.com/zc4451"
    },
    {
      "id": "s6834",
      "apiId": 6834,
      "name": "iHeart90s",
      "dial": "Digital",
      "callLetters": "MY90-FL",
      "genre": "80s & 90s Hits",
      "description": "90s Pop Hits",
      "logo": "assets/market/6834.png",
      "stream": "https://stream.revma.ihrhls.com/zc6834"
    },
    {
      "id": "s7004",
      "apiId": 7004,
      "name": "El Patron",
      "dial": "Digital",
      "callLetters": "SPRM-FL",
      "genre": "Hispanic Heritage Month",
      "description": "Pura Musica Perrona",
      "logo": "assets/market/7004.png",
      "stream": "https://stream.revma.ihrhls.com/zc7004"
    },
    {
      "id": "s6843",
      "apiId": 6843,
      "name": "iHeart70s",
      "dial": "Digital",
      "callLetters": "MY70S-FL",
      "genre": "Decades",
      "description": "70s Pop Hits",
      "logo": "assets/market/6843.png",
      "stream": "https://stream.revma.ihrhls.com/zc6843"
    },
    {
      "id": "s5953",
      "apiId": 5953,
      "name": "Evolution",
      "dial": "Digital",
      "callLetters": "IEDM-FL",
      "genre": "Dance",
      "description": "All Things Dance",
      "logo": "assets/market/5953.png",
      "stream": "https://stream.revma.ihrhls.com/zc5953"
    },
    {
      "id": "s9918",
      "apiId": 9918,
      "name": "iHeartJazz Classics",
      "dial": "Digital",
      "callLetters": "JZCLS-FL",
      "genre": "Commercial Free",
      "description": "Classic Jazz, Commercial-Free",
      "logo": "assets/market/9918.png",
      "stream": "https://stream.revma.ihrhls.com/zc9918"
    },
    {
      "id": "s10733",
      "apiId": 10733,
      "name": "WFMU",
      "dial": "91.1 FM",
      "callLetters": "WFMU-FM",
      "genre": "Alternative",
      "description": "Freeform Radio Station of the Nation",
      "logo": "assets/market/10733.png",
      "stream": "https://stream0.wfmu.org/freeform-high.aac"
    },
    {
      "id": "s8681",
      "apiId": 8681,
      "name": "Yacht Rock Radio",
      "dial": "Digital",
      "callLetters": "YACHT-FL",
      "genre": "Oldies",
      "description": "70s & 80s Smooth Soft Rock",
      "logo": "assets/market/8681.png",
      "stream": "https://stream.revma.ihrhls.com/zc8681"
    }
  ],
};
