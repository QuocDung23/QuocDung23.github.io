<script setup>
import { ref } from 'vue';

 const enterHeight = ref('');
 const enterWidth = ref('');
 const enterColor = ref('');
 const outPut  = ref(false);

 const renderOutput = () => {
    if (!enterHeight.value || !enterWidth.value || !enterColor.value){
      alert ('Missing Iformation');
    }else {
      outPut.value = true;
    }
 };

 const cleaInfo = () => {
  if (enterHeight.value > 0 || enterWidth.value > 0){
    enterColor.value = '';
    enterWidth.value = '';
    enterHeight.value = '';
    outPut.value = false;
};
}

</script>

<template>
      <input type="number" placeholder="Enter Length" v-model="enterHeight" >
      <input type="number" placeholder="Enter Width" v-model="enterWidth" >
      <input type="text" placeholder="Enter Color" v-model="enterColor" >
      <button @click="renderOutput" >Submit</button>
      <div
      v-if="outPut" 
      @click="cleaInfo" 
      :style="{ backgroundColor: enterColor, width: enterWidth + 'px', height: enterHeight + 'px' }"
      >
      </div>
</template>

