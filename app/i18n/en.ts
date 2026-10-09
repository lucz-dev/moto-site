import { COUNTS } from "../lib/catalog";
import { ISLAND } from "../lib/site";
import type { Dictionary } from "./it";

// English texts. Game terms follow src/locales/en.ts of the game (British spelling, as in-game).
const en: Dictionary = {
  meta: {
    title: "Motor District — your island, your rules",
    description: `Open-world driving sandbox, free in your browser: a Mediterranean island to explore by car, by bike and on foot. ${COUNTS.total} vehicles, ${ISLAND.championships} championships, deliveries, police, a workshop and homes to buy.`,
    ogLocale: "en_GB",
  },
  ui: {
    skip: "Skip to content",
    home: "Motor District, back to the home page",
    sections: "Pages",
    menu: "Menu",
    closeMenu: "Close the menu",
    language: "Language",
    languageName: "English",
    play: "Play",
    playFree: "Play for free",
    playItch: "Play on itch.io",
    moreGames: "More games by LuCz",
    discover: "Explore",
    prev: "Previous page",
    next: "Next page",
    release: (date: string) => `Public alpha · updated ${date} · computer, phone and tablet`,
    videoPlay: "Play the video",
    videoPause: "Pause the video",
    footerBy: "A game by",
    footerRest: "Map sources and asset credits are in the game menu.",
    notFoundTitle: "Road closed.",
    notFoundBody: "This page doesn't exist, or it has moved.",
  },
  nav: {
    island: "Island",
    activities: "Activities",
    dealership: "Dealership",
    workshop: "Workshop",
    life: "Life",
    play: "How to play",
  },
  home: {
    eyebrow: "Your island. Your rules.",
    title: ["Get out.", "Drive.", "Explore."],
    lede: "Motor District is an open-world driving sandbox, free in your browser. A Mediterranean island to explore by car, by bike or on foot: the coast, three towns, an airport and the Mugello circuit.",
    secondary: "What's on the island",
    tag: { name: "Nausikaa", caption: "In-game footage · Porto Badisco coast" },
    summary: {
      eyebrow: "On the island",
      title: "There's always something to do.",
      intro: `Races, deliveries, police, ${COUNTS.total} vehicles and a workshop to tune them. Each card opens its own page, with everything that's in the game.`,
    },
    cards: {
      island: {
        title: "The island",
        body: "The coast, three towns, an airport and the Mugello. Pick where to start, then go wherever you like.",
        facts: [`${ISLAND.areaKm2} km²`, `${ISLAND.roadKm} km of roads`, `${ISLAND.places} start points`],
      },
      activities: {
        title: "Activities",
        body: "Championships, races, pizza deliveries, transfers, speed traps, drag and drift zones. And the police, if you run a red light.",
        facts: [`${ISLAND.championships} championships`, `${ISLAND.speedTraps} speed traps`, "Up to 5 stars"],
      },
      dealership: {
        title: "Dealership",
        body: "From city cars to Formula 1, with prices, classes and bars exactly as in the game.",
        facts: [`${COUNTS.cars} cars`, `${COUNTS.bikes} bikes`, "6 categories"],
      },
      workshop: {
        title: "Workshop",
        body: "Nine component kits and four gearboxes. Every part moves the performance index.",
        facts: ["24 slots on cars", "Classes D to X"],
      },
      life: {
        title: "Island life",
        body: "Homes and garages to buy, a character to dress, levels that open new series.",
        facts: [`${ISLAND.properties} properties`, "Up to 40 spaces"],
      },
      play: {
        title: "How to play",
        body: "Keyboard, gamepad or touch. Driving aids your way, multiplayer and offline play.",
        facts: ["Free in your browser", `Up to ${ISLAND.roomPlayers} players`],
      },
    },
  },
  finale: {
    title: "Let's go.",
    lede: "Motor District is free and runs in your browser, on computer and phone. It's an alpha in development: expect frequent updates, and a few bugs. If you find one, leave a comment on itch.io.",
    logoAlt: "Motor District — Your island. Your rules.",
  },
  cta: {
    title: "Ready to go?",
    body: "Free, in your browser, nothing to install.",
  },
  pages: {
    island: {
      meta: {
        title: "The island",
        description: `Eight start points on a ${ISLAND.areaKm2} km² island: Porto Reale, Valdoria, Santa Cesarea, the SP358 coast road, the airport and the Mugello circuit.`,
      },
      hero: {
        eyebrow: "The island",
        title: "Pick where to start.",
        lede: `About ${ISLAND.areaKm2} km² in the sea and ${ISLAND.roadKm} km of roads with traffic, traffic lights, roundabouts and tunnels. Pick a start point in the menu, then go wherever you like: by car, by bike or on foot.`,
        alt: "The island from above: green hills, the coast and the sea",
        tag: { name: "Island", caption: "From above, in game" },
      },
      picker: {
        title: "The eight start points",
        intro: "The same as in the game menu and the pause-menu teleport, with Your home first.",
        label: "Start at",
        loading: "Island",
      },
      places: {
        "porto-reale": {
          name: "Porto Reale",
          start: "Your home",
          alt: "Porto Reale from above: red roofs, pastel buildings and the sea on the horizon",
          body: "The main town, in the south-west. Your first home and garage are here, along with the APEX MOTOR performance dealership, the tuning centre, two pizzerias, the real estate agency and a clothes shop.",
          facts: ["298 buildings", "River and stone bridge", "Free starter home"],
        },
        porto: {
          name: "Porto Reale harbor",
          start: "Porto Reale harbor",
          alt: "The cargo port with its yellow crane, the piers and the turquoise sea; Valdoria's towers behind",
          body: "The cargo terminal: two piers, thirty containers and two cranes. The yard is also a drift zone with a figure-of-eight layout.",
          facts: ["2 piers", "30 containers", "Figure-of-eight drift zone"],
        },
        valdoria: {
          name: "Valdoria",
          start: "Valdoria — Metropolis",
          alt: "Valdoria's skyscrapers from above, with a park and low buildings between the towers",
          body: "The island's metropolis. It has the AUREA AUTOMOBILI luxury dealership, the industrial workshop and a penthouse with a multistorey garage on top of the tallest tower.",
          facts: ["822 buildings", "183 towers", "Up to 60 floors"],
        },
        "porto-badisco": {
          name: "Porto Badisco",
          start: "Porto Badisco",
          alt: "The bay of Porto Badisco, with the coast road running down to the sea",
          body: "A bay at the end of the coast. The time trial to Santa Cesarea starts here: about 5 km of bends on the SP358.",
          facts: ["Coast road start", "About 5 km of bends"],
        },
        "santa-cesarea": {
          name: "Santa Cesarea",
          start: "Santa Cesarea parking",
          alt: "Santa Cesarea above a turquoise sea, with the high coast stretching away behind",
          body: "The seaside town at the far end of the coast road, with Minervino Tower along the way. It has a workshop, a garage, a clothes shop and the Pizzeria della Piazzetta.",
          facts: ["Minervino Tower", "Pizzeria della Piazzetta", "Local workshop"],
        },
        "val-chiaro": {
          name: "Val Chiaro farmstead",
          start: "Val Chiaro farmstead",
          alt: "The Val Chiaro farmstead among fields, with a road curving along the hill",
          body: "The inland: a lake, farmland and three country houses with different gardens. The Val Chiaro sweeper is one of the drift zones.",
          facts: ["Lake and tunnels", "3 country houses"],
        },
        aeroporto: {
          name: "Valchiaro Airport",
          start: "Valchiaro Airport",
          alt: "The airport runway with the control tower and the hangars, below the mountains",
          body: "Two runways, six hangars and a 42-metre control tower. The drag strip is on the runway, timed over a quarter mile, half a mile and a mile.",
          facts: ["3,000 and 2,200 m runways", "Drag strip", "42 m tower"],
        },
        mugello: {
          name: "Mugello Circuit",
          start: "Mugello — pit lane",
          alt: "The Mugello circuit from above: the pit lane, the grandstand and the first corners",
          body: "The real 5.25 km layout, rebuilt on Isola Piana. You get there over a bridge and through a tunnel under the track. Lap it alone or against up to 15 opponents.",
          facts: ["5.25 km", "20 pit garages", "Up to 15 opponents"],
        },
      },
      roads: {
        eyebrow: "Roads",
        title: "The ones to drive at least once.",
        intro: "The network has about 520 sections. Main roads are limited to 110 km/h; in town it drops to 50, on roundabouts to 40.",
        items: [
          { name: "SP358 coast road", body: "The real road from Porto Badisco to Santa Cesarea Terme, rebuilt from real-world data: 5.17 km of bends above the sea, with 18% grades.", meta: "5.17 km · limit 60" },
          { name: "Mugello Circuit", body: "The real layout on Isola Piana, with twenty pit garages and the grandstand. Lap it alone or with the NPC riders and drivers.", meta: "5.25 km" },
          { name: "Pietralba climb", body: "The SP2 climbs from the Val Chiaro lake towards the 64-metre Pietralba waterfall. It's a championship stage.", meta: "Championship stage" },
          { name: "Cliffs road", body: "The road along the cliffs. It runs both ways: westbound and eastbound are two different championship stages.", meta: "Limit 70" },
          { name: "Airport runway", body: "Three thousand metres of tarmac: the timed drag strip, the wheelie straight and a speed trap.", meta: "Drag · ¼ · ½ · 1 mile" },
        ],
      },
    },
    activities: {
      meta: {
        title: "Activities",
        description: `${ISLAND.championships} championships, races at the Mugello and on the coast, pizza deliveries, transfers, ${ISLAND.speedTraps} speed traps, airport drag, drift and wheelie zones, and the police.`,
      },
      hero: {
        eyebrow: "Activities",
        title: "Earn credits. Spend them in the garage.",
        lede: "Every activity pays in credits and experience. You start with 10,000 credits, a city car and a home with two parking spaces in Porto Reale.",
        alt: "Two bikes leaning side by side through a bend on the coast road, next to the stone wall",
        tag: { name: "Coast road", caption: "Bike championship · Santa Cesarea → Porto Badisco" },
      },
      championships: {
        title: "Championships",
        body: `${ISLAND.championships} series, four for cars and four for bikes: Entry, Club, Pro and Expert. Three stages against five rivals and a nemesis, at the Mugello, on the coast, up the Pietralba climb and along the cliffs road.`,
        meta: "Points 10 · 7 · 5 · 3 · 2 · 1 — up to 45,000 cr",
        alt: "Two bikes leaning side by side through a bend on the coast road",
      },
      panel: {
        alt: "The game's Championships panel, with the Entry, Club, Pro and Expert series",
        caption: "The championships panel, in game",
      },
      items: {
        races: { title: "Races and hot laps", body: "Two time trials of about 5 km on the coast and laps of the Mugello, alone or against up to 15 opponents. Every valid lap pays by its time.", meta: "200–2,000 cr per lap" },
        deliveries: { title: "Pizza delivery", body: "Three pizzerias, two in Porto Reale and one in Santa Cesarea. Routes from 120 metres to 15 km, by car or by bike: the sooner you arrive, the bigger the bonus.", meta: "Time bonus up to +72%" },
        transfers: { title: "Transfers", body: "Take a vehicle from a workshop or a dealership to its destination. Light knocks lower the fee; a bad crash cancels the job.", meta: "Short, regional, long" },
        speedTraps: { title: "Speed traps", body: `${ISLAND.speedTraps} star-rated speed traps around the island, one on the airport runway too. Each star pays out once.`, meta: "500 · 1,500 · 3,000 cr" },
        drag: { title: "Airport drag", body: "Full or Pro start tree, against the clock or as a challenge against an opponent of your class.", meta: "¼ · ½ · 1 mile" },
        zones: { title: "Drift and wheelie zones", body: "The harbour yard, the Val Chiaro sweeper, the airport straight and Via Est. Up to three stars per zone.", meta: `${ISLAND.zones} zones · up to 4,000 cr` },
      },
      police: {
        title: "Police",
        body: "Red lights, speeding, the wrong way, crashes: the patrols chase you. The wanted level climbs to 5 stars. Lose them, or they take you back to the safe spot. You can switch it off in the settings.",
        alt: "A police car drifting next to a blue supercar among Valdoria's skyscrapers",
      },
      start: {
        alt: "The start at the Mugello: two supercars on the chequered line, the packed grandstand behind",
        caption: "The start at the Mugello, with NPC drivers",
      },
    },
    dealership: {
      meta: {
        title: "Dealership",
        description: `${COUNTS.total} vehicles for sale: ${COUNTS.cars} cars and ${COUNTS.bikes} bikes, with prices, classes, power and stats as in the game.`,
      },
      hero: {
        eyebrow: "Dealership",
        title: `${COUNTS.total} vehicles for sale.`,
        lede: `${COUNTS.cars} cars and ${COUNTS.bikes} bikes, from city cars to Formula 1. Class, power and bars are the ones you see in game.`,
        alt: "Three of the game's vehicles on the orange slab: the Pluton, the Centauri and the Nausikaa bike",
      },
      showroom: {
        title: "Browse the catalogue",
        intro: "Pick a category and flick through the models, as in the game's showroom. Bars go from 0 to 10.",
      },
      dealers: {
        title: "Two dealerships",
        items: [
          { name: "APEX MOTOR", place: "Porto Reale", body: "The main town's performance dealership." },
          { name: "AUREA AUTOMOBILI", place: "Valdoria", body: "The luxury showroom, in the metropolis." },
        ],
        note: "Vehicles you buy stay yours: in your home garage you choose which to display, the others stay in your collection.",
      },
      labels: {
        categoriesLabel: "Categories",
        categories: { city: "City cars", sport: "Sports cars", super: "Supercars", utility: "SUVs and off-road", race: "Race cars", bikes: "Bikes" },
        stats: ["Speed", "Acceleration", "Handling", "Braking", "Launch", "Off-road"],
        cls: "Class",
        power: "Power",
        mass: "Weight",
        gears: "Gears",
        tooBig: "Too big for the garage",
        prev: "Previous vehicle",
        next: "Next vehicle",
        all: "All vehicles",
        modelAlt: "the game's 3D model",
      },
    },
    workshop: {
      meta: {
        title: "Workshop",
        description: "Nine component kits, four gearboxes and a performance index from 100 to 999: how cars and bikes are tuned in Motor District.",
      },
      hero: {
        eyebrow: "Workshop",
        title: "Every part changes the numbers.",
        lede: "Nine component kits, 24 slots on cars and 10 on bikes. Four gearboxes: manual, automatic, dual clutch and sequential. Liveries, wheels, spoilers and decals are looks only.",
        alt: "The red and white number 10 Pluton on the workshop stand",
        badge: "PI 315 stock",
      },
      kits: {
        title: "The kits",
        intro: "One component per row: every variant shows how the index and the bars change before you fit it.",
        label: "Workshop kits",
        items: ["Engine", "Turbo", "Drivetrain", "Number of gears", "Weight reduction", "Suspension", "Tyres", "Brakes", "Aerodynamics"],
        shopsNote: "Three workshops: the tuning centre in Porto Reale, the local workshop in Santa Cesarea and the industrial one in Valdoria.",
        alt: "The workshop screen: components on the right, performance index and the vehicle's bars",
      },
      pi: {
        title: "Performance index",
        body: "A number from 100 to 999 that sums up speed, acceleration, braking and handling. Championships have a class limit: to move up a series, move up a class.",
        label: "Car classes",
      },
    },
    life: {
      meta: {
        title: "Island life",
        description: `${ISLAND.properties} properties to buy, a character to dress and levels with no cap: life outside the races in Motor District.`,
      },
      hero: {
        eyebrow: "Island life",
        title: "A home, a garage, a wardrobe.",
        lede: "Away from the races the island is your home: buy houses and garages, choose what to display, change your look and level up.",
        alt: "A street in Valdoria among the skyscrapers, with bus shelters and a planted central reservation",
        tag: { name: "Valdoria", caption: "On foot, in game" },
      },
      homes: {
        title: "Homes and garages",
        body: `${ISLAND.properties} properties with 2 to 40 parking spaces: the free starter home, a family home, a villa, three garages and the penthouse with a multistorey garage on top of Valdoria. Buy them at the real estate agency; they sell back for 70%.`,
        alt: "The penthouse on top of Valdoria's tallest tower, with the city and the lake below",
        list: ["Starter home", "Family home", "Villa", "Industrial garage", "Collector garage", "Industrial warehouse", "Penthouse with multistorey garage"],
      },
      character: {
        title: "Character",
        body: "9 hairstyles, 5 body types, 3 outfits and 7 helmets. Two clothes shops, in Porto Reale and Santa Cesarea: you change in front of the mirror.",
      },
      levels: {
        title: "Levels",
        body: "Just driving earns experience too: a point every 25 metres. Levels unlock championships and transfers, and there's no cap.",
      },
    },
    play: {
      meta: {
        title: "How to play",
        description: "Controls, driving aids, devices, multiplayer and offline play: everything you need to get going in Motor District.",
      },
      hero: {
        eyebrow: "How to play",
        title: "Real physics, aids your way.",
        lede: "Tyres, suspension, drivetrain and bike dynamics are simulated. The aids make everything drivable, and you can change them while you drive.",
        alt: "A street in Porto Reale at street level: colourful buildings, a parked blue car and a red bike",
        tag: { name: "Porto Reale", caption: "At street level, in game" },
      },
      assists: {
        title: "The aids",
        items: [
          { term: "Car", desc: "Traction control with 4 levels, ABS, stability control (ESC), differential lock." },
          { term: "Bike", desc: "Traction control, ABS, wheelie control (anti-wheelie, assisted, free), slide control." },
          { term: "Everyone", desc: "Steering assist, automatic gearbox or manual with clutch, first-person view on bikes." },
        ],
        alt: "The driving settings: separate aids for cars and bikes, steering assist and police",
      },
      controls: {
        title: "The controls",
        devices: { keyboard: "Keyboard", gamepad: "Gamepad", touch: "Touch" },
        keys: [
          { keys: ["W", "A", "S", "D"], label: "Drive" },
          { keys: ["Q", "E"], label: "Gear down / up" },
          { keys: ["Space"], label: "Handbrake" },
          { keys: ["T"], label: "Traction control" },
          { keys: ["B"], label: "ABS" },
          { keys: ["F"], label: "Get in / out" },
          { keys: ["C"], label: "Camera" },
          { keys: ["M"], label: "Map" },
        ],
        note: "Every control can be remapped. On phones and tablets you play in landscape, with graphics presets from Low to Very high.",
      },
      online: {
        title: "Alone, or sixteen of you.",
        items: {
          multiplayer: { title: "Multiplayer", body: `Experimental: switch it on from the menu. Rooms of up to ${ISLAND.roomPlayers} players; online, police and activities are off.` },
          boards: { title: "Leaderboards", body: "Mugello laps, the two coast time trials, drag over the three distances and the four zones. All-time or weekly, by class too." },
          account: { title: "Account and saves", body: "With an account your settings, garage, character, credits and progress are saved in the cloud, and you find them on another device." },
          offline: { title: "Offline too", body: "Install it as an app and download the whole game, about 61 MB, to play without a connection." },
        },
        note: "In the itch.io version, accounts, cloud saves and online leaderboards aren't active: progress stays in your browser.",
        alt: "Motor District's main menu: “Get out. Drive. Explore.” with the Pluton on the orange slab",
      },
    },
  },
};

export default en;
