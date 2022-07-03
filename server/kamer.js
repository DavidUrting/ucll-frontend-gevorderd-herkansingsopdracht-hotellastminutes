// Objecten van deze klasse stellen de producten van de UCLL webshop voor.
export default class Kamer {
    static _laatstToegekendeId = -1;

    constructor(locatie, hotel, naam, aantalSterren, aantalPersonen, van, tot, prijs) {
        this._id = ++Kamer._laatstToegekendeId;
        this._locatie = locatie;
        this._hotel = hotel; // hotel naam
        this._naam = naam; // kamer naam
        this._aantalSterren = aantalSterren;
        this._aantalPersonen = aantalPersonen;
        this._van = van;
        this._tot = tot;
        this._prijs = prijs;
    }

    get id() {
        return this._id;
    }

    get locatie() {
        return this._locatie;
    }

    get hotel() {
        return this._hotel;
    }

    get naam() {
        return this._naam;
    }

    get aantalSterren() {
        return this._aantalSterren;
    }

    get aantalPersonen() {
        return this._aantalPersonen;
    }

    get van() {
        return this._van;
    }

    get tot() {
        return this._tot;
    }

    get prijs() {
        return this._prijs;
    }

    // JSON.stringify zal standaard deze methode aanroepen, alvoerens om te zetten naar een JSON string.
    // Op deze manier zorgen we ervoor dat er geen _ in de propertynamen zitten.
    toJSON() {
        return {
            id: this.id,
            locatie: this.locatie,
            hotel: this.hotel,
            naam: this.naam,
            aantalSterren: this.aantalSterren,
            aantalPersonen: this.aantalPersonen,
            van: this.van,
            tot: this.tot,
            prijs: this.prijs
        };
    }
}