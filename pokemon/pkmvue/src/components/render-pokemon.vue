<script setup>
import { computed } from 'vue';


const props = defineProps({
  pokemon: {
    type: String,
    required: true
  }
});

const pokemonId = computed(() => {
  const parts = props.pokemon.url.split('/');
  return parseInt(parts[parts.length - 2], 10);
});

const pokemonImageUrl = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`;
});

</script>

<template>
  <div class="item">
    <div class="item__id">
      #{{ pokemonId }}
    </div>
    <div 
      class="item_image"
      :style="{ backgroundImage: `url('${pokemonImageUrl}')` }"
    ></div>
    <div class="item__name">
      {{ props.pokemon.name }}
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16.66%; /* Adjust as needed */
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

.item__id {
  /* Style as needed */
}

.item__name {
  /* Style as needed */
}
</style>