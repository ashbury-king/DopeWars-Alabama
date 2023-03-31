import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('App.vue', () => {
    const wrapper = shallowMount(App, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the App Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
})
