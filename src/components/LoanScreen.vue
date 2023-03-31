<template>
    <div class="h-100-percent text-center">
        <div class="text-h5">Loan Shark</div>
        <v-container>
            <v-row>
                <v-col>Debt:</v-col>
                <v-col>{{ toUsCurrency(debt) }}</v-col>
            </v-row>
            <v-row>
                <v-col>Cash:</v-col>
                <v-col>{{ toUsCurrency(cash) }}</v-col>
            </v-row>
        </v-container>
        <hr />
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field label="Pay Off Amount" v-model="payOffAmount" prefix="$"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="primary" width="100%" :disabled="
                        (Number(payOffAmount) > 0 && Number(payOffAmount) <= cash) === false ||
                        Number(payOffAmount) > debt
                    " @click="payDebt">
                        Pay Debt
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <hr />
        <v-container>
            <v-row>
                <v-col>
                    <div>You can only borrow money if you don't already owe the loan shark.</div>
                    <div>If you do borrow money, the loan shark charges 20 points (percent).</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Borrow Amount" v-model="borrowAmount" prefix="$"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="primary" width="100%" :disabled="
                        (Number(borrowAmount) > 0 && Number(payOffAmount) <= cash) === false ||
                        debt > 0
                    " @click="borrow">
                        Borrow
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <hr />
        <v-container>
            <v-row>
                <v-col><v-btn color="primary" width="100%" @click="goToScreen('main')">Main Menu</v-btn></v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Player from '@/classes/Player';
import Vue from 'vue';
import ToUsCurrency from '@/utils/ToUsCurrency';

export default Vue.extend({
    name: 'LoanScreen',
    data: () => ({
        payOffAmount: 10.00,
        borrowAmount: 10.00,
    }),
    computed: {
        player: function (): Player {
            const player: Player = this.$store.state.player;
            return player;
        },
        debt: function (): number {
            return this.player.shark.balance;
        },
        cash: function (): number {
            return this.player.money;
        },
    },
    methods: {
        goToScreen: function (screen: string): void {
            this.$store.state.screen = screen;
        },
        payDebt: function (): void {
            if (this.player.shark.canDeposit(Number(this.payOffAmount))) {
                this.player.shark.depostit(Number(this.payOffAmount));
                this.payOffAmount = 0;
            }
        },
        toUsCurrency: function (dollars: number): string {
            return ToUsCurrency(dollars);
        },
        borrow: function (): void {
            if (this.player.shark.canBorrow(Number(this.borrowAmount))) {
                this.player.shark.withdraw(Number(this.borrowAmount));
                this.borrowAmount = 0;
            }
        },
    },
});
</script>

<style scoped></style>