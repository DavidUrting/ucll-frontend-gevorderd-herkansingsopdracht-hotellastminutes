import Kamer from "./kamer.js";

const gemiddeldAantalBeschikbareKamers = 10;
const aantalBeschikbareKamersMaxVariance = 4;
const kamers = [
    new Kamer(null,'BelEtage','Chique', 4, null, null, 200),
    new Kamer(null,'BelEtage','Superchique', 5, null, null, 300),
    new Kamer(null,'Park Inn','VeryBasic', 1, null, null, 50),
    new Kamer(null,'Park Inn','Basic', 2, null, null, 80),
    new Kamer(null,'Park Inn','Comfy', 3, null, null, 110),    
    new Kamer(null,'Park Inn','Comfy+', 4, null, null, 150),
    new Kamer(null,'Mirage','Standard', 3, null, null, 160),
    new Kamer(null,'Mirage','Comfort', 4, null, null, 200),
    new Kamer(null,'Mirage','VIP', 5, null, null, 200),
    new Kamer(null,"L'Auberge",'Sleep&Go', 1, null, null, 80),
    new Kamer(null,"L'Auberge",'Standard', 2, null, null, 120),
];

// Onderstaande functie geeft random beschikbare kamers terug.
// Aangezien het random is, kan elke call een verschillend resultaat teruggeven.
// In een realistisch scenario zal er natuurlijk gebruik worden gemaakt van een database met beschikbaarheden.
function zoekKamers(locatie, aantalSterren, aantalDagen, aantalPersonen) {
    let beschikbareKamers = [];
    let now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let dummyKamersMetGewenstAantalSterren = kamers.filter(dk => dk.aantalSterren === aantalSterren);

    const aantalBeschikareKamersVariance = Math.round(Math.random() * aantalBeschikbareKamersMaxVariance) * (Math.random() < 0.5 ? -1 : 1);
    const aantalBeschikbareKamers = gemiddeldAantalBeschikbareKamers + aantalBeschikareKamersVariance;
    for (let i = 0; i < aantalBeschikbareKamers; i++) {
        let randomKamerIndex = Math.floor(Math.random() * dummyKamersMetGewenstAantalSterren.length);
        let randomVan = Math.floor(Math.random() * aantalDagen);
        let randomTot = Math.max(randomVan + 1, Math.round(Math.random() * aantalDagen));
        beschikbareKamers.push(new Kamer(
            locatie,
            dummyKamersMetGewenstAantalSterren[randomKamerIndex].hotel,
            dummyKamersMetGewenstAantalSterren[randomKamerIndex].naam,
            aantalSterren,
            now.setDate(now.getDate() + randomVan),
            now.setDate(now.getDate() + randomTot),
            dummyKamersMetGewenstAantalSterren[randomKamerIndex].prijs
        ));
    }
    return beschikbareKamers;
}

export default zoekKamers;