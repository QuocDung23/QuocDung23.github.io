<script setup>
import { fetchAPI } from "@/utils";
import { ref } from "vue";

const props = defineProps(["url"]);

defineEmits("select-pokemon");

const pokemon = ref({});

fetchAPI(props.url).then((data) => {
  pokemon.value = data;
});
</script>

<template>
  <div class="item" @click="$emit('select-pokemon', pokemon)">
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
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
  padding: 50px 5px;
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
  /* Adjust size */
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
.type {
  display: flex;
}
.type_item {
  padding: 5px 5px;
  border-radius: 10px;
}
.normal{
    background-color: #a8a77a
}

.flying {
    background-color: #a98ff3
}

.poison {
    background-color: #a33ea1
}

.ground {
    background-color: #e2bf65
}

.rock {
    background-color: #b6a136
}

.bug {
    background-color: #a6b91a
}

.ghost {
    background-color: #735797
}

.steel {
    background-color: #b7b7ce
}

.fire {
    background-color: #ff421c
}

.water {
    background-color: #6390f0
}

.grass {
    background-color: #78cd54
}

.electric {
    background-color: #f7d02c
}

.psychic {
    background-color: #f95587
}

.ice {
    background-color: #96d9d6
}

.dragon {
    background-color: #6f35fc
}

.dark {
    background-color: #705746
}

.fairy {
    background-color: #d685ad
}

.unknow {
    background-color: #68a090
}

.shadow {
    background-color: #735797
}
</style>
