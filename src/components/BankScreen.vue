<template>
    <div class="h-100-percent text-center">
        <div class="text-h5">Bank</div>
        <v-container>
            <v-row>
                <v-col>Cash:</v-col>
                <v-col>{{ toUsCurrency(cash) }}</v-col>
            </v-row>
            <v-row>
                <v-col>Bank Balance:</v-col>
                <v-col>{{ toUsCurrency(bankBalance) }}</v-col>
            </v-row>
        </v-container>
        <hr />
        <v-container>
            <v-row>
                <v-col>
                    <div>When you deposit money, it gains 5% interest everyday.</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Deposit Amount" v-model="depositAmount" prefix="$"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="primary" width="100%" :disabled="
                        (Number(depositAmount) > 0 && Number(depositAmount) <= cash) === false ||
                        Number(deposit) > cash
                    " @click="deposit">
                        Deposit
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <hr />
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field label="Withdraw Amount" v-model="withdrawAmount" prefix="$"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="primary" width="100%" :disabled="Number(withdrawAmount) > bankBalance || bankBalance <= 0" @click="withdraw">
                        Withdraw
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
    name: 'BankScreen',
    data: () => ({
        depositAmount: 10.00,
        withdrawAmount: 10.00,
    }),
    computed: {
        player: function (): Player {
            const player: Player = this.$store.state.player;
            return player;
        },
        cash: function (): number {
            return this.player.money;
        },
        bankBalance: function (): number {
            return this.player.bank.balance;
        }
    },
    methods: {
        goToScreen: function (screen: string): void {
            this.$store.state.screen = screen;
        },
        deposit: function (): void {
            if(this.player.bank.canDeposit(Number(this.depositAmount))){
                this.player.bank.depostit(Number(this.depositAmount));
                this.depositAmount = 0;
            }
        },
        toUsCurrency: function (dollars: number): string {
            return ToUsCurrency(dollars);
        },
        withdraw: function (): void {
            if(this.player.bank.canWithdraw(Number(this.withdrawAmount))){
                this.player.bank.withdraw(Number(this.withdrawAmount));
                this.withdrawAmount = 0;
            }
        },
    },
});
</script>

<style scoped></style>