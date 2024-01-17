<template>
  <div class="bus_line" :class="[!stops.length && 'dashed-border']">
    <div class="list" v-if="stops.length">
      <header class="header">
        Bus Line: {{ line }}
      </header>
      <div class="nav-container">
        <div class="flex-container ">
          <p class="nav-header">Bus Stops</p>
          <div class="arrow-wrapper">
            <div class="arrow-up" />
            <div class="arrow-down" />
          </div>
        </div>
        <ul class="container_ul">
          <li
            v-for="stop in stops"
            :key="stop"
            class="cursor-pointer"
            @click="$emit('update:stop', stop)"
          >
            {{stop}}
          </li>
        </ul>
      </div>
    </div>
    <p v-else >Please select the bus line first</p>
  </div>
  <div class="bus_stop" :class="[!stops.length && 'dashed-border']">
    <div class="list" v-if="times.length">
      <header class="header">
        Bus Stop: {{ currStop }}
      </header>
      <div class="nav-container">
        <p class="nav-header">Times:</p>
        <div class="flex-container">
          <ul class="container_ul">
            <li
              v-for="(time,index) in getTimes"
              :key="index"
            >
              {{ time }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p v-if="!times?.length">Please select the bus line first</p>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

defineEmits<{
  (e: 'update:stop',stop: string): void
}>()

const props = defineProps<{
  stops: string[],
  times: string[],
  line: number | null,
  currStop: string,
}>()

const getTimes = computed(() => props.times.slice().sort())
</script>

<style scoped lang="scss">
.header {
  font-size: 17px;
  font-weight: 600;
  padding: 20px 15px 10px 15px;
  width: 100%;
}

.list-nav-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
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

.nav-header {
  font-size: 14px;
  font-weight: 600;
  padding: 10px 5px 10px 15px;
  margin: 0;
  color: #33373C;
}

.arrow-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  row-gap: 2px;
}

.bus_line,
.bus_stop {
  width: calc(50% - 10px);
  min-height: 300px;
  min-width: 300px;
  background-color: #FFFFFF;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 1;
}

.list {
  width: 100%;
  height: 100%;
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 4px solid #9A9DA4;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 4px solid #9A9DA4;
}

.cursor-pointer {
  cursor: pointer;
}

.flex-container {
  display: flex;
  width: 100%;
}

.dashed-border {
  border: 2px dashed #9A9DA4;
}
</style>
