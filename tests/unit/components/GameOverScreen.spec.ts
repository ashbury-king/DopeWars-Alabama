import { shallowMount } from '@vue/test-utils'
import GameOverScreen from '@/components/GameOverScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('GameOverScreen.vue', () => {
    const wrapper = shallowMount(GameOverScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the GameOverScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
})
