<template>
  <div class="margin_wrapper">
    <div class="wrapper">
        <header class="wrapper__header">Timetable</header>
        <nav class="wrapper__nav">
          <ul class="wrapper__nav__list">
            <li :class="{'active-tab': route.path === `/${TABS.LINES}`}" >
              <a @click.prevent="handleNavigate(TABS.LINES)" href="/">Bus Lines</a>
            </li>
            <li :class="{'active-tab': route.path === `/${TABS.STOPS}`}">
              <a @click.prevent="handleNavigate(TABS.STOPS)" href="/stops">Stops</a>
            </li>
          </ul>
        </nav>
      <RouterView/>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { useRoute } from "vue-router";

import { lineObject, TABS } from "@/type";
import store from "@/store";
import router from "@/router";

const route = useRoute();

// TODO add env variable
axios.get<lineObject[]>(`${process.env.VUE_APP_API_URL}/stops`).then(response => {
  store.commit("setApiData", response.data)
})

const handleNavigate = (tab: TABS) => {
  router.push({ path: `/${tab}` })
}
</script>
<style scoped lang="scss" >
 .margin_wrapper {
   background-color: #F3F4F9;
   width: 100%;
   min-height: 100vh;
   margin: 0;
   padding-top: 40px;
   padding-bottom: 40px;
 }

 .wrapper {
   margin-left: 32px;
   margin-right: 32px;
   height: 100%;
   background-color: #F3F4F9;

   &__header {
     line-height: 32px;
     font-size: 24px;
     font-weight: 600;
     color: #1A1A1A;
     padding: 4px 0 4px 0;
     margin-bottom: 16px;
   }

   &__nav {
     background-color: #FFFFFF;
     width: 100%;
     border-radius: 4px;
     margin-bottom: 20px;

     &__list {
       text-decoration: none;
       list-style-type: none;
       display: flex;
       height: 50px;
       column-gap: 10px;
       align-items: center;
     }

     &__list li {
       height: 100%;
       display: flex;
       align-items: center;
     }

     &__list a {
       text-decoration: none;
       color: #33373C;
       font-weight: 600;
       padding: 5px 10px 5px 10px;
     }
   }
 }

 .active-tab {
   border-bottom: 2px solid #1952E1
 }
</style>
