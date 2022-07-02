Zorg ervoor dat [Node](https://nodejs.org/en/download/) geïnstalleerd is.  
Je kan snel starten door een terminal te openen in deze directory en vervolgens ```npm run start``` uit te voeren. 
De API van de webapplicatie is dan beschikbaar op http://localhost:3000/api/...

De API biedt volgende functionaliteiten: 
* Een GET request naar http://localhost:3000/api/kamers?locatie=Oostende&aantalSterren=4&aantalDagen=2&aantalPersonen=2 geeft een JSON array terug met alle beschikbare kamers voor 2 personen in Oostende voor de volgende twee dagen (en rekening houdende met het aantal sterren). De query string pas je uiteraard aan op basis van de input van de gebruiker.
* Een POST request naar http://localhost:3000/api/vouchers geeft een kortingspercentage terug. In de body moet je een object meegeven met 'totaalprijs' en 'vouchercode' properties. Wat je terugkrijgt is een object met een 'kortingspercentage' property.
* Een POST request naar http://localhost:3000/api/reservaties geeft een reservatienummer terug. In de body moet je de array met alle 'kamerIds' die op de reservatielijst staan meesturen, alsook ook de 'username' en een eventueel ingevulde 'vouchercode'. Wat je terugkrijgt is een object met een 'reservatienummer' property (een UUID string van de vorm "123e4567-e12e-12e3-a123-123456789012").

> (!) Meer detailinformatie over de JSON data die je moet sturen of zal ontvangen staat als commentaar in /server/app.js

In de map /postman kan je een 'Postman collection' terugvinden met GET en POST requests.
Deze collection kan je importeren in Postman om de API te testen.