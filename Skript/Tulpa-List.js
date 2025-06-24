const Tulpas = {

    Mäusschen: { name: "Mäusschen", className: "Mäusschen", HP: 50, HP_Total: 50, ANG: 6, VER: 6, attacks: { 1: "Kratzer", 2: "Biss", 3: "-", 4: "-" }, des: "Ein Süßer und netter Zeitgenosse. Immer Gut gelaunt und voller energie geht das Mäusschen seiner Täglichen Mäusearbeit nach. Ärgere sie doch einfach nicht.", },
    //ein simple braun/goldene kleine maus
    Maus: { name: "Maus", className: "Maus", HP: 75, HP_Total: 75, ANG: 7, VER: 7, attacks: { 1: "Tackle", 2: "Biss", 3: "Blutlust", 4: "-" }, des: "Eine sehr Gesellige Maus. Trotzdem mag sie kleine Auseinadnersetzungen, sie siehts sportlich.", },
    // änlich wie die erste , nur etwas grösser mit ernstem  gesicht
    Kampfmaus: { name: "Kampfmaus", className: "Kampfmaus", HP: 100, HP_Total: 100, ANG: 8, VER: 8, attacks: { 1: "Tackle", 2: "Biss", 3: "Blutlust", 4: "Schlag" }, des: "Ein wahrer Mäusesoldat. Sie ist sehr mutig und hat keine Angst vor größeren Gegnern.", },
    // diese maus sieht auch gleich aus wie die vorherige, allerdings hat sie ein rotes stirnband


    Kaninchen: { name: "Kaninchen", className: "Kaninchen", HP: 50, HP_Total: 50, ANG: 6, VER: 6, attacks: { 1: "Tackle", 2: "Biss", 3: "-", 4: "-" }, des: "Ein süßes und nettes Kaninchen. Es ist sehr schüchtern und hat Angst vor... allem! ", },
    // ein weisses kleines, süsses , simples Kaninchen
    Hase: { name: "Hase", className: "Hase", HP: 75, HP_Total: 75, ANG: 7, VER: 7, attacks: { 1: "Tackle", 2: "Biss", 3: "Ausweichen", 4: "-" }, des: "Ein Hase, der gerne mit seinen Freunden spielt. Manchmal schubst er auch alte Hasenrentner.. aber nur weil sie lustig fallen.", },
    //etwas grösser auch mit grimmigen gesicht und längeren Ohren
    Kaninchen_des_Todes: { name: "Kaninchen des Todes", className: "Kaninchen_des_Todes", HP: 100, HP_Total: 100, ANG: 10, VER: 10, attacks: { 1: "Tackle", 2: "Biss", 3: "Ausweichen", 4: "Todeshauch" }, des: "Der eine Hase sie alle zu knechten... und... zu töten!", },
    //Im grunde darf es auch nur schlicht und weiss sein. Vielleicht mir feueroten augen


    Streuner: { name: "Streuner", className: "Streuner", HP: 50, HP_Total: 50, ANG: 7, VER: 7, attacks: { 1: "Tackle", 2: "Biss", 3: "-", 4: "-" }, des: "Ein Streuner, der immer auf der Suche nach einem neuen Zuhause ist. Es sieht aus als würde er bei dir bleiben wollen.", },
    //Ein netter brauner Hund/Mischling aus Schäferhund und Doberman.
    Wachhund: { name: "Wachhund", className: "Wachhund", HP: 75, HP_Total: 75, ANG: 8, VER: 8, attacks: { 1: "Tackle", 2: "Biss", 3: "Blutlust", 4: "-" }, des: "Ein Wachhund, der immer auf der Hut ist. Er ist sehr treu und greift das an was sein Herrchen bedroht.", },
    //Ein Doberman mit Nietenhalsband
    Schutzhund: { name: "Schutzhund", className: "Schutzhund", HP: 100, HP_Total: 100, ANG: 9, VER: 9, attacks: { 1: "Tackle", 2: "Biss", 3: "Blutlust", 4: "Schild" }, des: "Ein Engel... vom Spagettimonster geschickt um sein Herrchen zu schützen. Freut sich wenn er lob bekommt." },
    //Ein Schäferhund mit Rüstung um den Hals


    Kleiner_Wolf: { name: "Kleiner Wolf", className: "Kleiner_Wolf", HP: 50, HP_Total: 50, ANG: 8, VER: 6, attacks: { 1: "Tackle", 2: "Biss", 3: "-", 4: "-" }, des: "Ein junger kleiner Wolf. Eigentlich ist er ganz nett, aber auch etwas wild.", },
    //ein kleiner grau/weisser Wolf
    Wolf: { name: "Wolf", className: "Wolf", HP: 75, HP_Total: 75, ANG: 9, VER: 8, attacks: { 1: "Tackle", 2: "Biss", 3: "Blutlust", 4: "-" }, des: "Ein Klassiker unter den Tulpas. Der den Wolf nicht ehrt... ist des Schafes nicht wert." },
    //Etwas grösser . Ein voll ausgewchsener Wolf
    Böser_Wolf: { name: "Böser Wolf", className: "Böser_Wolf", HP: 100, HP_Total: 100, ANG: 10, VER: 9, attacks: { 1: "Tackle", 2: "Biss", 3: "Blutlust", 4: "Todeshauch" }, des: "Der gute alte Böse Wolf. Wenn er grade keine Grossmütter tötet, dann ärgert er kleine Kinder" },
    //Dieser Wolf ist Pechschwarz und hat rote Augen. Er sieht sehr böse aus.


    Zosse: { name: "Zosse", className: "Zosse", HP: 50, HP_Total: 50, ANG: 6, VER: 8, attacks: { 1: "Tackle", 2: "Hufschlag", 3: "-", 4: "-" }, des: "Ein etwas klappriger Gaul. Nicht sicher ob er noch lange macht." },
    //ein klappriges standart/Braunes Pferd
    Treues_Ross: { name: "Treues Ross", className: "Treues_Ross", HP: 75, HP_Total: 75, ANG: 7, VER: 9, attacks: { 1: "Tackle", 2: "Hufschlag", 3: "Schild", 4: "-" }, des: "Doch nicht so klapprig wie gedacht. Ein treues Ross, das immer für dich da ist." },
    //Dasselbe nur ohne klapprig :)
    Streitross: { name: "Streitross", className: "Streitross", HP: 100, HP_Total: 100, ANG: 8, VER: 10, attacks: { 1: "Tackle", 2: "Hufschlag", 3: "Schild", 4: "Ausweichen" }, des: "Der Panzer unter den Pferden. Stolz, Kräftig und mutig. Ein besseres Pferd hat es nie gegeben." },
    //Dieses Pferd ist in Pferderüstung eingepackt. Klassisches Ritterpferd.


} 
