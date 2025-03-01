<script setup lang="js">
import { fetchAPI } from '@/utils';
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  pokemonName: String // Nhận tên Pokémon từ component cha
});

const evolutionChain = ref([]);

const extractPokemonId = (url) => {
  return url.split("/").slice(-2, -1)[0];
};

const parseEvolutionChain = (chain) => {
  let evolutions = [];

  const traverseEvolution = (node) => {
    if (!node) return;
    
    const pokemonName = node.species.name;
    const pokemonId = extractPokemonId(node.species.url);
    evolutions.push({
      name: pokemonName,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
    });
    
    node.evolves_to.forEach(traverseEvolution);
  };

  traverseEvolution(chain);
  evolutionChain.value = evolutions;
};

const fetchEvolutionData = async () => {
  if (!props.pokemonName) return;

  try {
    const speciesData = await fetchAPI(`https://pokeapi.co/api/v2/pokemon-species/${props.pokemonName}`);
    const evolutionChainUrl = speciesData.evolution_chain.url;

    const evolutionData = await fetchAPI(evolutionChainUrl);
    parseEvolutionChain(evolutionData.chain);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu tiến hóa:", error);
  }
};

onMounted(fetchEvolutionData);

watch(() => props.pokemonName, fetchEvolutionData);
</script>

<template>
  <div v-if="evolutionChain.length" class="evolution-container">
    <h3>Evolution</h3>
    <div class="evolution-list">
      <div v-for="(evolution, index) in evolutionChain" :key="index" class="evolution-item">
        <p>{{ evolution.name }}</p>
        <img :src="evolution.image" :alt="evolution.name" />
        <span v-if="index < evolutionChain.length - 1" class="arrow">&gt;</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.evolution-container {
  margin-top: 20px;
  text-align: center;
}

.evolution-list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.evolution-item {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.evolution-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.evolution-item p {
  font-size: 16px;
  font-weight: bold;
  text-transform: capitalize;
}

.arrow {
  font-size: 24px;
  font-weight: bold;
}
</style>
