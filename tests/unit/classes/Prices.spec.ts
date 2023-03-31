import Player from "@/classes/Player";
import Prices from "@/classes/Prices";

describe('the Prices test suite', () => {
    test('the copsBustCocaine method', () => {
        const player: Player = new Player();
        const prices: Prices = new Prices(player);
        prices.copsBustCocaine(3);
        expect(prices.actions.length).toBe(1);
        expect(prices.actions[0]).toBe("Cops raided a coke house! Prices are rising!!!");
    });
    test('the addictsBuyCoke method', () => {
        const player: Player = new Player();
        const prices: Prices = new Prices(player);
        prices.addictsBuyCoke(3);
        expect(prices.actions.length).toBe(1);
        expect(prices.actions[0]).toBe("Cokeheads everywhere are ready to pay. Prices are skyrocketing!!");
    });
    test('the copsBustHeroin method', () => {
        const player: Player = new Player();
        const prices: Prices = new Prices(player);
        prices.copsBustHeroin(3);
        expect(prices.actions.length).toBe(1);
        expect(prices.actions[0]).toBe("Cops raided a heroin kinpin's warehouse! Prices are rising!!!");
    });
    test('the addictsBuyHeroin method', () => {
        const player: Player = new Player();
        const prices: Prices = new Prices(player);
        prices.addictsBuyHeroin(3);
        expect(prices.actions.length).toBe(1);
        expect(prices.actions[0]).toBe("Heroin junkies everywhere need their fix. Prices are skyrocketing!!");
    });
    test('the cheapAcid method', () => {
        const player: Player = new Player();
        const prices: Prices = new Prices(player);
        prices.cheapAcid(3);
        expect(prices.actions.length).toBe(1);
        expect(prices.actions[0]).toBe("Somebody found a reliable method for synthesizing acid. It's super cheap!");
    });
    test('the cheapXannies method', () => {
        const player: Player = new Player();
        const prices: Prices = new Prices(player);
        prices.cheapXannies(3);
        expect(prices.actions.length).toBe(1);
        expect(prices.actions[0]).toBe("The pharmacy was robbed! Xannies are extremely cheap.");
    });
    test('the cheapWeed method', () => {
        const player: Player = new Player();
        const prices: Prices = new Prices(player);
        prices.cheapWeed(3);
        expect(prices.actions.length).toBe(1);
        expect(prices.actions[0]).toBe(`Hempfest ${new Date().getFullYear()}! Weed is basically being handed out!`);
    });
    test('the cheapHeroin method', () => {
        const player: Player = new Player();
        const prices: Prices = new Prices(player);
        prices.cheapHeroin(3);
        expect(prices.actions.length).toBe(1);
        expect(prices.actions[0]).toBe(`Heroin markets are flooded! Prices have dropped!!`);
    });
    test('the cheapCocaine method', () => {
        const player: Player = new Player();
        const prices: Prices = new Prices(player);
        prices.cheapCocaine(3);
        expect(prices.actions.length).toBe(1);
        expect(prices.actions[0]).toBe(`You made a connection from Latin America here. Coke is cheap!`);
    });
    test('the cheapEcstasy method', () => {
        const player: Player = new Player();
        const prices: Prices = new Prices(player);
        prices.cheapEcstasy(3);
        expect(prices.actions.length).toBe(1);
        expect(prices.actions[0]).toBe(`Ecstasy markets are flooded! Prices are dropping!`);
    });
});