<template>
  <div class="stop-container">
    <div class="search-section">
      <div class="input-wrapper">
        <input v-model="filterModel" type="text"/>
        <img @click="filterValue = filterModel" width="14" height="14" src="../../public/Icon.svg"/>
      </div>
    </div>
    <ul class="container_ul">
      <li v-for="(stop,index) in getStops" :key="index">{{stop}}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

import store from "@/store";
import { lineObject } from "@/type";

const stops = computed(() => [...new Set(store.getters.getApiData
  .map((obj: lineObject) => (obj.stop)))]
  .sort() as string[])

const getStops = computed(() =>stops.value
  .filter((stop: string) => stop.toLowerCase().includes(filterValue.value.toLowerCase())));

const filterModel = ref("");
const filterValue = ref("");
</script>
<style scoped lang="scss">
.stop-container {
  width: 100%;
  border-radius: 4px;
  background-color: #FFFFFF;
}

.search-section {
  width: 100%;
  padding: 10px 0 10px 0;
  display: flex;
}

.search-section .input-wrapper {
  margin-left: 15px;
  font-size: 12px;
  padding: 5px 12px 5px 3px;
  border: 1px solid #1952E1;
  border-radius: 4px;
}

.search-section img:hover {
  cursor: pointer;
}

.search-section input {
  outline: none;
  border: none;
  padding-left: 10px;
  min-width: 200px;
}

.container_ul {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px 15px 10px 15px;
  border-top: 1px solid #E2E4EA;
}

.container_ul li {
  width: 100%;
  padding: 20px 15px 10px 15px;
  list-style-type: none;
}
</style>
