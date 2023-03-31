import Player from '@/classes/Player';

export default class Shark {
    player: Player;
    balance: number;
    constructor(player: Player) {
        this.player = player;
        this.balance = 4036; // $1375 in January 1984
    }
    addInterestToBalance(): void {
        this.balance = Math.floor(this.balance * 1.08);
    }
    canBorrow(amount: number): boolean {
        return (this.balance === 0 && amount <= Math.floor(this.player.money));
    }
    canDeposit(amount: number): boolean {
        return amount <= this.player.money;
    }
    depostit(amount: number): void {
        this.player.money -= amount;
        this.balance -= amount;
    }
    withdraw(amount: number): void {
        this.player.money += amount;
        this.balance += (amount * 1.2);
    }
}
