import { shallowMount } from '@vue/test-utils'
import LoanScreen from '@/components/LoanScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('LoanScreen.vue', () => {
    const wrapper: any = shallowMount(LoanScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the LoanScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
    test('the borrow method', () => {
        wrapper.vm.$store.state.player.shark.balance = 0;
        wrapper.vm.$store.state.player.money = 45678.90;
        wrapper.vm.borrowAmount = 10000;
        wrapper.vm.borrow();
        expect(wrapper.vm.$store.state.player.money).toBe(55678.90);
        expect(wrapper.vm.$store.state.player.shark.balance).toBe(12000);
        expect(wrapper.vm.borrowAmount).toBe(0);
    });
    test('the borrow method with shark debt', () => {
        wrapper.vm.$store.state.player.shark.balance = 1;
        wrapper.vm.$store.state.player.money = 45678.90;
        wrapper.vm.borrowAmount = 10000;
        wrapper.vm.borrow();
        expect(wrapper.vm.$store.state.player.money).toBe(45678.90);
        expect(wrapper.vm.$store.state.player.shark.balance).toBe(1);
        expect(wrapper.vm.borrowAmount).toBe(10000);
    });
    test('the payDebt method', () => {
        wrapper.vm.$store.state.player.shark.balance = 1000;
        wrapper.vm.$store.state.player.money = 45678.90;
        wrapper.vm.payOffAmount = 1000;
        wrapper.vm.payDebt();
        expect(wrapper.vm.$store.state.player.money).toBe(44678.90);
        expect(wrapper.vm.$store.state.player.shark.balance).toBe(0);
        expect(wrapper.vm.payOffAmount).toBe(0);
    });
})
