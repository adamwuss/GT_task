import { createStore } from 'vuex'
import { lineObject } from "@/type";

interface Store {
  dataApi: lineObject[]
}

export default createStore<Store>({
  state: {
    dataApi: [],
  },
  getters: {
    getApiData(state){
      return state.dataApi
    }
  },
  mutations: {
    setApiData(state, data: lineObject[]){
      state.dataApi = data
    },
  },
})
