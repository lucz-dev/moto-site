import { COUNTS } from "../lib/catalog";
import { ISLAND } from "../lib/site";

// Italian texts. Game terms follow src/locales/it.ts of the game; facts come from its
// docs/sintesi/*. en.ts must have the same shape (it is typed by this file).
const it = {
  meta: {
    title: "Motor District — la tua isola, le tue regole",
    description: `Sandbox di guida open world, gratis nel browser: un'isola mediterranea da girare in auto, in moto e a piedi. ${COUNTS.total} veicoli, ${ISLAND.championships} campionati, consegne, polizia, officina e case da comprare.`,
    ogLocale: "it_IT",
  },
  ui: {
    skip: "Vai al contenuto",
    home: "Motor District, torna alla home",
    sections: "Pagine",
    menu: "Menu",
    closeMenu: "Chiudi il menu",
    language: "Lingua",
    languageName: "Italiano",
    play: "Gioca",
    playFree: "Gioca gratis",
    playItch: "Gioca su itch.io",
    moreGames: "Altri giochi di LuCz",
    discover: "Scopri",
    prev: "Pagina precedente",
    next: "Pagina successiva",
    release: (date: string) => `Alpha pubblica · aggiornata ${/^(8|11) /.test(date) ? "l'" : "il "}${date} · computer, telefono e tablet`,
    videoPlay: "Riproduci il video",
    videoPause: "Metti in pausa il video",
    footerBy: "Un gioco di",
    footerRest: "Fonti delle mappe e crediti degli asset sono nel menu del gioco.",
    notFoundTitle: "Strada chiusa.",
    notFoundBody: "Questa pagina non esiste, o è stata spostata.",
  },
  nav: {
    island: "Isola",
    activities: "Attività",
    dealership: "Concessionaria",
    workshop: "Officina",
    life: "Vita",
    play: "Come si gioca",
  },
  home: {
    eyebrow: "La tua isola. Le tue regole.",
    title: ["Esci.", "Guida.", "Esplora."],
    lede: "Motor District è un sandbox di guida open world, gratis nel browser. Un'isola del Mediterraneo da girare in auto, in moto o a piedi: la costa, tre città, un aeroporto e il circuito del Mugello.",
    secondary: "Cosa c'è sull'isola",
    tag: { name: "Nausikaa", caption: "Ripresa in gioco · costa di Porto Badisco" },
    summary: {
      eyebrow: "Sull'isola",
      title: "C'è sempre qualcosa da fare.",
      intro: `Gare, consegne, polizia, ${COUNTS.total} veicoli e un'officina per truccarli. Ogni scheda apre la sua pagina, con tutto quello che c'è nel gioco.`,
    },
    cards: {
      island: {
        title: "L'isola",
        body: "La costa, tre città, un aeroporto e il Mugello. Scegli il punto di partenza e vai dove vuoi.",
        facts: [`${ISLAND.areaKm2} km²`, `${ISLAND.roadKm} km di strade`, `${ISLAND.places} partenze`],
      },
      activities: {
        title: "Attività",
        body: "Campionati, gare, consegne di pizze, trasferimenti, autovelox, drag e zone drift. E la polizia, se passi col rosso.",
        facts: [`${ISLAND.championships} campionati`, `${ISLAND.speedTraps} autovelox`, "Fino a 5 stelle"],
      },
      dealership: {
        title: "Concessionaria",
        body: "Dalla citycar alla Formula 1, con prezzi, classi e barre identici al gioco.",
        facts: [`${COUNTS.cars} auto`, `${COUNTS.bikes} moto`, "6 categorie"],
      },
      workshop: {
        title: "Officina",
        body: "Nove kit di componenti e quattro cambi. Ogni pezzo sposta l'indice di prestazione.",
        facts: ["24 slot sulle auto", "Classi da D a X"],
      },
      life: {
        title: "Vita sull'isola",
        body: "Case e garage da comprare, un personaggio da vestire, livelli che aprono nuove serie.",
        facts: [`${ISLAND.properties} proprietà`, "Fino a 40 posti auto"],
      },
      play: {
        title: "Come si gioca",
        body: "Tastiera, gamepad o touch. Aiuti alla guida a scelta, multigiocatore e gioco offline.",
        facts: ["Gratis nel browser", `Fino a ${ISLAND.roomPlayers} giocatori`],
      },
    },
  },
  finale: {
    title: "Si parte.",
    lede: "Motor District è gratis e gira nel browser, su computer e telefono. È un'alpha in sviluppo: aspettati novità frequenti, e qualche bug. Se ne trovi uno, scrivilo nei commenti su itch.io.",
    logoAlt: "Motor District — Your island. Your rules.",
  },
  cta: {
    title: "Pronto a partire?",
    body: "Gratis, nel browser, senza installare niente.",
  },
  pages: {
    island: {
      meta: {
        title: "L'isola",
        description: `Otto punti di partenza su un'isola di ${ISLAND.areaKm2} km²: Porto Reale, Valdoria, Santa Cesarea, la costiera SP358, l'aeroporto e il circuito del Mugello.`,
      },
      hero: {
        eyebrow: "L'isola",
        title: "Scegli da dove partire.",
        lede: `Circa ${ISLAND.areaKm2} km² nel mare e ${ISLAND.roadKm} km di strade con traffico, semafori, rotonde e gallerie. Nel menu scegli il punto di partenza, poi vai dove vuoi: in auto, in moto o a piedi.`,
        alt: "L'isola vista dall'alto: rilievi verdi, la costa e il mare",
        tag: { name: "Isola", caption: "Vista dall'alto, in gioco" },
      },
      picker: {
        title: "Gli otto punti di partenza",
        intro: "Sono gli stessi del menu del gioco e del teletrasporto in pausa, con Casa tua in testa.",
        label: "Partenza",
        loading: "Isola",
      },
      places: {
        "porto-reale": {
          name: "Porto Reale",
          start: "Casa tua",
          alt: "Porto Reale dall'alto: tetti rossi, palazzi color pastello e il mare all'orizzonte",
          body: "Il capoluogo, a sud-ovest. Qui c'è la tua prima casa con il garage, e qui trovi la concessionaria sportiva APEX MOTOR, il centro tuning, due pizzerie, l'agenzia immobiliare e un negozio di vestiti.",
          facts: ["298 edifici", "Fiume e ponte di pietra", "Casa base gratuita"],
        },
        porto: {
          name: "Porto di Porto Reale",
          start: "Porto di Porto Reale",
          alt: "Il porto commerciale con la gru gialla, i moli e il mare turchese; sullo sfondo le torri di Valdoria",
          body: "Il terminal merci: due moli, trenta container e due gru. Il piazzale è anche una zona drift con un tracciato a otto.",
          facts: ["2 moli", "30 container", "Zona drift a otto"],
        },
        valdoria: {
          name: "Valdoria",
          start: "Valdoria — Metropoli",
          alt: "I grattacieli di Valdoria visti dall'alto, con un parco e i palazzi bassi tra le torri",
          body: "La metropoli dell'isola. Ospita la concessionaria di lusso AUREA AUTOMOBILI, l'officina industriale e un attico con garage multipiano in cima alla torre più alta.",
          facts: ["822 edifici", "183 torri", "Fino a 60 piani"],
        },
        "porto-badisco": {
          name: "Porto Badisco",
          start: "Porto Badisco",
          alt: "La baia di Porto Badisco con la strada costiera che scende verso il mare",
          body: "Una baia sul mare all'estremità della costa. Da qui parte la cronometro verso Santa Cesarea, circa 5 km di curve sulla SP358.",
          facts: ["Partenza della costiera", "Circa 5 km di curve"],
        },
        "santa-cesarea": {
          name: "Santa Cesarea",
          start: "Parcheggio Santa Cesarea",
          alt: "Santa Cesarea affacciata su un mare turchese, con la costa alta che si allunga sullo sfondo",
          body: "Il paese sul mare in fondo alla costiera, con Torre Minervino lungo la strada. Ha un'officina, un garage, un negozio di vestiti e la Pizzeria della Piazzetta.",
          facts: ["Torre Minervino", "Pizzeria della Piazzetta", "Officina locale"],
        },
        "val-chiaro": {
          name: "Masseria di Val Chiaro",
          start: "Masseria di Val Chiaro",
          alt: "La masseria di Val Chiaro tra campi coltivati, con una strada che curva lungo la collina",
          body: "L'entroterra: un lago, campi coltivati e tre case di campagna con giardini diversi. La curva di Val Chiaro è una delle zone drift.",
          facts: ["Lago e gallerie", "3 case di campagna"],
        },
        aeroporto: {
          name: "Aeroporto Valchiaro",
          start: "Aeroporto Valchiaro",
          alt: "La pista dell'aeroporto con la torre di controllo e gli hangar, sotto le montagne",
          body: "Due piste, sei hangar e una torre di controllo di 42 metri. Sulla pista c'è il drag strip, cronometrato su un quarto di miglio, mezzo miglio e un miglio.",
          facts: ["Piste da 3.000 e 2.200 m", "Drag strip", "Torre di 42 m"],
        },
        mugello: {
          name: "Circuito del Mugello",
          start: "Mugello — pit lane",
          alt: "Il circuito del Mugello dall'alto: la corsia box, la tribuna e le prime curve",
          body: "Il tracciato reale di 5,25 km, ricostruito sull'Isola Piana. Ci arrivi da un ponte e da una galleria sotto la pista. Si gira da soli o contro fino a 15 avversari.",
          facts: ["5,25 km", "20 box", "Fino a 15 avversari"],
        },
      },
      roads: {
        eyebrow: "Strade",
        title: "Quelle da guidare almeno una volta.",
        intro: "La rete è di circa 520 tratti. Sulle principali il limite è 110 km/h; in città scende a 50, nelle rotonde a 40.",
        items: [
          { name: "Costiera SP358", body: "La strada vera da Porto Badisco a Santa Cesarea Terme, ricostruita dai dati reali: 5,17 km di curve sul mare, con tratti al 18%.", meta: "5,17 km · limite 60" },
          { name: "Circuito del Mugello", body: "Il tracciato reale sull'Isola Piana, con venti box e la tribuna. Si gira da soli o con i piloti NPC.", meta: "5,25 km" },
          { name: "Salita di Pietralba", body: "La SP2 sale dal lago di Val Chiaro verso la cascata di Pietralba, alta 64 metri. È una tappa dei campionati.", meta: "Tappa dei campionati" },
          { name: "Strada delle Falesie", body: "La strada delle scogliere. Si corre nei due sensi: verso ovest e verso est sono due tappe diverse dei campionati.", meta: "Limite 70" },
          { name: "Pista dell'aeroporto", body: "Tremila metri di asfalto: il drag strip cronometrato, il rettilineo per le impennate e un autovelox.", meta: "Drag · ¼ · ½ · 1 miglio" },
        ],
      },
    },
    activities: {
      meta: {
        title: "Attività",
        description: `${ISLAND.championships} campionati, gare al Mugello e sulla costa, consegne di pizze, trasferimenti, ${ISLAND.speedTraps} autovelox, drag in aeroporto, zone drift e impennata, e la polizia.`,
      },
      hero: {
        eyebrow: "Attività",
        title: "Guadagna crediti. Spendili in garage.",
        lede: "Ogni attività paga in crediti ed esperienza. Si comincia con 10.000 crediti, una citycar e una casa con due posti auto a Porto Reale.",
        alt: "Due moto in piega una accanto all'altra su una curva della costiera, accanto al muretto",
        tag: { name: "Costiera", caption: "Campionato moto · Santa Cesarea → Porto Badisco" },
      },
      championships: {
        title: "Campionati",
        body: `${ISLAND.championships} serie, quattro per le auto e quattro per le moto: Iniziale, Club, Pro ed Esperto. Tre tappe contro cinque rivali e una nemesi, sul Mugello, sulla costa, sulla salita di Pietralba e sulla strada delle Falesie.`,
        meta: "Punti 10 · 7 · 5 · 3 · 2 · 1 — fino a 45.000 cr",
        alt: "Due moto in piega una accanto all'altra su una curva della costiera",
      },
      panel: {
        alt: "Il pannello Campionati del gioco, con le serie Iniziale, Club, Pro ed Esperto",
        caption: "Il pannello dei campionati, in gioco",
      },
      items: {
        races: { title: "Gare e giro secco", body: "Due cronometro di circa 5 km sulla costa e giri al Mugello, da soli o contro fino a 15 avversari. Ogni giro valido paga in base al tempo.", meta: "200–2.000 cr a giro" },
        deliveries: { title: "Consegne", body: "Tre pizzerie, due a Porto Reale e una a Santa Cesarea. Percorsi da 120 metri a 15 km, in auto o in moto: più arrivi presto, più alto è il bonus.", meta: "Bonus tempo fino a +72%" },
        transfers: { title: "Trasferimenti", body: "Porta un veicolo da un'officina o da una concessionaria alla sua destinazione. Gli urti leggeri abbassano il compenso, un incidente grave annulla il lavoro.", meta: "Brevi, regionali, lunghi" },
        speedTraps: { title: "Autovelox", body: `${ISLAND.speedTraps} autovelox a stelle sparsi sull'isola, uno anche sulla pista dell'aeroporto. Ogni stella si paga una volta sola.`, meta: "500 · 1.500 · 3.000 cr" },
        drag: { title: "Drag in aeroporto", body: "Albero di partenza completo o Pro, a tempo o in sfida contro un avversario della tua classe.", meta: "¼ · ½ · 1 miglio" },
        zones: { title: "Zone drift e impennata", body: "Il piazzale del porto, la curva di Val Chiaro, il rettilineo dell'aeroporto e Via Est. Fino a tre stelle per zona.", meta: `${ISLAND.zones} zone · fino a 4.000 cr` },
      },
      police: {
        title: "Polizia",
        body: "Rosso, eccesso di velocità, contromano, incidenti: le pattuglie ti inseguono. Il livello ricercato sale fino a 5 stelle. Seminale, o ti riportano al punto sicuro. Si spegne nelle impostazioni.",
        alt: "Un'auto della polizia in derapata accanto a una supercar blu, tra i grattacieli di Valdoria",
      },
      start: {
        alt: "Partenza al Mugello: due supercar sulla linea a scacchi, la tribuna piena sullo sfondo",
        caption: "Il via al Mugello, con i piloti NPC",
      },
    },
    dealership: {
      meta: {
        title: "Concessionaria",
        description: `${COUNTS.total} veicoli in vendita: ${COUNTS.cars} auto e ${COUNTS.bikes} moto, con prezzi, classi, potenza e statistiche come nel gioco.`,
      },
      hero: {
        eyebrow: "Concessionaria",
        title: `${COUNTS.total} veicoli in vendita.`,
        lede: `${COUNTS.cars} auto e ${COUNTS.bikes} moto, dalla citycar alla Formula 1. Classe, potenza e barre sono quelle che vedi in gioco.`,
        alt: "Tre veicoli del gioco sulla lastra arancione: la Pluton, la Centauri e la moto Nausikaa",
      },
      showroom: {
        title: "Sfoglia il catalogo",
        intro: "Scegli una categoria e scorri i modelli, come nel salone del gioco. Le barre vanno da 0 a 10.",
      },
      dealers: {
        title: "Due concessionarie",
        items: [
          { name: "APEX MOTOR", place: "Porto Reale", body: "La concessionaria sportiva del capoluogo." },
          { name: "AUREA AUTOMOBILI", place: "Valdoria", body: "Il salone del lusso, nella metropoli." },
        ],
        note: "I veicoli comprati restano tuoi: nel garage di casa scegli quali esporre, gli altri restano nella collezione.",
      },
      labels: {
        categoriesLabel: "Categorie",
        categories: { city: "Utilitarie", sport: "Sportive", super: "Supercar", utility: "SUV e fuoristrada", race: "Da corsa", bikes: "Moto" },
        stats: ["Velocità", "Accelerazione", "Tenuta", "Frenata", "Spunto", "Fuoristrada"],
        cls: "Classe",
        power: "Potenza",
        mass: "Massa",
        gears: "Marce",
        tooBig: "Troppo grande per il garage",
        prev: "Veicolo precedente",
        next: "Veicolo successivo",
        all: "Tutti i veicoli",
        modelAlt: "il modello 3D del gioco",
      },
    },
    workshop: {
      meta: {
        title: "Officina",
        description: "Nove kit di componenti, quattro cambi e l'indice di prestazione da 100 a 999: come si truccano auto e moto in Motor District.",
      },
      hero: {
        eyebrow: "Officina",
        title: "Ogni pezzo cambia i numeri.",
        lede: "Nove kit di componenti, 24 slot sulle auto e 10 sulle moto. Quattro cambi: manuale, automatico, doppia frizione e sequenziale. Livree, cerchi, spoiler e decalcomanie sono solo estetica.",
        alt: "La Pluton numero 10, rossa e bianca, sul piedistallo dell'officina",
        badge: "PI 315 di serie",
      },
      kits: {
        title: "I kit",
        intro: "Un componente per riga: ogni variante mostra subito come cambiano indice e barre, prima di montarla.",
        label: "Kit dell'officina",
        items: ["Motore", "Turbo", "Trasmissione", "Numero di marce", "Alleggerimento", "Sospensioni", "Gomme", "Freni", "Aerodinamica"],
        shopsNote: "Tre officine: il centro tuning di Porto Reale, l'officina locale di Santa Cesarea e quella industriale di Valdoria.",
        alt: "La schermata dell'officina: componenti a destra, indice di prestazione e barre del veicolo",
      },
      pi: {
        title: "Indice di prestazione",
        body: "Un numero da 100 a 999 che riassume velocità, accelerazione, frenata e tenuta. I campionati hanno un limite di classe: per salire di serie, sali di classe.",
        label: "Classi delle auto",
      },
    },
    life: {
      meta: {
        title: "Vita sull'isola",
        description: `${ISLAND.properties} proprietà da comprare, un personaggio da vestire e livelli senza tetto: la vita fuori dalle gare in Motor District.`,
      },
      hero: {
        eyebrow: "Vita sull'isola",
        title: "Una casa, un garage, un guardaroba.",
        lede: "Fuori dalle gare l'isola è casa tua: compri case e garage, scegli cosa esporre, ti cambi e sali di livello.",
        alt: "Una strada di Valdoria tra i grattacieli, con le pensiline e le aiuole spartitraffico",
        tag: { name: "Valdoria", caption: "A piedi, in gioco" },
      },
      homes: {
        title: "Case e garage",
        body: `${ISLAND.properties} proprietà da 2 a 40 posti auto: la casa base gratuita, una casa familiare, una villa, tre garage e l'attico con garage multipiano in cima a Valdoria. All'agenzia immobiliare si compra, e si rivende al 70%.`,
        alt: "L'attico in cima alla torre più alta di Valdoria, con la città e il lago sotto",
        list: ["Casa base", "Casa familiare", "Villa", "Garage industriale", "Garage collezionisti", "Deposito industriale", "Attico con garage multipiano"],
      },
      character: {
        title: "Personaggio",
        body: "9 acconciature, 5 corporature, 3 abbigliamenti e 7 caschi. Due negozi di vestiti, a Porto Reale e a Santa Cesarea: ti cambi davanti allo specchio.",
      },
      levels: {
        title: "Livelli",
        body: "Anche guidare e basta dà esperienza: un punto ogni 25 metri. I livelli sbloccano campionati e trasferimenti, e non c'è un tetto.",
      },
    },
    play: {
      meta: {
        title: "Come si gioca",
        description: "Comandi, aiuti alla guida, dispositivi, multigiocatore e gioco offline: tutto quello che serve per partire in Motor District.",
      },
      hero: {
        eyebrow: "Come si gioca",
        title: "Fisica vera, aiuti a scelta.",
        lede: "Gomme, sospensioni, trasmissione e dinamica delle moto sono simulate. Gli aiuti rendono tutto guidabile e si cambiano anche mentre guidi.",
        alt: "Una via di Porto Reale a livello strada: palazzi colorati, un'auto blu parcheggiata e una moto rossa",
        tag: { name: "Porto Reale", caption: "A livello strada, in gioco" },
      },
      assists: {
        title: "Gli aiuti",
        items: [
          { term: "Auto", desc: "Controllo di trazione su 4 livelli, ABS, controllo di stabilità (ESC), bloccaggio del differenziale." },
          { term: "Moto", desc: "Controllo di trazione, ABS, controllo impennata (anti, assistita, libera), recupero scodata." },
          { term: "Per tutti", desc: "Sterzo assistito, cambio automatico o manuale con frizione, prima persona in moto." },
        ],
        alt: "Le impostazioni di guida: aiuti separati per auto e moto, sterzo assistito e polizia",
      },
      controls: {
        title: "I comandi",
        devices: { keyboard: "Tastiera", gamepad: "Gamepad", touch: "Touch" },
        keys: [
          { keys: ["W", "A", "S", "D"], label: "Guida" },
          { keys: ["Q", "E"], label: "Marcia giù / su" },
          { keys: ["Spazio"], label: "Freno a mano" },
          { keys: ["T"], label: "Controllo di trazione" },
          { keys: ["B"], label: "ABS" },
          { keys: ["F"], label: "Sali / scendi" },
          { keys: ["C"], label: "Camera" },
          { keys: ["M"], label: "Mappa" },
        ],
        note: "Tutti i comandi si rimappano. Su telefono e tablet si gioca in orizzontale, con preset grafici da Bassa a Molto alta.",
      },
      online: {
        title: "Da soli, o in sedici.",
        items: {
          multiplayer: { title: "Multigiocatore", body: `Sperimentale: si attiva dal menu. Stanze fino a ${ISLAND.roomPlayers} giocatori; online polizia e attività sono spente.` },
          boards: { title: "Classifiche", body: "Giro del Mugello, le due cronometro della costa, il drag sulle tre distanze e le quattro zone. Di sempre o della settimana, anche per classe." },
          account: { title: "Account e salvataggio", body: "Con un account salvi nel cloud impostazioni, garage, personaggio, crediti e progressi, e li ritrovi su un altro dispositivo." },
          offline: { title: "Anche offline", body: "Si installa come un'app e si scarica intero, circa 61 MB, per giocare senza connessione." },
        },
        note: "Nella versione su itch.io account, salvataggio cloud e classifiche online non sono attivi: i progressi restano nel browser.",
        alt: "Il menu principale di Motor District: «Esci. Guida. Esplora.» con la Pluton sulla lastra arancione",
      },
    },
  },
};

export default it;
export type Dictionary = typeof it;
