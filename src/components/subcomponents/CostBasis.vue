<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" width="100%" dark v-bind="attrs" v-on="on">
                    View Cost Basis
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5">
                    Cost Basis
                </v-card-title>

                <v-card-text>
                    <v-row v-if="xanaxCostBasis.length > 0">
                        <v-col>Average Xanax Bought Price</v-col>
                        <v-col>
                            {{ ToUsCurrency(player.getCostBasis('xanax')) }}
                        </v-col>
                    </v-row>
                    <v-row v-if="weedCostBasis.length > 0">
                        <v-col>Average Weed Bought Price</v-col>
                        <v-col>
                            {{ ToUsCurrency(player.getCostBasis('weed')) }}
                        </v-col>
                    </v-row>
                    <v-row v-if="acidCostBasis.length > 0">
                        <v-col>Average Acid Bought Price</v-col>
                        <v-col>
                            {{ ToUsCurrency(player.getCostBasis('acid')) }}
                        </v-col>
                    </v-row>
                    <v-row v-if="ecstasyCostBasis.length > 0">
                        <v-col>Average Ecstasy Bought Price</v-col>
                        <v-col>
                            {{ ToUsCurrency(player.getCostBasis('ecstasy')) }}
                        </v-col>
                    </v-row>
                    <v-row v-if="cocaineCostBasis.length > 0">
                        <v-col>Average Cocaine Bought Price</v-col>
                        <v-col>
                            {{ ToUsCurrency(player.getCostBasis('cocaine')) }}
                        </v-col>
                    </v-row>
                    <v-row v-if="heroinCostBasis.length > 0">
                        <v-col>Average Heroin Bought Price</v-col>
                        <v-col>
                            {{ ToUsCurrency(player.getCostBasis('heroin')) }}
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import Player from '@/classes/Player';
import Vue from 'vue';
import ToUsCurrency from '@/utils/ToUsCurrency';

export default Vue.extend({
    name: 'CostBasis',
    data: () => ({
        dialog: false,
    }),
    computed: {
        player: function (): Player {
            const player: Player = this.$store.state.player;
            return player;
        },
        cocaineCostBasis: function (): number[] {
            return this.player.cocaineCostBasis;
        },
        heroinCostBasis: function (): number[] {
            return this.player.heroinCostBasis;
        },
        acidCostBasis: function (): number[] {
            return this.player.acidCostBasis;
        },
        weedCostBasis: function (): number[] {
            return this.player.weedCostBasis;
        },
        ecstasyCostBasis: function (): number[] {
            return this.player.ecstasyCostBasis;
        },
        xanaxCostBasis: function (): number[] {
            return this.player.xanaxCostBasis;
        },
    },
    methods: {
        ToUsCurrency,
    },
});
</script>

<style scoped></style>