<script setup>
import { computed, ref } from "vue";
import RenderPokemon from "@/components/RenderPokemon.vue";
import { fetchAPI } from "@/utils/index.js";

// POKEMON LIST
let pokemon = [];
const offset = ref(0);
const numberOfRender = 30;

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

function handleSelectPokemon(pokemonSpecies, pokemonData) {
  selectedPokemon.value = { 
    species: pokemonSpecies, 
    evo: pokemonData 
  }
}


</script>

<template>
  <div class="container">
      <!-- Title -->
      <div class="title">
        <p class="title__main">Pokemon API</p>
        <input class="title__input" type="text" placeholder="Search some Pokemon..." @input="handleSearch" />
      </div>
      <div class="items">
        <RenderPokemon v-for="pokemon in renderPokemon" :key="pokemon" :name="pokemon.name" :url="pokemon.url"
          @select-pokemon="handleSelectPokemon" class="item"/>
      </div>
      <button v-if="renderPokemon.length < filteredPokemon.length" class="btn" @click="handleLoadMore">
        LOAD MORE
      </button>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px
}


.title {
  text-align: center;
  margin: 20px 0px;
}

.title__main {
  font-size: 50px;
}

.title__input {
  width: 450px;
  height: 50px;
  border-radius: 99px;
  padding-left: 20px;
}


.items {
 display: grid;
 grid-template-columns: repeat(6, 1fr);
 gap: 15px;
 width: 100%;
justify-content: center;
}

.item:hover {
  box-shadow: #47475033 0 7px 29px;
  transition: 0.3s;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-transform: capitalize;
  transition:  0.3s;
  cursor: pointer;
}

.item_image {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
}


.btn {
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  background-color: #ff4d4f;
  border: none;
  transition: 0.3s;
  border-radius: 20px;
}
.btn:hover {
  opacity: 0.5;
}
</style>
