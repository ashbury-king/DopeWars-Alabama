<template>
  <div class="h-100-vh">
    <v-container class="gameplay-container h-100-percent overflow-auto">
      <TitleScreen v-if="$store.state.screen === 'title'" />
      <InstructionsScreen v-else-if="$store.state.screen === 'instructions'" />
      <DifficultyScreen v-else-if="$store.state.screen === 'difficulty'" />
      <MainScreen v-else-if="$store.state.screen === 'main'" />
      <LocationsScreen v-else-if="$store.state.screen === 'locations'" />
      <GameOverScreen v-else-if="$store.state.screen === 'game-over'" />
      <BuyScreen v-else-if="$store.state.screen === 'buy'" />
      <SellScreen v-else-if="$store.state.screen === 'sell'" />
      <LoanScreen v-else-if="$store.state.screen === 'loan'" />
      <DuffelBagScreen v-else-if="$store.state.screen === 'duffel'" />
      <CopsScreen v-else-if="$store.state.screen === 'cops'" />
      <BankScreen v-else-if="$store.state.screen === 'bank'" />
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TitleScreen from '@/components/TitleScreen.vue'
import InstructionsScreen from '@/components/InstructionsScreen.vue'
import DifficultyScreen from '@/components/DifficultyScreen.vue'
import MainScreen from '@/components/MainScreen.vue'
import LocationsScreen from '@/components/LocationsScreen.vue'
import GameOverScreen from '@/components/GameOverScreen.vue'
import BuyScreen from '@/components/BuyScreen.vue'
import SellScreen from '@/components/SellScreen.vue'
import LoanScreen from '@/components/LoanScreen.vue'
import DuffelBagScreen from '@/components/DuffelBagScreen.vue'
import CopsScreen from '@/components/CopsScreen.vue'
import BankScreen from '@/components/BankScreen.vue'

export default Vue.extend({
  name: 'HelloWorld',
  components: {
    TitleScreen,
    InstructionsScreen,
    DifficultyScreen,
    MainScreen,
    LocationsScreen,
    GameOverScreen,
    BuyScreen,
    SellScreen,
    LoanScreen,
    DuffelBagScreen,
    CopsScreen,
    BankScreen,
  },
});
</script>

<style scoped></style>
