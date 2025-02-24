<script setup lang="js">

const props = defineProps (['pokemon'])
console.log("pokemon",props.pokemon);

defineEmits("back");
</script>

<template>
  <button @click="$emit('back')">&larr;Back</button>
    <div>
      <div class="item__id">#{{ pokemon.species.id }}</div>
    <div
      class="item_image"
      :style="{
        backgroundImage: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.species.id}.png')`
      }"
    ></div>
    <div class="item__name">
      {{ pokemon.species.name }}
    </div>
    <div class="type">
      <span
        v-for="type in pokemon.evo.types"
        :key="type.type.name"
        class="type_item"
        :class="type.type.name"
      >
        {{ type.type.name }}
      </span>
      <span v-for="weigh in pokemon.species.weigh" :key="weigh.weigh.name">
        {{ weigh.weigh.name }}
      </span>
      <span v-if="pokemon.species.flavor_text_entries[0]" >
        {{ pokemon.species.flavor_text_entries[0].flavor_text }}
      </span>
    </div>
    </div>
</template>

<style>

.item_image {
      width: 100px;
      height: 100px;
      background-size: cover;
      background-position: center;
    }
</style>