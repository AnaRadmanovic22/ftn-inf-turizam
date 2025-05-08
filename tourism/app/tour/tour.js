
function Tour(name, description, length, tags) {
    this.name = name;
    this.description = description;
    this.length = length;
    this.tags = tags;
}


function loadTours() {
    const storedTours = localStorage.getItem("tours");
    return storedTours ? JSON.parse(storedTours) : [];
}

function saveTours(tours) {
    localStorage.setItem("tours", JSON.stringify(tours));
}

let tours = loadTours();


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

        row.addEventListener("click", () => {
            prikaziDetaljeTure(tour);
        });


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

function handleForSubmission(event) {
    event.preventDefault();

    const form = document.querySelector("#add-tour-form");
    const formData = new FormData(form);

    const name = formData.get("tour-name");
    const length = formData.get("tour-length");
    const description = formData.get("tour-description");
    const tags = formData.getAll("tags");

    const newTour = new Tour(name, description, length, tags);
    tours.push(newTour);

    saveTours(tours);

    renderujTure();

    form.reset();
}


function addTagField() {
    const tagContainer = document.querySelector("#tagContainer");

    const tagDiv = document.createElement("div");
    tagDiv.classList.add("tag-input");

    const input = document.createElement("input");
    input.type = "text";
    input.name = "tags";
    input.placeholder = "Unesite tag";

    const removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.classList.add("remove-tag");
    removeButton.onclick = function () {
        tagContainer.removeChild(tagDiv);
    };

    tagDiv.appendChild(input);
    tagDiv.appendChild(removeButton);
    tagContainer.appendChild(tagDiv);
}


document.querySelector("#add-tour-form").addEventListener("submit", handleForSubmission)

renderujTure();