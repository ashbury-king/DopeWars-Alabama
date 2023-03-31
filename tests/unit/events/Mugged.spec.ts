import Player from '@/classes/Player';
import { resultOfMugging } from '@/events/Mugged';

describe('the test suit for the Mugged event', () => {
    test('the resultOfMugging method', () => {
        const player: Player = new Player();
        player.money = 1000;
        const rand1 = .5;
        expect(resultOfMugging(player, rand1)).toBe(`You got mugged!! You lost $250.00`)
    });
});