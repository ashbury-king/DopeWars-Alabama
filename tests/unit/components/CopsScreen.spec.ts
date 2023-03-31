import { shallowMount } from '@vue/test-utils'
import CopsScreen from '@/components/CopsScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('CopsScreen.vue', () => {
    const wrapper = shallowMount(CopsScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the CopsScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
})
