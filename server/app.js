import searchKamers from "./kamers.js";

import { v4 as uuidv4, v4 } from "uuid";

const port = 3000;
import express from "express";
import cors from "cors";
const app = express();

app.use(cors()); // Dit zorgt ervoor dat je de API ook kan gebruiken vanop andere locaties.
app.use(express.static('../client/public'));
app.use(express.json());

// HTTP GET /api/kamers
// ********************
// Geeft een JSON array van alle beschikbare kamers terug. 
// Deze array bestaat uit objecten met id (number), locatie (string), hotel (string), naam (string), van (number), tot (number) en prijs (number) properties.
// Dus een array van deze vorm: [{ "id": 0, "locatie": "Oostende", "hotel": "BelEtage"}, ...]
app.get("/api/kamers", (req, res) => {
    if (!req.query.locatie) {
        res.status(400).send('Gelieve een locatie mee te geven.');
    } else if (!req.query.aantalSterren) {
        res.status(400).send('Gelieve een aantal sterren (> 0) mee te geven.');
    } else if (!req.query.aantalDagen) {
        res.status(400).send('Gelieve een aantal dagen (> 0) mee te geven.');
    } else if (!req.query.aantalPersonen) {
        res.status(400).send('Gelieve een aantal personen (> 0) mee te geven.');
    } else {
        let beschikbareKamers = searchKamers(
            req.query.locatie, 
            req.query.aantalSterren, 
            req.query.aantalDagen, 
            req.query.aantalPersonen);
        res.json(beschikbareKamers);
        console.log(`Er werden ${beschikbareKamers.length} beschikbare kamers naar de browser teruggestuurd.`);    
    }
});

// HTTP POST /api/vouchers
// ***********************
app.post("/api/vouchers", (req, res) => { 
    // TODO: kortingspercentage berekenen op basis van vouchercode en totaalprijs.
    res.json({ 
        kortingspercentage: 10
    });
});

// HTTP POST /api/reservaties
// ********************
app.post("/api/reservaties", (req, res) => {
    // TODO: username valideren, vouchercode (if any) nogmaals valideren en reservatienummer genereren.
    res.json({
        reservatienummer: v4()
    });
});


// Starten van de server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}...`);
});