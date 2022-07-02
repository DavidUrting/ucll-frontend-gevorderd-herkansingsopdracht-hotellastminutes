import searchKamers from "./kamers.js";

import { v4 as uuidv4, v4 } from "uuid";

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
    let beschikbareKamers = searchKamers('Oostende', 4, 2, 2);
    res.json(beschikbareKamers);
    console.log(`Er werden ${beschikbareKamers.length} beschikbare kamers naar de browser teruggestuurd.`);
});

// HTTP POST /api/vouchers
// ***********************
app.post("/api/vouchers", (req, res) => { 
    // TODO
    res.json({ 
        kortingspercentage: 10
    });
});

// HTTP POST /api/reservaties
// ********************
app.post("/api/reservaties", (req, res) => {
    // TODO
    res.json({
        reservatienummer: v4()
    });
});


// Starten van de server
app.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000...");
});