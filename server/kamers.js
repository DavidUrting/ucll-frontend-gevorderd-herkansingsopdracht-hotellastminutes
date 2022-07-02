import Kamer from "./kamer.js";

function searchKamers(locatie, aantalSterren, aantalDagen, aantalPersonen) {
    let beschikbareKamers = [];
    let now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    beschikbareKamers.push(new Kamer(
        locatie,
        'BelEtage',
        'Chique',
        aantalSterren,
        now.valueOf(),
        now.setDate(now.getDate() + aantalDagen),
        200
    ));
    beschikbareKamers.push(new Kamer(
        locatie,
        'Park Inn',
        'Standard',
        aantalSterren,
        now.valueOf(),
        now.setDate(now.getDate() + 1),
        150
    ));
    return beschikbareKamers;
}

export default searchKamers;