
function Tour(name, description, length, tags) {
    this.name = name;
    this.description = description;
    this.length = length;
    this.tags = tags;
}


const tours = [
    new Tour("Gradska tura", "Tura kroz istorijske delove grada", 5, ["istorijska", "gradska"]),
    new Tour("Planinska tura", "Tura po planinskim stazama", 15, ["priroda", "planinska"]),
    new Tour("Rečna tura", "Tura brodom po rekama", 10, ["priroda", "voda"]),
];

function renderujTure() {
    const tableBody = document.querySelector("#tours tbody");
    tableBody.innerHTML = "";

    for (i = 0; i < tours.length; i++) {
        const tour = tours[i];
        const row = document.createElement("tr");

        const brojCelija = document.createElement("td");
        brojCelija.textContent = i + 1;
        row.appendChild(brojCelija);

        const imeCelija = document.createElement("td");
        imeCelija.textContent = tour.name;
        row.appendChild(imeCelija);

        const duzinaCelija = document.createElement("td");
        duzinaCelija.textContent = tour.length;
        row.appendChild(duzinaCelija);

        row.addEventListener("click", function () {
            prikaziDetaljeTure(tour);
        })

        tableBody.appendChild(row);
    }
}

function prikaziDetaljeTure(tour) {
    const detaljiDiv = document.querySelector("#tour-details");
    detaljiDiv.innerHTML = "";

    const paragraf = document.createElement("p");
    paragraf.innerHTML = `
        <strong>Opis:</strong> ${tour.description} <br>
        <strong>Tagovi:</strong> ${tour.tags.join(", ")}
    `;

    detaljiDiv.appendChild(paragraf);
}

renderujTure();