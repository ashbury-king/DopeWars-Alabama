import { shallowMount } from '@vue/test-utils'
import SellScreen from '@/components/SellScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'
import DrugsList from '@/static/DrugsList'

describe('SellScreen.vue', () => {
    const wrapper: any = shallowMount(SellScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the SellScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
    test('the getDrugAmount method', () => {
        expect(wrapper.vm.getDrugAmount('')).toBe(0);
    })
    test('the sell method', () => {
        wrapper.vm.$store.state.player.xanax = 1;
        wrapper.vm.selectedDrug = DrugsList[5];
        wrapper.vm.numberOfUnits = 1;
        wrapper.vm.sell();
        expect(wrapper.vm.$store.state.player.xanax).toBe(0);
        expect(wrapper.vm.selectedDrug).toBe('');
        expect(wrapper.vm.numberOfUnits).toBe(0);
    });
})
