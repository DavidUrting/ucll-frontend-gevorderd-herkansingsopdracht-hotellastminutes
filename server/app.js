import zoekKamers from "./kamers.js";
import berekenKortingspercentage from "./vouchers.js";
import reserveer from "./reservaties.js";

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
        let beschikbareKamers = zoekKamers(
            req.query.locatie, 
            parseInt(req.query.aantalSterren), 
            parseInt(req.query.aantalDagen), 
            parseInt(req.query.aantalPersonen));
        res.json(beschikbareKamers);
        console.log(`Er werden ${beschikbareKamers.length} beschikbare kamers naar de browser teruggestuurd.`);    
    }
});

// HTTP POST /api/vouchers
// ***********************
app.post("/api/vouchers", (req, res) => { 
    let kortingspercentage = berekenKortingspercentage(
        req.body.totaalprijs, 
        req.body.vouchercode);
    res.json({ 
        kortingspercentage: kortingspercentage
    });
});

// HTTP POST /api/reservaties
// ********************
app.post("/api/reservaties", (req, res) => {
    let reservatienummer = reserveer(
        req.body.username,
        req.body.vouchercode,
        req.body.kamerIds
    )
    res.json({
        reservatienummer: reservatienummer
    });
});


// Starten van de server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}...`);
});