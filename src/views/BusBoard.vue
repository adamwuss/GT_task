<template>
  <div class="bus_lines_board">
    <header class="bus_lines_board__header">
      Select Bus Line
    </header>
    <div class="bus_lines_board__content">
      <div class="bus_lines_board__box">
        <div
          v-for="item in lines"
          :key="item"
          :class="[item == currLineID && 'active-badge']"
          class="bus_line_badge"
          @click="checkLine(item)"
        >
          {{item}}
        </div>
      </div>
    </div>
  </div>
  <div class="bus_container">
    <bus-lines
      :line="currLineID"
      :times="currTimes"
      :stops="currLines"
      :curr-stop="currStop"
      @update:stop="(stop: string) => checkStop(stop)"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

import store from "@/store";
import { lineObject } from "@/type";

import BusLines from "@/components/BusLines.vue";

const lines = computed(() => {
  return [... new Set(store.getters.getApiData.map((obj : lineObject) => obj.line).sort())]
})

const currLines = ref<string[]>([])
const currLineID = ref<number | null>(null)
const currTimes = ref<string[]>([])
const stops = ref<string[]>([])
const currStop = ref<string>("")
const checkLine = (id: number) => {
  let temp = store.getters.getApiData.filter((obj: lineObject) => obj.line == id)
  currLines.value = [...new Set(temp.map((obj: lineObject) => obj.stop))] as string[]
  currLineID.value = id
  currTimes.value = []
}

const checkStop = (stop: string) => {
  currTimes.value = store.getters.getApiData.filter((obj: lineObject) => obj.line == currLineID.value && obj.stop == stop).map((obj: lineObject) => obj.time)
  currStop.value = stop
}
</script>
<style scoped lang="scss">
.bus_lines_board {
  background-color: #FFFFFF;
  border-radius: 4px;

  &__header{
    line-height: 24px;
    font-size: 18px;
    font-weight: 600;
    width: 100%;
    color: #1A1A1A;
    padding: 24px 24px 8px 24px;
  }

  &__content{
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    gap: 10px;
    margin-bottom: 16px;
  }

  &__box{
    margin: 20px 20px 20px 20px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px,100px));
    grid-auto-columns: 0;
    justify-content: center;
    flex-wrap: wrap;
    color: #FFFFFF;
    gap: 10px;

  }
}

.bus_line_badge{
  text-align: center;
  background-color: #1952E1;
  border-radius: 4px;
  padding: 8px 0 8px 0;
  cursor: pointer;
}

.bus_container {
  width: 100%;
  background-color: #F3F4F9;
  min-height: 300px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
}

.active-badge {
  background: #2E3E6E;
}
</style>
