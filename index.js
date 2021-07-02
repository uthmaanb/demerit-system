let base_URL = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch a list of pokemon
function getPokemonList(url) {
  fetch(url)
    // Convert data from JSON
    .then((response) => response.json())
    //Stuff to do with data
    .then((data) => {
      // Console log to make sure I am getting the data
      console.log(data);
      // Get the list of pokemon from the results
      let pokemon = data.results;
      // Get element from HTML to write buttons in
      let container = document.querySelector(".pokemon-list-container");
      // Clear the container
      container.innerHTML = "";
      // Loop over pokemon list and create an HTML button for each one. Add the button to the container
      pokemon.forEach((btn) => {
        container.innerHTML += `<button class='pokebtn' onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>`;
      });
      // Add a next pokemon button
      container.innerHTML += `<br><br><button onclick="getPokemonList('${data.next}')">Next</button>`;
      // previous button
      container.innerHTML += `<br><br><button onclick="getPokemonList('${data.previous}')">Previous</button>`;
    });
}

// Get default pokemon list
getPokemonList(base_URL);

// Function to get information about a specific pokemin
function getPokemonInfo(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Make sure data comes through
      console.log(data);
      // Write data to pokemon information container
      document.querySelector(".pokemon-pic").innerHTML = `
    <img class='pic' src="${data.sprites.other["official-artwork"].front_default} ">`;
      document.querySelector(".pokemon-info").innerHTML = `
      <div>
      <h1>Name: ${data.name}</h1>
      <p>Type: ${data.types[0].type.name}</p>
      <p>Ailities: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}</p>
      <p>Height: ${data.height}</p>
      <p>Weight: ${data.weight}</p>
      </div>`;
    });
}
