<template>
    <div class="h-100-percent text-center">
        <v-container>
            <v-row>
                <v-col v-for="(drug, i) in drugList" :key="`${drug}-${i}`">
                    <div>${{ getPriceOfDrug(drug) }}</div>
                    <div>
                        <v-btn color="primary" width="100%" @click="drugClick(drug)" :disabled="(
                            drug === selectedDrug ||
                            getPriceOfDrug(drug) > playerMoney ||
                            spaceInDuffelBag === 0
                        )" :class="{ 'btn-border': (selectedDrug === drug) }">
                            {{ drug }}
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <hr />
        <v-container>
            <div>Cash : {{ toUsCurrency(playerMoney) }}</div>
            <div>Duffel Space : {{ spaceInDuffelBag }} / {{ maxDuffelBagCapacity }}</div>
            <div>Number of units to buy: {{ numberOfUnits }}</div>
            <div>
                <v-btn color="primary" @click="decreaseNumberOfUnits"
                    :disabled="numberOfUnits === 0 || selectedDrug === '' || spaceInDuffelBag === 0">-</v-btn>
                <v-btn color="primary" @click="increaseNumberOfUnits"
                    :disabled="selectedDrug === '' || getMax() === numberOfUnits || spaceInDuffelBag === 0">+</v-btn>
                <v-btn color="primary"
                    :disabled="(selectedDrug === '' || getMax() === numberOfUnits || spaceInDuffelBag === 0)"
                    @click="setMax">MAX</v-btn>
            </div>
        </v-container>
        <hr />
        <v-container>
            <v-row>
                <v-col><v-btn color="primary" width="100%" :disabled="selectedDrug === '' || numberOfUnits === 0"
                        @click="buy">Buy</v-btn></v-col>
                <v-col><v-btn color="primary" width="100%" @click="cancel"
                        :disabled="selectedDrug === ''">Cancel</v-btn></v-col>
                <v-col><v-btn color="primary" width="100%" @click="gotoMainMenu">Main Menu</v-btn></v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Player from '@/classes/Player';
import PricesAtLocation from '@/classes/PricesAtLocation';
import DrugList from '@/static/DrugsList';
import Prices from '@/classes/Prices';
import ToUsCurrency from '@/utils/ToUsCurrency';

export default Vue.extend({
    name: 'BuyScreen',
    data: () => ({
        drugList: DrugList,
        selectedDrug: '',
        numberOfUnits: 0,
    }),
    computed: {
        player: function (): Player {
            return this.$store.state.player;
        },
        playerMoney: function (): number {
            return this.player.money;
        },
        currentCity: function (): string {
            return this.player.currentArea;
        },
        pricesAtLocation: function (): PricesAtLocation {
            const pricesAtLocation: PricesAtLocation = this.$store.state.pricesAtLocation;
            return pricesAtLocation;
        },
        pricesInCurrentCity: function (): Prices {
            return this.pricesAtLocation.locations[this.currentCity];
        },
        spaceInDuffelBag: function (): number {
            return this.player.spaceInDuffelBag();
        },
        maxDuffelBagCapacity: function (): number {
            return this.player.maxDuffelBagCapacity;
        },
    },
    methods: {
        gotoMainMenu: function (): void {
            this.$store.state.screen = 'main';
        },
        drugClick: function (drug: string): void {
            this.numberOfUnits = 0;
            this.selectedDrug = drug;
        },
        getPriceOfDrug: function (drug: string): number {
            return this.pricesInCurrentCity.getPriceOfDrug(drug);
        },
        increaseNumberOfUnits: function (): void {
            if (this.numberOfUnits < this.getMax()) {
                this.numberOfUnits += 1;
            }
        },
        decreaseNumberOfUnits: function (): void {
            if (this.numberOfUnits > 0) {
                this.numberOfUnits -= 1;
            }
        },
        cancel: function (): void {
            this.selectedDrug = '';
            this.numberOfUnits = 0;
        },
        setMax: function (): void {
            this.numberOfUnits = (
                Math.floor(this.playerMoney / this.getPriceOfDrug(this.selectedDrug)) > this.spaceInDuffelBag ?
                    this.spaceInDuffelBag :
                    Math.floor(this.playerMoney / this.getPriceOfDrug(this.selectedDrug))
            );
        },
        getMax: function (): number {
            return (
                Math.floor(this.playerMoney / this.getPriceOfDrug(this.selectedDrug)) > this.spaceInDuffelBag ?
                    this.spaceInDuffelBag :
                    Math.floor(this.playerMoney / this.getPriceOfDrug(this.selectedDrug))
            );
        },
        buy: function (): void {
            this.player.buy(this.selectedDrug, this.numberOfUnits, this.getPriceOfDrug(this.selectedDrug));
            this.selectedDrug = '';
            this.numberOfUnits = 0;
        },
        toUsCurrency: function (dollars: number): string {
            return ToUsCurrency(dollars);
        },
    },
});
</script>

<style scoped>
</style>