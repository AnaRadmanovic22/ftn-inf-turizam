'use strict'
class Restaurant{
    constructor(name, description, cuisineType = []){
        this.name = name;
        this.description = description;
        this.cuisineType = cuisineType;
    }
}

let restaurants = []

function createRestaurantRows(){
    let table = document.querySelector("#restaurant-overview-body");
    table.innerHTML = '';

    for(let i = 0; i < restaurants.length; i++){
        
        let tr = document.createElement('tr');

        tr.addEventListener('click', function(){
            displayRestaurantDetails(restaurants[i])
        })

        let name = document.createElement('td');
        let cuisineType = document.createElement('td');

        name.textContent = restaurants[i].name;
        cuisineType.textContent = restaurants[i].cuisineType.join(", ");

        tr.appendChild(name);
        tr.appendChild(cuisineType);
        table.appendChild(tr);
    }
}

function displayRestaurantDetails(restaurant){
    let details = document.querySelector("#restaurant-details");

    let p = document.createElement('p');
    p.innerHTML = `${restaurant.name}<br>Tip kuhinje: ${restaurant.cuisineType.join(", ")}<br>
    Opis: ${restaurant.description}`;

    if(details.firstChild){
        details.firstChild.remove()
    }

    details.appendChild(p);

}

function formSubmission(){
    
    let submitBtn = document.querySelector('#submitBtn');
    submitBtn.addEventListener('click', function(){

        const form = document.querySelector('#newRestaurantForm');
        const formData = new FormData(form);

        const name = formData.get('name');
        const description = formData.get('description');
        const cuisines = formData.getAll('cuisines')

        const newRestaurant = new Restaurant(name, description, cuisines)

        restaurants.push(newRestaurant);
        localStorage.setItem("restaurants", JSON.stringify(restaurants))
        createRestaurantRows();
        form.reset();
    })
}

function addCuisineField(){

    const container = document.querySelector("#cuisineContainer");

    const newFieldDiv = document.createElement('div')
    newFieldDiv.className = "cuisine-input"

    const input = document.createElement('input')
    input.type = "text"
    input.name = "cuisines"
    input.placeholder = "Unesite tip kuhinje"
    input.required = true

    const removeBtn = document.createElement('button')
    removeBtn.type = "button"
    removeBtn.textContent = '-'

    removeBtn.addEventListener('click', function(){
       container.removeChild(newFieldDiv)
    })

   newFieldDiv.appendChild(input)
   newFieldDiv.appendChild(removeBtn)

   container.appendChild(newFieldDiv)
}

function initializeRestaurants(){
    const savedRestaurants = localStorage.getItem("restaurants");

    if(savedRestaurants){
        restaurants = JSON.parse(savedRestaurants)
    }else{
        restaurants = 
        [new Restaurant("Giardino", "Autentična italijanska kuhinja u centru grada.", ["italijanska"]),
        new Restaurant("Mali Pariz", "Francuski restoran sa romantičnom atmosferom.", ["francuska"]),
        new Restaurant("Zavičaj", "Tradicionalna srpska jela u etno ambijentu.", ["srpska", "balkanska"]),]
    }

    createRestaurantRows();
    formSubmission();
}
document.addEventListener('DOMContentLoaded', initializeRestaurants)