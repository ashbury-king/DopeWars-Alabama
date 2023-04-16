<template>
    <div class="text-center h-100-percent c-pointer" @click="touch">
        <div class="w3-container">
            <div class="vertical-center">
                <v-container>
                    <v-row>
                        <v-col cols="3" xs="1" sm="1" md="1" lg="1" xl="1" xxl="1" v-for="(value, i) in icons"
                            :key="`${i}-${value}`">
                            <v-icon>
                                {{ value }}
                            </v-icon>
                        </v-col>
                    </v-row>
                    <div class="text-h4">Dope Wars Alabama</div>
                    <hr />
                    <div class="text-h6">Presented by iGiovaniGrigi</div>
                    <hr />
                    <div class="text-subtitle-1">Click to continue</div>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'TitleScreen',
    data: () => ({
        icons: [
            'mdi-domino-mask',
            'mdi-arm-flex',
            'mdi-pistol',
            'mdi-police-badge',
            'mdi-face-woman-shimmer',
            'mdi-bank',
            'mdi-needle',
            'mdi-fire',
            'mdi-truck-fast',
            'mdi-home-city',
            'mdi-airplane',
            'mdi-currency-usd',
        ],
    }),
    methods: {
        touch: function () {
            this.$store.state.screen = 'instructions';
        },
    },
});
</script>

<style></style>