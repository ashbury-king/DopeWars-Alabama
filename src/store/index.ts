import Vue from 'vue'
import Vuex from 'vuex'

import Player from '@/classes/Player';
import PricesAtLocation from '@/classes/PricesAtLocation';

const player: Player = new Player();
const pricesAtLocation = new PricesAtLocation(player);
const mainMenuMessages: string[] = [];

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screen: 'title',
    player,
    pricesAtLocation,
    mainMenuMessages,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
