import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('HelloWorld.vue', () => {
  const wrapper = shallowMount(HelloWorld, {
    vuetify: new Vuetify(),
    mocks: {
      $store: store,
    },
  })
  test('that the HelloWorld Component exists.', () => {
    expect(wrapper.exists()).toBe(true);
  })
})
