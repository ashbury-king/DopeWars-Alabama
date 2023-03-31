import { shallowMount } from '@vue/test-utils'
import InstructionsScreen from '@/components/InstructionsScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('InstructionsScreen.vue', () => {
    const wrapper = shallowMount(InstructionsScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the InstructionsScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
})
