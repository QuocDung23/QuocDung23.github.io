<script setup lang="js">
import { fetchAPI } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import BackHome from './input/BackHome.vue';
import EvolutionPokemon from './EvolutionPokemon.vue';


const route = useRoute();
const pokemonDetail = ref({});
const pokemonSpecies = ref({});

onMounted(() => {
  const name = route.params.name;
  fetchAPI(`https://pokeapi.co/api/v2/pokemon/${name}`).then((data) => {
    pokemonDetail.value = data;
    console.log('Check Pokemon Detail:', pokemonDetail.value)
  });
  fetchAPI(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then((data) => {
    pokemonSpecies.value = data;
    console.log('Check Pokemon Species:', pokemonSpecies.value)
  });
})
const getStatClass = (statName) => {
  const classMap = {
    hp: "stat_hp",
    attack: "stat_attack",
    defense: "stat_defense",
    "special-attack": "stat_special-attack",
    "special-defense": "stat_special-defense",
    speed: "stat_speed",
  };
  return classMap[statName] || "";
}

const getStatAbbreviation = (statName) => {
  const abbrMap = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SPA",
    "special-defense": "SPD",
    speed: "SPD",
  };
  return abbrMap[statName] || statName.toUpperCase();
};
</script>

<template>
  <BackHome/>
  <div class="container_detail" v-if="pokemonDetail.id">
    <div class="detail_image" :style="{
      backgroundImage: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetail.id}.png')`
    }"></div>
    <div class="type">
      <span v-for="type in pokemonDetail.types" :key="type.type.name" class="type_item" :class="type.type.name">
        {{ type.type.name }}
      </span>
    </div>
    <div class="detail__name">
      {{ pokemonDetail.name }}
    </div>
    <div v-if="pokemonSpecies.flavor_text_entries">
      <span>
        {{pokemonSpecies.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || "Nodescription available." }}
      </span>
    </div>
    <div class="detail_height_weight">
      <span class="detail_height">
        <div class="label">
          Height
        </div>
        <div class="detail-tag">
          {{ pokemonDetail.height }}
        </div>
      </span>
      <span class="detail_weight">
        <div class="label">Weight</div>
        <div class="detail-tag">{{ pokemonDetail.weight }}</div>
      </span>
    </div>
    <div class="detail_abilities">
      <div class="label">Abilities</div>
      <div class="abilities_child">
        <div v-for="(item, index) in pokemonDetail.abilities" :key="index" class="detail-tag">
          {{ item.ability.name }}
        </div>
      </div>
    </div>
    <div class="detail_stats">
      <div class="label">Stats</div>
      <div class="stats_container">
        <div v-for="(item, index) in pokemonDetail.stats" :key="index" class="stat_item">
          <div class="stat_label" :class="getStatClass(item.stat.name)">{{ getStatAbbreviation(item.stat.name) }}</div>
          <div class="stat_value">{{ item.base_stat }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Loading Pokemon Details.....</h1>
  </div>
  <EvolutionPokemon :pokemonName="pokemonDetail.name"/>
</template>

<style>
.container_detail {
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail_image {
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center;
}

.detail__name {
  font-size: 30px;
  text-transform: capitalize;
  font-weight: 600;
}

.detail_height_weight {
  display: flex;
  width: 250px;
  justify-content: space-between;
  margin-top: 10px;
}

.detail_height {
  font-weight: 600;
  text-align: center;
  margin-bottom: 5px;
}

.detail-tag {
  width: 100px;
  margin: 5px;
  padding: 2px;
  border-radius: 30px;
  background-color: #f6f8fc;
  text-align: center;
  text-transform: capitalize;
}

.label {
  text-align: center;
  font-weight: 500;
  margin-bottom: 5px;
}

.detail_abilities {
  width: 250px;
}

.abilities_child {
  display: flex;
  justify-content: space-between;
}

.detail_stats {
    width: 400px;
    margin-top: 20px;
}
.stats_container{
  display: flex;
  justify-content: space-around ;
}
.stat_item {
    width: 35px;
    margin: 5px;
    padding: 5px;
    text-align: center;
    background-color: #f6f8fc;
    border-radius: 30px;
    box-shadow: #63636333 0 2px 8px;
}
.stat_label {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 50px;
}
.stat_hp { background-color: #ff4c4c; }     
.stat_attack { background-color: #ff9c4c; } 
.stat_defense { background-color: #ffd700; } 
.stat_special-attack { background-color: #63b4ff; }
.stat_special-defense { background-color: #4cff87; }
.stat_speed { background-color: #ff6cd6; }
</style>