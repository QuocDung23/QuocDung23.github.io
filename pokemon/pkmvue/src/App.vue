<script setup>
import { computed, ref } from 'vue';
import RenderPokemon from './components/render-pokemon.vue';

let pokemons = [];
const offset = ref(0);
const numberOfRender = 12;

const filteredPokemons = ref([]);
const renderPokemons = computed(() => {
  const result = filteredPokemons.value.slice(0, offset.value + numberOfRender)

  const fetch = result.map(p => fetchAPI(p.url))
  console.log(fetch)

  return result
})


const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getPokemon() {
    const data = await fetchAPI('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898');
    pokemons = data.results;
    filteredPokemons.value = pokemons;

  
}


function handleLoadMore() {
  offset.value += numberOfRender;
}

function handleSearch(event) {
  filteredPokemons.value = pokemons.filter((pokemon) => {
    return pokemon.name.includes(event.target.value);
  });
  offset.value = 0; 
}

getPokemon();
</script>

<template>
  <div class="root">
    <div class="container">
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
          v-for="(item, index) in renderPokemons" :key="index"
          :pokemon="item"
          />        
      </div>
      <button v-if="renderPokemons.length < filteredPokemons.length" class="btn" @click="handleLoadMore">
        LOAD MORE
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .search__bar {
      max-width: 500px;
      width: 100%;
      margin: 0 15px 50px;
      .search {
        width: 100%;
        padding: 20px;
        border: none;
        border-radius: 30px;
        outline: 1px solid #00000036;
        box-shadow: #64646f33 0 7px 29px;
        font-size: 16px;
        transition: all 0.2s ease;
      }
    }
  }

  .items {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 16.66%;
      padding: 50px 5px;
      cursor: pointer;
      border-radius: 10px;
      box-shadow: #f4f4f4 0 7px 29px;
      text-transform: capitalize;
      transition: 0.3s;
    }

    .item:hover {
      box-shadow: #39393f33 0 7px 29px;
      transition: 0.3s;
    }

    .item_image {
      width: 100px; /* Adjust size */
      height: 100px;
      background-size: cover;
      background-position: center;
    }
  }

  .btn {
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>
