<template>
    <div class="text-center h-100-percent">
        <v-container ref="locations-screen-first-element" class="text-h5">
            Change Location
        </v-container>
        <hr />
        <v-container>
            <v-row>
                <v-col v-for="(location, i) in Object.values(locationsEnum)" :key="`${i}-${location}`">
                    <v-container>
                        <v-tooltip bottom width="100%">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon :color="(getActionsInLocation(location).length > 0) ? 'primary' : 'white'"
                                    class="c-pointer" v-on="on" v-bind="attrs">
                                    mdi-information
                                </v-icon>
                            </template>
                            <div class="w-100-percent" v-if="getActionsInLocation(location).length === 0">
                                No new events at this location.
                            </div>
                            <div class="w-100-percent" v-else>
                                <div v-for="(action, i) in removeDuplicatesFromArray(getActionsInLocation(location))"
                                    :key="`${action}-${i}-${location}`">
                                    <div>{{ action }}</div>
                                    <hr />
                                </div>
                            </div>
                        </v-tooltip>
                    </v-container>
                    <v-container>
                        <v-btn color="primary" width="100%" @click="changeLocation(location)"
                            :disabled="currentCity === location">
                            {{ location }}
                        </v-btn>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
        <hr />
        <v-container>
            <v-row>
                <v-col>
                    <v-btn color="primary" width="100%" @click="cancel">Main Menu</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LocationsEnum from '@/enums/Locations';
import Player from '@/classes/Player';
import PricesAtLocation from '@/classes/PricesAtLocation';
import RandomInt from '@/utils/RandomInt';
import { areCopsChasing } from '@/events/CopsBustDeal';

export default Vue.extend({
    name: 'LocationsScreen',
    mounted: function (): void {
        // this.scrollToElement("locations-screen-first-element");
    },
    data: () => ({
        locationsEnum: LocationsEnum,
    }),
    computed: {
        player: function (): Player {
            const player: Player = this.$store.state.player;
            return player;
        },
        currentCity: function (): string {
            return this.player.currentArea;
        },
        pricesAtLocation: function (): PricesAtLocation {
            const pricesAtLocation: PricesAtLocation = this.$store.state.pricesAtLocation;
            return pricesAtLocation;
        }
    },
    methods: {
        cancel: function (): void {
            this.$store.state.screen = 'main';
        },
        changeLocation: function (location: string): void {
            this.player.currentArea = location;
            const actionsBeforeArray: string[] = this.pricesAtLocation.locations[location].actions;
            const actionsBeforeLength = actionsBeforeArray.length;
            this.pricesAtLocation.updateAllCityEvents();
            const actionsAfterArray: string[] = this.pricesAtLocation.locations[location].actions;
            const actionsAfterLength = actionsAfterArray.length;
            this.$store.state.mainMenuMessages = [];
            if (actionsAfterLength > actionsBeforeLength) {
                this.$store.state.mainMenuMessages = [actionsAfterArray[actionsAfterLength - 1]]
            }
            this.player.shark.addInterestToBalance();
            this.player.bank.addInterestToBalance();
            this.player.daysRemaining -= 1;
            if (this.player.daysRemaining === 0) this.$store.state.screen = 'game-over';
            else if (areCopsChasing(RandomInt(0, 10)) && (this.player.maxDuffelBagCapacity - this.player.spaceInDuffelBag()) > 0) this.$store.state.screen = 'cops';
            else this.$store.state.screen = 'main';
        },
        getActionsInLocation(location: string): string[] {
            return this.pricesAtLocation.locations[location].actions;
        },
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
        removeDuplicatesFromArray: function (array: string[]): string[] {
            return [...new Set(array)];
        },
    }
});
</script>

<style scoped></style>
