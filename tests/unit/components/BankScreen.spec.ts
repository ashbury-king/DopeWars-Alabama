import { shallowMount } from '@vue/test-utils'
import BankScreen from '@/components/BankScreen.vue'
import Vuetify from 'vuetify'
import store from '@/store'

describe('BankScreen.vue', () => {
    const wrapper: any = shallowMount(BankScreen, {
        vuetify: new Vuetify(),
        mocks: {
            $store: store,
        },
    })
    test('that the BankScreen Component exists.', () => {
        expect(wrapper.exists()).toBe(true);
    })
    test('the depostit method', () => {
        wrapper.vm.$store.state.player.bank.balance = 0;
        expect(wrapper.vm.$store.state.player.bank.balance).toBe(0);
        wrapper.vm.depositAmount = 100;
        wrapper.vm.deposit();
        expect(wrapper.vm.$store.state.player.bank.balance).toBe(100);
    });
    test('the withdraw method', () => {
        wrapper.vm.$store.state.player.bank.balance = 100;
        expect(wrapper.vm.$store.state.player.bank.balance).toBe(100);
        wrapper.vm.withdrawAmount = 100;
        wrapper.vm.withdraw();
        expect(wrapper.vm.$store.state.player.bank.balance).toBe(0);
    });
})
