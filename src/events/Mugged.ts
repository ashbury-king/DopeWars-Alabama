import Player from "@/classes/Player";
import ToUsCurrency from "@/utils/ToUsCurrency";

export const areYouBeingMugged = (rand8: number): boolean => rand8 === 3;

export const resultOfMugging = (player: Player, rand1: number): string => {
    const cashLost = player.money * rand1 / 2;
    player.money = Math.floor(player.money - cashLost)
    return `You got mugged!! You lost ${ToUsCurrency(cashLost)}`;
}
