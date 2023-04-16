<template>
  <div class="text-center h-100-perecent">
    <v-container ref="main-screen-first-element" class="px-0">
      <div>
        <v-container class="text-h5 py-0">
          <div><v-tooltip bottom width="100%" v-model="showTooltip">
              <template v-slot:activator="{ on, attrs }">
                <v-icon :color="(getActionsInLocation(currentCity).length > 0) ? 'primary' : 'white'" class="c-pointer"
                  v-on="on" v-bind="attrs" @click="showTooltip = !showTooltip">
                  mdi-information
                </v-icon>
              </template>
              <div class="w-100-percent" v-if="getActionsInLocation(currentCity).length === 0">
                No new events at this location.
              </div>
              <div class="w-100-percent" v-else>
                <div v-for="(action, i) in removeDuplicatesFromArray(getActionsInLocation(currentCity))"
                  :key="`${action}-${i}-${currentCity}`">
                  <div>{{ action }}</div>
                  <hr />
                </div>
              </div>
            </v-tooltip></div>
          <div>{{ currentCity }}, Alabama's Prices</div>
        </v-container>
        <v-row>
          <v-col>
            <div>Heroin</div>
            <div>${{ heroinPrice }}</div>
          </v-col>
          <v-col>
            <div>Cocaine</div>
            <div>${{ cocainePrice }}</div>
          </v-col>
          <v-col>
            <div>Ecstasy</div>
            <div>${{ ecstasyPrice }}</div>
          </v-col>
          <v-col>
            <div>Acid</div>
            <div>${{ acidPrice }}</div>
          </v-col>
          <v-col>
            <div>Weed</div>
            <div>${{ weedPrice }}</div>
          </v-col>
          <v-col>
            <div>Xanax</div>
            <div>${{ xanaxPrice }}</div>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <hr />
    <v-container class="px-0">
      <v-container class="text-h5 py-0">Items in Duffel Bag</v-container>
      <v-row>
        <v-col>
          <div>Heroin</div>
          <div>{{ heroinAmount }}</div>
        </v-col>
        <v-col>
          <div>Cocaine</div>
          <div>{{ cocaineAmount }}</div>
        </v-col>
        <v-col>
          <div>Ecstasy</div>
          <div>{{ ecstasyAmount }}</div>
        </v-col>
        <v-col>
          <div>Acid</div>
          <div>{{ acidAmount }}</div>
        </v-col>
        <v-col>
          <div>Weed</div>
          <div>{{ weedAmount }}</div>
        </v-col>
        <v-col>
          <div>Xanax</div>
          <div>{{ xanaxAmount }}</div>
        </v-col>
      </v-row>
    </v-container>
    <hr />
    <v-container class="px-0">
      <v-container class="text-h5 py-0">Assets</v-container>
      <v-row>
        <v-col>
          <div>Health</div>
          <div>{{ health }}</div>
        </v-col>
        <v-col>
          <div>Day</div>
          <div>{{ 30 - daysRemaining + 1 }}</div>
        </v-col>
        <v-col>
          <div>Space</div>
          <div>{{ spaceInDuffelBag }}</div>
        </v-col>
        <v-col>
          <div>Guns</div>
          <div>{{ numberOfGuns }}</div>
        </v-col>
        <v-col>
          <div>Debt</div>
          <div>${{ debt }}</div>
        </v-col>
        <v-col>
          <div>Cash</div>
          <div>${{ playerMoney }}</div>
        </v-col>
      </v-row>
    </v-container>
    <hr />
    <v-container class="px-0">
      <v-row>
        <v-col cols="12" xs="12" sm="4" md="4" lg="2" xl="2" xxl="2">
          <v-btn color="primary" width="100%" @click="buyGun" :disabled="playerMoney < gunPrice || numberOfGuns > 0">
            Buy Gun — {{ toUsCurrency(gunPrice) }}
          </v-btn>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="2" xl="2" xxl="2">
          <v-btn color="primary" width="100%" @click="goToScreen('loan')">
            Visit Loan Shark
          </v-btn>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="2" xl="2" xxl="2">
          <v-btn color="primary" width="100%" @click="goToScreen('bank')">
            Visit Bank
          </v-btn>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="2" xl="2" xxl="2"><v-btn color="primary" width="100%"
            @click="goToScreen('buy')" :disabled="spaceInDuffelBag === 0">Buy
            Drugs</v-btn></v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="2" xl="2" xxl="2"><v-btn color="primary" width="100%"
            @click="goToScreen('sell')" :disabled="spaceInDuffelBag === maxDuffelBagCapacity">Sell Drugs</v-btn></v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="2" xl="2" xxl="2"><v-btn color="primary" width="100%"
            @click="goToScreen('locations')">Change Location</v-btn></v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-container v-for="(message, i) in mainMenuMessages" :key="`mainMenuMessages-${i}`">
          <v-card-text>
            {{ message }}
          </v-card-text>
        </v-container>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false; $store.state.mainMenuMessages = [];">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Player from '@/classes/Player';
import PricesAtLocation from '@/classes/PricesAtLocation';
import RandomInt from '@/utils/RandomInt';
import ToUsCurrency from '@/utils/ToUsCurrency';

export default Vue.extend({
  name: 'MainScreen',
  mounted: function (): void {
    // this.scrollToElement("main-screen-first-element");
    this.gunPrice = RandomInt(662, 1853);
    if (this.mainMenuMessages.length > 0) {
      this.dialog = true;
    }
  },
  data: () => ({
    dialog: false,
    gunPrice: RandomInt(662, 1853),
    showTooltip: false,
  }),
  computed: {
    player: function (): Player {
      const player: Player = this.$store.state.player;
      return player;
    },
    health: function (): number {
      return this.player.health;
    },
    daysRemaining: function (): number {
      return this.player.daysRemaining;
    },
    playerMoney: function (): number {
      return this.player.money;
    },
    debt: function (): number {
      return this.player.shark.balance;
    },
    bankAmount: function (): number {
      return this.player.bank.balance;
    },
    numberOfGuns: function (): number {
      return this.player.guns;
    },
    heroinAmount: function (): number {
      return this.player.getDrugAmount('heroin');
    },
    cocaineAmount: function (): number {
      return this.player.getDrugAmount('cocaine');
    },
    ecstasyAmount: function (): number {
      return this.player.getDrugAmount('ecstasy');
    },
    acidAmount: function (): number {
      return this.player.getDrugAmount('acid');
    },
    weedAmount: function (): number {
      return this.player.getDrugAmount('weed');
    },
    xanaxAmount: function (): number {
      return this.player.getDrugAmount('xanax');
    },
    currentCity: function (): string {
      return this.player.currentArea;
    },
    spaceInDuffelBag: function (): number {
      return this.player.spaceInDuffelBag();
    },
    maxDuffelBagCapacity: function (): number {
      return this.player.maxDuffelBagCapacity;
    },
    pricesAtLocation: function (): PricesAtLocation {
      const pricesAtLocation: PricesAtLocation = this.$store.state.pricesAtLocation;
      return pricesAtLocation;
    },
    heroinPrice: function (): number {
      return this.pricesAtLocation.locations[this.currentCity].heroin;
    },
    cocainePrice: function (): number {
      return this.pricesAtLocation.locations[this.currentCity].cocaine;
    },
    ecstasyPrice: function (): number {
      return this.pricesAtLocation.locations[this.currentCity].ecstasy;
    },
    acidPrice: function (): number {
      return this.pricesAtLocation.locations[this.currentCity].acid;
    },
    weedPrice: function (): number {
      return this.pricesAtLocation.locations[this.currentCity].weed;
    },
    xanaxPrice: function (): number {
      return this.pricesAtLocation.locations[this.currentCity].xanax;
    },
    mainMenuMessages: function (): string[] {
      return this.$store.state.mainMenuMessages;
    },
  },
  methods: {
    scrollToElement(refId: string) {
      const el: any = this.$refs[refId];
      if (
        el &&
        el.scrollIntoView &&
        typeof el.scrollIntoView === 'function'
      ) {
        el.scrollIntoView({ behavior: 'auto', block: 'center' })
      }
    },
    getActionsInLocation(location: string): string[] {
      return this.pricesAtLocation.locations[location].actions;
    },
    removeDuplicatesFromArray: function (array: string[]): string[] {
      return [...new Set(array)];
    },
    goToScreen: function (screen: string): void {
      this.$store.state.screen = screen;
    },
    toUsCurrency: function (dollars: number): string {
      return ToUsCurrency(dollars);
    },
    buyGun: function (): void {
      if (this.player.money >= this.gunPrice && this.numberOfGuns === 0) {
        this.player.guns += 1;
        this.player.money -= this.gunPrice;
        this.gunPrice = RandomInt(662, 1853);
      }
    },
  },
})
</script>

<style scoped></style>