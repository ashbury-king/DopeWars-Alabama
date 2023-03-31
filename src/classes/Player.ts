import Locations from '@/enums/Locations';
import Bank from '@/classes/Bank';
import Shark from '@/classes/Shark';

export default class Player {
    isFirstRound: boolean;
    money: number;
    guns: number;
    daysRemaining: number;
    health: number;
    maxDuffelBagCapacity: number;
    cocaine: number;
    heroin: number;
    acid: number;
    weed: number;
    ecstasy: number;
    xanax: number;
    bank: Bank;
    shark: Shark;
    currentArea: string;
    constructor() {
        this.isFirstRound = true;
        this.money = 1467; // $500 in January 1984
        this.guns = 0;
        this.daysRemaining = 30;
        this.health = 20;
        this.maxDuffelBagCapacity = 100;
        this.cocaine = 0;
        this.heroin = 0;
        this.acid = 0;
        this.weed = 0;
        this.ecstasy = 0;
        this.xanax = 0;
        this.bank = new Bank(this);
        this.shark = new Shark(this);
        this.currentArea = Locations[5];
    }
    buy(drug: string, amount: number, price: number): void {
        let playerDrugAmount = this.getDrugAmount(drug);
        playerDrugAmount += amount;
        this.setDrugAmount(drug, playerDrugAmount);
        this.money -= (amount * price)
    }
    sizeOfInventory(): number {
        return (
            this.heroin +
            this.cocaine +
            this.ecstasy +
            this.acid +
            this.weed +
            this.xanax
        )
    }
    spaceInDuffelBag(): number {
        return this.maxDuffelBagCapacity - (this.sizeOfInventory())
    }
    getDrugAmount(drug: string): number {
        switch (drug) {
            case 'cocaine':
                return this.cocaine;
            case 'heroin':
                return this.heroin;
            case 'acid':
                return this.acid;
            case 'weed':
                return this.weed;
            case 'ecstasy':
                return this.ecstasy;
            case 'xanax':
                return this.xanax;
            default:
                return 0;
        }
    }
    setDrugAmount(drug: string, amount: number): void {
        switch (drug) {
            case 'cocaine':
                this.cocaine = amount;
                break;
            case 'heroin':
                this.heroin = amount;
                break;
            case 'acid':
                this.acid = amount;
                break;
            case 'weed':
                this.weed = amount;
                break;
            case 'ecstasy':
                this.ecstasy = amount;
                break;
            case 'xanax':
                this.xanax = amount;
                break;
        }
    }
    sell(drug: string, amount: number, price: number): void {
        let playerDrugAmount = this.getDrugAmount(drug)
        playerDrugAmount -= amount;
        this.setDrugAmount(drug, playerDrugAmount);
        this.money += (amount * price);
    }
}
