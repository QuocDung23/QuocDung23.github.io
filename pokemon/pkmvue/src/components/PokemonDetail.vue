<script setup>
defineProps (['pokemon'])
console.log(['pokemon'])

defineEmits("back");
</script>

<template>
  <button @click="$emit('back')">&larr;Back</button>
    <div>
      <div class="item__id">#{{ pokemon.id }}</div>
    <div
      class="item_image"
      :style="{
        backgroundImage: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png')`
      }"
    ></div>
    <div class="item__name">
      {{ pokemon.name }}
    </div>
    <div class="type">
      <span
        v-for="type in pokemon.types"
        :key="type.type.name"
        class="type_item"
        :class="type.type.name"
      >
        {{ type.type.name }}
      </span>
      <span v-for="weigh in pokemon.weigh" :key="weigh.weigh.name">
        {{ weigh.weigh.name }}
      </span>
    </div>
    </div>
</template>

<style>

.item_image {
      width: 100px; /* Adjust size */
      height: 100px;
      background-size: cover;
      background-position: center;
    }
</style>