import { shallowMount } from '@vue/test-utils'
import BuyScreen from '@/components/BuyScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'
import DrugsList from '@/static/DrugsList'

describe('BuyScreen.vue', () => {
    const wrapper: any = shallowMount(BuyScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the BuyScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
    test('the buy method', () => {
        wrapper.vm.$store.state.player.xanax = 0;
        wrapper.vm.selectedDrug = DrugsList[5];
        wrapper.vm.numberOfUnits = 1;
        wrapper.vm.buy();
        expect(wrapper.vm.$store.state.player.xanax).toBe(1);
        expect(wrapper.vm.selectedDrug).toBe('');
        expect(wrapper.vm.numberOfUnits).toBe(0);
    });
    test('the getPriceOfDrug method', () => {
        expect(wrapper.vm.getPriceOfDrug('')).toBe(0);
    })
})
