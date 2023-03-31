import { shallowMount } from '@vue/test-utils'
import DifficultyScreen from '@/components/DifficultyScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('DifficultyScreen.vue', () => {
    const wrapper = shallowMount(DifficultyScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the DifficultyScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
})
