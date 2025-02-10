function getImage (id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}



function renderPokemon (ImgPokemon) {
    const wrapper = document.querySelector("#wrapper")
    
    ImgPokemon.results.forEach( ({name, url}) => {
        const id = url.split("/").filter(Boolean).pop();
        //Create element a
        const pokemonCard = document.createElement("a");
        pokemonCard.classList.add("pokemon_card");
        //Create element H3
        const pokemonName = document.createElement("h3");
        pokemonName.innerText = name;
        pokemonName.classList.add("pokemon_name");
        //Create element Img
        const pokemonImg = document.createElement("img");
        pokemonImg.src = getImage(id);
        pokemonImg.alt = name;
        pokemonImg.loading = "lazy";
        pokemonImg.classList.add("pokemon_img");

        // Creat element div
        const pokemonId = document.createElement("div");
        pokemonId.innerText = `#${id}`;
        pokemonId.classList.add("pokemon_stt");


        pokemonCard.appendChild(pokemonId);
        pokemonCard.appendChild(pokemonImg);
        pokemonCard.appendChild(pokemonName);

        wrapper.appendChild(pokemonCard);

    });
}


