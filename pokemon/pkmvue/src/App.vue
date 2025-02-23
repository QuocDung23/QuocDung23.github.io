<script setup>
import { computed, ref } from "vue";
import RenderPokemon from "./components/render-pokemon.vue";
import PokemonDetail from "./components/PokemonDetail.vue";
import { fetchAPI } from "./utils";

// POKEMON LIST
let pokemon = [];
const offset = ref(0);
const numberOfRender = 15;

const filteredPokemon = ref([]);
const renderPokemon = computed(() => {
  const result = filteredPokemon.value.slice(0, offset.value + numberOfRender);

  const fetch = result.map((p) => fetchAPI(p.url));
  console.log(fetch);

  return result;
});

fetchAPI()

async function getPokemon() {
  const data = await fetchAPI("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898");
  pokemon = data.results;
  filteredPokemon.value = pokemon;
}

function handleLoadMore() {
  offset.value += numberOfRender;
}

function handleSearch(event) {
  filteredPokemon.value = pokemon.filter((pokemon) => {
    return pokemon.name.includes(event.target.value);
  });
  offset.value = 0;
}
getPokemon();

// SELECT POKEMON
const selectedPokemon = ref(null);

function handleSelectPokemon(pokemonData) {
  selectedPokemon.value = pokemonData
}

function handleBack() {
  selectedPokemon.value = null
}
</script>

<template>
  <div class="container">
    <PokemonDetail v-if="selectedPokemon" :pokemon="selectedPokemon" @back="handleBack" />
    <template v-else>
      <!-- Title -->
      <div class="title">
        <p class="title__main">Pokemon API</p>
        <input
          class="title__input"
          type="text"
          placeholder="Search some Pokemon..."
          @input="handleSearch"
        />
      </div>
      <div class="items">
        <RenderPokemon
          v-for="pokemon in renderPokemon"
          :key="pokemon"
          :url="pokemon.url"
          @select-pokemon="handleSelectPokemon"
        />
      </div>
      <button
        v-if="renderPokemon.length < filteredPokemon.length"
        class="btn"
        @click="handleLoadMore"
      >
        LOAD MORE
      </button>
    </template>
  </div>
</template>

<style scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


  .title {
    display: flex;
    flex-direction: column;
    justify-self: center; align-items: center;
    margin: 20px 0px;
  }
  .title__main {
    font-size: 50px;
  }
  .title__input {
    width: 450px;
    height: 50px;
    border-radius: 99px;
}


  .items {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
    .item:hover {
      box-shadow: #e9e9ed33 0 7px 29px;
      transition: 0.3s;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 16.66%;
      padding: 50px 5px;
      cursor: pointer;
      border-radius: 10px;
      box-shadow: #0c0707 0 7px 29px;
      background-color: rgb(136, 42, 42);
      text-transform: capitalize;
      transition: 0.3s;
    }

    .item_image {
      width: 100px; /* Adjust size */
      height: 100px;
      background-size: cover;
      background-position: center;
    }
  

  .btn {
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
  }

</style>
