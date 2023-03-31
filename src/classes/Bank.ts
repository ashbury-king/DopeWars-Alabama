import Player from "@/classes/Player";

export default class Bank {
    player: Player;
    balance: number;
    constructor(player: Player) {
        this.player = player;
        this.balance = 0;
    }
    addInterestToBalance(): void {
        this.balance = Math.floor(this.balance * 1.05);
    }
    depostit(amount: number): void {
        this.player.money -= amount;
        this.balance += amount;
    }
    withdraw(amount: number): void {
        this.player.money += amount;
        this.balance -= amount;
    }
    canWithdraw(amount: number): boolean {
        return amount <= this.balance;
    }
    canDeposit(amount: number): boolean {
        return amount <= this.player.money;
    }
}
