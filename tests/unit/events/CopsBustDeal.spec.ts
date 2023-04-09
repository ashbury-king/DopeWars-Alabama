import Player from '@/classes/Player';
import { numberOfCopsChasing, runFromCops, IRunFromCops, fightAtCops, IFightAtCops } from '@/events/CopsBustDeal';
import DrugsList from '@/static/DrugsList';

describe('the CopsBustDeal test suite', () => {
    test('the numberOfCopsChasing method', () => {
        expect(numberOfCopsChasing(3)).toBe(2);
        expect(numberOfCopsChasing(7)).toBe(3);
        expect(numberOfCopsChasing(9)).toBe(4);
    });
    test('the runFromCops method - losing drugs', () => {
        const player: Player = new Player();
        player.xanax = 1;
        const rand3 = 1;
        const randomDrug = DrugsList[5];
        const potentialDrugLossRand = 1;
        const rand6 = 3;
        const responseObject: IRunFromCops = runFromCops(player, rand3, randomDrug, potentialDrugLossRand, rand6);
        expect(responseObject.result).toBe(`You got away. But you dropped ${potentialDrugLossRand} of ${randomDrug} while running!`);
        expect(responseObject.loop).toBe(false);
        expect(player.xanax).toBe(0);
    });
    test('the runFromCops method - not losing drugs', () => {
        const player: Player = new Player();
        player.xanax = 1;
        const rand3 = 1;
        const randomDrug = DrugsList[5];
        const potentialDrugLossRand = 0;
        const rand6 = 3;
        const responseObject: IRunFromCops = runFromCops(player, rand3, randomDrug, potentialDrugLossRand, rand6);
        expect(responseObject.result).toBe(`You got away!`);
        expect(responseObject.loop).toBe(false);
        expect(player.xanax).toBe(1);
    });
    test('the runFromCops method - hit by bullet', () => {
        const player: Player = new Player();
        player.xanax = 1;
        player.health = 20;
        const rand3 = 0;
        const randomDrug = DrugsList[5];
        const potentialDrugLossRand = 1;
        const rand6 = 2;
        const responseObject: IRunFromCops = runFromCops(player, rand3, randomDrug, potentialDrugLossRand, rand6);
        expect(responseObject.result).toBe('You got hit by one of their shots and lost some health!');
        expect(responseObject.loop).toBe(true);
        expect(player.health).toBe(19);
    });
    test('the runFromCops method - got away - else - else', () => {
        const player: Player = new Player();
        player.xanax = 1;
        player.health = 20;
        const rand3 = 0;
        const randomDrug = DrugsList[5];
        const potentialDrugLossRand = 1;
        const rand6 = 3;
        const responseObject: IRunFromCops = runFromCops(player, rand3, randomDrug, potentialDrugLossRand, rand6);
        expect(responseObject.result).toBe(`You got away. But you dropped ${potentialDrugLossRand} of ${randomDrug} while running!`);
        expect(responseObject.loop).toBe(false);
        expect(player.xanax).toBe(0);
    });
    test('the fightAtCops method - shooting back - eliminating 1 and 1 remains', () => {
        const player: Player = new Player();
        const rand6 = 3;
        const numberOfCops = 2;
        const randomDrug = DrugsList[5];
        const potentialDrugLossRand = 1;
        const responseObject: IFightAtCops = fightAtCops(player, rand6, numberOfCops, randomDrug, potentialDrugLossRand);
        expect(responseObject.result).toBe(`You shot one and ${numberOfCops - 1} cops are left.`);
        expect(responseObject.loop).toBe(true);
        expect(responseObject.copsRemaining).toBe(numberOfCops - 1);
    });
    test('the fightAtCops method - shooting back - eliminating 1 and 0 remain', () => {
        const player: Player = new Player();
        const rand6 = 3;
        const numberOfCops = 1;
        const randomDrug = DrugsList[5];
        const potentialDrugLossRand = 1;
        const responseObject: IFightAtCops = fightAtCops(player, rand6, numberOfCops, randomDrug, potentialDrugLossRand);
        expect(responseObject.result).toBe(`You got away!`);
        expect(responseObject.loop).toBe(false);
        expect(responseObject.copsRemaining).toBe(numberOfCops - 1);
    });
    test('the fightAtCops method - shooting back - losing health', () => {
        const player: Player = new Player();
        player.health = 20;
        const rand6 = 1;
        const numberOfCops = 1;
        const randomDrug = DrugsList[5];
        const potentialDrugLossRand = 1;
        const responseObject: IFightAtCops = fightAtCops(player, rand6, numberOfCops, randomDrug, potentialDrugLossRand);
        expect(responseObject.result).toBe('You got hit by one of their shots and lost some health!');
        expect(responseObject.loop).toBe(true);
        expect(responseObject.copsRemaining).toBe(numberOfCops);
    });
});