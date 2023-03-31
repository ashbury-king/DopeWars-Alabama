<template>
    <div class="text-center h-100-percent">
        <div class="w3-container">
            <div class="vertical-center">
                <v-container>How much big is your duffel bag?</v-container>
                <v-container>
                    <v-row>
                        <v-col><v-btn color="primary" width="100%" @click="setDuffelBagSpace(25)">25</v-btn></v-col>
                        <v-col><v-btn color="primary" width="100%" @click="setDuffelBagSpace(50)">50</v-btn></v-col>
                        <v-col><v-btn color="primary" width="100%" @click="setDuffelBagSpace(100)">100</v-btn></v-col>
                    </v-row>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Player from '@/classes/Player';

export default Vue.extend({
    name: 'DuffelBagScreen',
    methods: {
        setDuffelBagSpace(space: number): void {
            const player: Player = this.$store.state.player;
            player.maxDuffelBagCapacity = space;
            this.$store.state.player = player;
            this.$store.state.screen = 'main';
        }
    },
});
</script>

<style></style>