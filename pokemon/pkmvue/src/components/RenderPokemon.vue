<script setup>
import { fetchAPI } from "@/utils";
import { ref } from "vue";
import { useRouter } from "vue-router";


const router = useRouter();
const props = defineProps(["name", "url"]);
console.log("Check data", props.name)

console.log("Check URL", props.url)

defineEmits("select-pokemon");

const pokemonSpecies = ref({});
const pokemonSection = ref({});

fetchAPI(`https://pokeapi.co/api/v2/pokemon-species/${props.name}`).then((data) => {
  pokemonSpecies.value = data;
});


fetchAPI(props.url).then((data) => {
  pokemonSection.value = data;
});

function viewPokemonDetail() {
  sessionStorage.setItem('selectdPokemon', JSON.stringify(pokemonSpecies.value))
  router.push('/pokemon/' + pokemonSpecies.value.name)
}
</script>

<template>
  <div>
    <div class="item" @click="viewPokemonDetail">
    <div class="item__id" v-if="pokemonSection.id">#{{ pokemonSection.id }}</div>
    <div class="item_image"
    :style="{
        backgroundImage: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonSection.id}.png')`
      }">
    </div>
    <div class="item__name">
      {{ pokemonSection.name }}
    </div>
    <div class="type">
      <span v-for="type in pokemonSection.types" :key="type.type.name" class="type_item" :class="type.type.name">
        {{ type.type.name }}
      </span>
    </div>
  </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  height: 250px;
  cursor: pointer;
  border-radius: 10px;
  text-transform: capitalize;
  transition: 0.3s;
}

.item:hover {
  transition: 0.3s;
}

.item_image {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
}
</style>
