import { shallowMount } from '@vue/test-utils'
import DuffelBagScreen from '@/components/DuffelBagScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('DuffelBagScreen.vue', () => {
    const wrapper = shallowMount(DuffelBagScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the DuffelBagScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
})
