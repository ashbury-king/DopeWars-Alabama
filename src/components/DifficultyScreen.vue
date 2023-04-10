<template>
    <div class="text-center h-100-percent">
        <div class="w3-container">
            <div class="vertical-center">
                <v-container>
                    <div>How much debt do you owe the loan shark?</div>
                    <div>The loan shark adds 8% to the debt every day.</div>
                </v-container>
                <v-container>
                    <v-row>
                        <v-col><v-btn color="primary" width="100%" @click="setLoanBalance(4036)">$4036</v-btn></v-col>
                        <v-col><v-btn color="primary" width="100%" @click="setLoanBalance(4770)">$4770</v-btn></v-col>
                        <v-col><v-btn color="primary" width="100%" @click="setLoanBalance(5871)">$5871</v-btn></v-col>
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
    name: 'DifficultyScreen',
    methods: {
        setLoanBalance(balance: number): void {
            const player: Player = this.$store.state.player;
            player.shark.balance = balance;
            this.$store.state.player = player;
            this.$store.state.screen = 'main';
        }
    },
});
</script>

<style></style>