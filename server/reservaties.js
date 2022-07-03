import { v4 as uuidv4, v4 } from "uuid";

function reserveer(username, vouchercode, kamerIds) {
    // TODO: hier moet natuurlijk code komen voor het effectief bewaren van de reservatie. Maar dat is out of scope.
    console.log(`Reservatie van ${kamerIds.length} kamers voor gebruiker ${username} met (optionele) vouchercode ${vouchercode} (kan leeg zijn)...`);

    let reservatienummer = v4();
    return reservatienummer;
}

export default reserveer;