<template>
    <div class="text-center c-pointer h-100-percent" @click="touch">
        <v-container>
            This is a game of buying, selling, and fighting. The objective of the game is to pay off your debt to
            the loan shark. Then, make as much money as you can in a 30 days. If you deal too heavily in drugs,
            you might run into the police!! Your main stash will be in {{ $store.state.player.currentArea }}. The
            market price of drugs per unit are within the following ranges:
        </v-container>
        <hr />
        <v-container ref="instructions-prices">
            <div v-for="(value, i) in drugs" :key="`${i}-${value}`">
                {{ i.charAt(0).toUpperCase() + i.slice(1) }} | {{ value }}
            </div>
        </v-container>
        <hr />
        <v-container>
            <div>Icons to Note</div>
            <v-row>
                <v-col>
                    <v-icon color="white">
                        mdi-information
                    </v-icon>
                </v-col>
                <v-col>No price changes in the city</v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-icon color="primary">
                        mdi-information
                    </v-icon>
                </v-col>
                <v-col>A drug in the city has changed their prices</v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-icon color="white">
                        mdi-star
                    </v-icon>
                </v-col>
                <v-col>A profit will be made if drug is sold</v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-icon color="white">
                        mdi-close
                    </v-icon>
                </v-col>
                <v-col>A loss will be made if drug is sold</v-col>
            </v-row>
        </v-container>
        <hr />
        <div class="text-subtitle-1">
            <v-container ref="instructions-continue">Click to continue</v-container>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'InstructionsScreen',
    mounted() {
        // setTimeout(() => {
        //     this.scrollToElement("instructions-prices");
        // }, 15 * 1000);
        // setTimeout(() => {
        //     this.scrollToElement("instructions-continue");
        // }, 18 * 1000);
    },
    computed: {
        drugs: function () {
            return {
                heroin: "$15000 - $30000",
                cocaine: "$5000 - $14000",
                ecstasy: "$1000 - $4500",
                acid: "$300 - $900",
                weed: "$70 - $250",
                xanax: "$10 - $60",
            };
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
                el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        },
        touch: function () {
            this.$store.state.screen = 'difficulty';
        }
    }
});
</script>

<style></style>