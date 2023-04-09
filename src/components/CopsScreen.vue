<template>
    <div class="h-100-percent text-center">
        <v-container class="text-h5">COPS!!</v-container>
        <hr />
        <v-container>
            <v-row>
                <v-col class="text-subtitle-1">{{ numberOfCops }} cop<span v-if="numberOfCops > 1">s</span> caught you with
                    the work!</v-col>
            </v-row>
            <hr />
            <div>If you try to run, there's a 67% chance that you get away but you may drop some drugs.</div>
            <div>If you try to run, there's a 33% chance that you get hit with a bullet and lose some a health point.</div>
            <div>If you try to fight, there's a 17% chance that you hit a cop.</div>
            <hr />
            <v-row>
                <v-col>Health: {{ health }} / 20</v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="primary" width="100%" @click="run">
                        Run
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn color="primary" width="100%" :disabled="numberOfGuns === 0" @click="fight">
                        {{ numberOfGuns > 0 ? 'Fight' : 'No gun' }}
                    </v-btn>
                </v-col>
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
import Player from '@/classes/Player';
import Vue from 'vue';
import { numberOfCopsChasing, runFromCops, IRunFromCops, IFightAtCops, fightAtCops } from '@/events/CopsBustDeal';
import RandomInt from '@/utils/RandomInt';
import DrugsList from '@/static/DrugsList';

export default Vue.extend({
    name: 'CopsScreen',
    mounted: function () {
        this.numberOfCops = numberOfCopsChasing(RandomInt(0, 10));
    },
    data: () => ({
        dialog: false,
        actionResult: '',
        numberOfCops: numberOfCopsChasing(RandomInt(0, 10)),
    }),
    computed: {
        player: function (): Player {
            const player: Player = this.$store.state.player;
            return player;
        },
        numberOfGuns: function (): number {
            return this.player.guns;
        },
        health: function (): number {
            return this.player.health;
        }
    },
    methods: {
        fight: function (): void {
            if (this.numberOfGuns > 0) {
                const filteredDrugList = DrugsList.filter(x => this.player.getDrugAmount(x) > 0);
                const randomDrugIndex: number = RandomInt(0, filteredDrugList.length);
                const randomDrug: string = filteredDrugList[randomDrugIndex];
                const potentialDrugLostRand: number = RandomInt(0, this.player.getDrugAmount(randomDrug));
                const player: Player = this.player;
                const responseObject: IFightAtCops = fightAtCops(player, RandomInt(0, 6), this.numberOfCops, randomDrug, potentialDrugLostRand);
                this.$store.state.player = player;
                if (responseObject.loop === false) {
                    this.$store.state.mainMenuMessages.push(responseObject.result);
                    this.$store.state.screen = 'main';
                }
                else if (player.health <= 0) {
                    this.$store.state.screen = 'game-over';
                }
                else {
                    this.numberOfCops = responseObject.copsRemaining;
                    this.actionResult = responseObject.result;
                    this.dialog = true;
                }
            }
        },
        run: function (): void {
            const filteredDrugList = DrugsList.filter(x => this.player.getDrugAmount(x) > 0);
            const randomDrugIndex: number = RandomInt(0, filteredDrugList.length);
            const randomDrug: string = filteredDrugList[randomDrugIndex];
            const potentialDrugLostRand: number = RandomInt(0, this.player.getDrugAmount(randomDrug));
            const player: Player = this.player;
            const responseObject: IRunFromCops = runFromCops(player, RandomInt(0, 3), randomDrug, potentialDrugLostRand, RandomInt(0, 6));
            this.$store.state.player = player;
            if (responseObject.loop === false) {
                this.$store.state.mainMenuMessages.push(responseObject.result);
                this.$store.state.screen = 'main';
            }
            else if (player.health <= 0) {
                this.$store.state.screen = 'game-over';
            }
            else {
                this.actionResult = responseObject.result;
                this.dialog = true;
            }
        },
    },
});
</script>

<style scoped></style>