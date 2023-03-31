import Player from "@/classes/Player";

/**
 * 
 * @param rand10
 * @returns 
 */
export const areCopsChasing = (rand10: number): boolean => 3 === rand10;

/**
 * 
 * @param rand10
 * @returns 
 */
export const numberOfCopsChasing = (rand10: number): number => {
    if (rand10 >= 0 && rand10 <= 5) return 2;
    else if (rand10 >= 6 && rand10 <= 8) return 3;
    else return 4;
}

export interface IRunFromCops {
    result: string,
    loop: boolean
}

const gotAway = (
    player: Player,
    randomDrug: string,
    potentialDrugLossRand: number,
): string => {
    if (potentialDrugLossRand > 0) {
        const newDrugAmount: number = player.getDrugAmount(randomDrug) - potentialDrugLossRand;
        player.setDrugAmount(randomDrug, newDrugAmount);
        return `You got away. But you dropped ${potentialDrugLossRand} of ${randomDrug} while running!`;
    }
    else {
        return 'You got away!';
    }
}

/**
 * 
 * @param player 
 * @param rand3 
 * @param randomDrug 
 * @param potentialDrugLossRand 
 * @param rand6 
 * @returns 
 */
export const runFromCops = (
    player: Player,
    rand3: number, // not shot
    randomDrug: string,
    potentialDrugLossRand: number,
    rand6: number, // shot
): IRunFromCops => {
    if (1 === rand3) {
        return {
            result: gotAway(player, randomDrug, potentialDrugLossRand),
            loop: false,
        }
    }
    else {
        if ([2, 4].includes(rand6)) {
            player.health -= 1;
            return {
                result: 'You got hit by one of their shots and lost some health!',
                loop: true,
            }
        }
        else {
            return {
                result: gotAway(player, randomDrug, potentialDrugLossRand),
                loop: false,
            };
        }
    }
};

export interface IFightAtCops {
    result: string,
    loop: boolean,
    copsRemaining: number,
}

export const fightAtCops = (
    player: Player,
    rand6: number,
    numberOfCops: number,
    randomDrug: string,
    potentialDrugLossRand: number,
): IFightAtCops => {
    if (3 === rand6) {
        const newNumberOfCops = numberOfCops - 1;
        if (newNumberOfCops === 0) {
            return {
                result: gotAway(player, randomDrug, potentialDrugLossRand),
                loop: false,
                copsRemaining: newNumberOfCops,
            }
        }
        return {
            result: `You shot one and ${newNumberOfCops} cops are left.`,
            loop: true,
            copsRemaining: newNumberOfCops,
        }
    }
    else {
        player.health -= 1;
        return {
            result: 'You got hit by one of their shots and lost some health!',
            loop: true,
            copsRemaining: numberOfCops,
        }
    }
};
