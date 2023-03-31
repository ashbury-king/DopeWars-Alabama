import { shallowMount } from '@vue/test-utils'
import TitleScreen from '@/components/TitleScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('TitleScreen.vue', () => {
    const wrapper = shallowMount(TitleScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the TitleScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
})
