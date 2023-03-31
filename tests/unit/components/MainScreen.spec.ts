import { shallowMount } from '@vue/test-utils'
import MainScreen from '@/components/MainScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('MainScreen.vue', () => {
    const wrapper = shallowMount(MainScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the MainScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
})
