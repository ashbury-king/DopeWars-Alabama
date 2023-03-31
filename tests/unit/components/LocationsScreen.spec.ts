import { shallowMount } from '@vue/test-utils'
import LocationsScreen from '@/components/LocationsScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'
import Locations from '@/enums/Locations';

describe('LocationsScreen.vue', () => {
    const wrapper: any = shallowMount(LocationsScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the LocationsScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
    test('the changeLocation method', () => {
        wrapper.vm.$store.state.player.bank.balance = 100;
        wrapper.vm.changeLocation(Locations[0]);
        expect(wrapper.vm.$store.state.player.bank.balance).toBe(105);
    })
})
