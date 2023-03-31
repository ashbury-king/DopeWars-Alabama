<template>
  <div class="h-100-percent text-center c-pointer" @click="restartGame">
    <v-container class="text-h5">Game Over</v-container>
    <v-container v-if="player.health <= 0" class="text-h5">You died!</v-container>
    <hr />
    <v-container>Cash — {{ toUsCurrency(cash) }}</v-container>
    <v-container>Debt — {{ toUsCurrency(debt) }}</v-container>
    <v-container>Total Assests — {{ toUsCurrency(assets) }}</v-container>
    <hr />
    <v-container>Score — {{ score }} / 100</v-container>
    <v-container>Rank — {{ rank }}</v-container>
    <hr />
    <v-container>Click to restart game</v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Player from '@/classes/Player';
import PricesAtLocation from '@/classes/PricesAtLocation';
import ToUsCurrency from '@/utils/ToUsCurrency';

export default Vue.extend({
  name: 'GameOverScreen',
  computed: {
    player: function (): Player {
      return this.$store.state.player;
    },
    cash: function (): number {
      return this.player.money + this.player.bank.balance;
    },
    debt: function (): number {
      return this.player.shark.balance;
    },
    assets: function (): number {
      return this.cash - this.debt
    },
    score: function (): number {
      return Math.floor(this.assets / 10000000 * 100);
    },
    rank: function (): string {
      const { score } = this;
      if (score <= 30) return 'Small Time Pusha'
      if (score >= 31 && score <= 50) return 'Own The Block... NOT BAD';
      if (score >= 51 && score <= 75) return 'Run The Town... PRETTY GOOD';
      if (score >= 76 && score <= 99) return 'Kingpin... GOD DAMN';
      return 'PABLO ESCOBAR... YOU ARE A GOD';
    }
  },
  methods: {
    toUsCurrency: function (dollars: number): string {
      return ToUsCurrency(dollars);
    },
    restartGame: function (): void {
      this.$store.state.screen = 'title';
      const player: Player = new Player();
      const pricesAtLocation = new PricesAtLocation(player);
      const mainMenuMessages: string[] = [];

      this.$store.state.player = player;
      this.$store.state.pricesAtLocation = pricesAtLocation;
      this.$store.state.mainMenuMessages = mainMenuMessages;
    },
  },
});
</script>

<style scoped></style>