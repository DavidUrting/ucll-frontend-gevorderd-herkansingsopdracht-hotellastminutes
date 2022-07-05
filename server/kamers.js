import Kamer from "./kamer.js";

const dagInMsec = 24 * 60 * 60 * 1000;
const gemiddeldAantalBeschikbareKamers = 10;
const aantalBeschikbareKamersMaxVariance = 4;

// Dit is een lijst van 'template' kamers.
// De locatie en van/tot wordt pas ingevuld als er gezocht wordt naar kamers: dan wordt er een kopie genomen van bepaalde van deze kamers.
const kamers = [
    new Kamer(null,'BelEtage','Chique', 4, 2, null, null, 200),
    new Kamer(null,'BelEtage','Superchique', 5, 4, null, null, 300),
    new Kamer(null,'Park Inn','VeryBasic', 1, 2, null, null, 50),
    new Kamer(null,'Park Inn','Basic', 2, 2, null, null, 80),
    new Kamer(null,'Park Inn','Comfy', 3, 2, null, null, 110),    
    new Kamer(null,'Park Inn','Comfy+', 4, 4, null, null, 150),
    new Kamer(null,'Mirage','Standard', 3, 2, null, null, 160),
    new Kamer(null,'Mirage','Comfort', 4, 2, null, null, 200),
    new Kamer(null,'Mirage','VIP', 5, 6, null, null, 200),
    new Kamer(null,"L'Auberge",'Sleep&Go', 1, 4, null, null, 80),
    new Kamer(null,"L'Auberge",'Standard', 2, 4, null, null, 120),
];

// Onderstaande functie geeft willekeurig beschikbare kamers terug.
// Aangezien het willekeurig is, kan elke call een verschillend resultaat teruggeven.
// In een realistisch scenario zal er natuurlijk gebruik worden gemaakt van een database met beschikbaarheden.
function zoekKamers(locatie, aantalSterren, aantalNachten, aantalPersonen) {
    let beschikbareKamers = [];
    let now = new Date();
    let nowUtcMidday = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 12)); // Er wordt steeds van de middag gestart (UTC).

    // uit de lijst van kamers worden de kamers gefilterd die voldoen aan het aantal gevraagde sterren.
    let kamersMetGewenstAantalSterren = kamers.filter(dk => dk.aantalSterren === aantalSterren);

    // Er wordt nu bepaald hoeveel kamers er beschikbaar zijn. Dat is een getal in het interval [6, 14].
    const aantalBeschikareKamersVariance = Math.round(Math.random() * aantalBeschikbareKamersMaxVariance) * (Math.random() < 0.5 ? -1 : 1);
    const aantalBeschikbareKamers = gemiddeldAantalBeschikbareKamers + aantalBeschikareKamersVariance;

    // En vervolgens worden de kamers verder willekeurig ingevuld (= van/tot).
    // Indien er meer personen zijn dan wat de kamer kan bieden, worden meerdere gelijkaardige kamers toegevoegd.
    for (let i = 0; i < aantalBeschikbareKamers; i++) {
        let randomKamerIndex = Math.floor(Math.random() * kamersMetGewenstAantalSterren.length);
        let randomVanOffsetInMsec = Math.floor(Math.random() * aantalNachten) * dagInMsec;
        let randomTotOffsetInMsec = Math.max(randomVanOffsetInMsec + dagInMsec, Math.round(Math.random() * aantalNachten) * dagInMsec);
        let aantalBenodigdeKamers = Math.max(1, Math.floor(aantalPersonen / kamersMetGewenstAantalSterren[randomKamerIndex].aantalPersonen));
        for (let j = 0; j < aantalBenodigdeKamers; j++) {
            beschikbareKamers.push(new Kamer(
                locatie,
                kamersMetGewenstAantalSterren[randomKamerIndex].hotel,
                kamersMetGewenstAantalSterren[randomKamerIndex].naam,
                kamersMetGewenstAantalSterren[randomKamerIndex].aantalSterren,
                kamersMetGewenstAantalSterren[randomKamerIndex].aantalPersonen,
                new Date(nowUtcMidday.getTime() + randomVanOffsetInMsec),
                new Date(nowUtcMidday.getTime() + randomTotOffsetInMsec),
                kamersMetGewenstAantalSterren[randomKamerIndex].prijsPerNacht
            ));    
        }
    }
    return beschikbareKamers;
}

export default zoekKamers;