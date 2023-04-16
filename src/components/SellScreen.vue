<template>
    <div class="h-100-percent text-center">
        <v-container>
            <v-row>
                <v-col v-for="(drug, i) in drugList" :key="`${drug}-${i}`" cols="12" xs="12" sm="4" md="2" lg="2" xl="2"
                    xxl="2">
                    <div>
                        <span v-if="player.getCostBasis(drug) > 0 && player.getCostBasis(drug) < getPriceOfDrug(drug)">
                            <v-icon color="white">
                                mdi-star
                            </v-icon>
                        </span>
                        <span v-else-if="player.getCostBasis(drug) > 0 && player.getCostBasis(drug) > getPriceOfDrug(drug)">
                            <v-icon color="white">
                                mdi-close
                            </v-icon>
                        </span>
                        <span v-else>
                            <v-icon color="white">
                                mdi-circle-small
                            </v-icon>
                        </span>
                    </div>
                    <div>
                        <span>Price: ${{ getPriceOfDrug(drug) }}</span>

                    </div>
                    <div>Amount: {{ getDrugAmount(drug) }}</div>
                    <div>
                        <v-btn color="primary" width="100%" @click="drugClick(drug)" :disabled="(
                            drug === selectedDrug ||
                            getDrugAmount(drug) === 0
                        )" :class="{ 'btn-border': (selectedDrug === drug) }">
                            {{ drug }}
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <hr />
        <v-container>
            <div>Cash : {{ ToUsCurrency(playerMoney) }}</div>
            <div>Duffel Space : {{ spaceInDuffelBag }} / {{ maxDuffelBagCapacity }}</div>
            <div>Number of units to sell: {{ numberOfUnits }}</div>
            <div>
                <v-btn color="primary" @click="decreaseNumberOfUnits"
                    :disabled="numberOfUnits === 0 || selectedDrug === ''">-</v-btn>
                <v-btn color="primary" @click="increaseNumberOfUnits"
                    :disabled="selectedDrug === '' || getDrugAmount(selectedDrug) === numberOfUnits">+</v-btn>
                <v-btn color="primary" :disabled="(selectedDrug === '' || getDrugAmount(selectedDrug) === numberOfUnits)"
                    @click="setMax">MAX</v-btn>
            </div>
        </v-container>
        <hr />
        <v-container>
            <v-row>
                <v-col>
                    <CostBasis />
                </v-col>
                <v-col><v-btn color="primary" width="100%" :disabled="selectedDrug === '' || numberOfUnits === 0"
                        @click="sell">Sell</v-btn></v-col>
                <v-col><v-btn color="primary" width="100%" @click="cancel"
                        :disabled="selectedDrug === ''">Cancel</v-btn></v-col>
                <v-col><v-btn color="primary" width="100%" @click="gotoMainMenu">Main Menu</v-btn></v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="dialog" width="auto">
            <v-card>
                <v-container>
                    <v-card-text>
                        {{ actionResult }}
                    </v-card-text>
                </v-container>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false; actionResult = '';">Close Dialog</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Player from '@/classes/Player';
import DrugList from '@/static/DrugsList';
import PricesAtLocation from '@/classes/PricesAtLocation';
import Prices from '@/classes/Prices';
import ToUsCurrency from '@/utils/ToUsCurrency';
import { areYouBeingMugged, resultOfMugging } from '@/events/Mugged';
import RandomInt from '@/utils/RandomInt';
import CostBasis from '@/components/subcomponents/CostBasis.vue';

export default Vue.extend({
    name: 'SellScreen',
    components: {
        CostBasis,
    },
    data: () => ({
        drugList: DrugList,
        selectedDrug: '',
        numberOfUnits: 0,
        dialog: false,
        actionResult: '',
    }),
    computed: {
        player: function (): Player {
            return this.$store.state.player;
        },
        playerMoney: function (): number {
            return this.player.money;
        },
        spaceInDuffelBag: function (): number {
            return this.player.spaceInDuffelBag();
        },
        maxDuffelBagCapacity: function (): number {
            return this.player.maxDuffelBagCapacity;
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
    },
    methods: {
        gotoMainMenu: function (): void {
            this.$store.state.screen = 'main';
        },
        drugClick: function (drug: string): void {
            this.numberOfUnits = 0;
            this.selectedDrug = drug;
        },
        getDrugAmount: function (drug: string): number {
            return this.player.getDrugAmount(drug);
        },
        getPriceOfDrug: function (drug: string): number {
            return this.pricesInCurrentCity.getPriceOfDrug(drug);
        },
        increaseNumberOfUnits: function (): void {
            if (this.numberOfUnits < this.getDrugAmount(this.selectedDrug)) {
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
            this.numberOfUnits = this.getDrugAmount(this.selectedDrug);
        },
        sell: function (): void {
            this.player.sell(this.selectedDrug, this.numberOfUnits, this.getPriceOfDrug(this.selectedDrug));
            for (let i = 0; i < this.numberOfUnits; i += 1) {
                this.player.removeDrugFromCostBasis(this.selectedDrug);
            }
            this.selectedDrug = '';
            this.numberOfUnits = 0;
            if (areYouBeingMugged(RandomInt(0, 8))) {
                const player: Player = this.player;
                this.actionResult = resultOfMugging(player, Math.random());
                this.$store.state.player = player;
                this.dialog = true;
            }
        },
        ToUsCurrency,
    },
});
</script>

<style scoped></style>