import Locations from '@/enums/Locations';
import Bank from '@/classes/Bank';
import Shark from '@/classes/Shark';
import RemoveSmallestFromArray from '@/utils/RemoveSmallestFromArray';

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
    cocaineCostBasis: number[];
    heroinCostBasis: number[];
    acidCostBasis: number[];
    weedCostBasis: number[];
    ecstasyCostBasis: number[];
    xanaxCostBasis: number[];
    constructor() {
        this.isFirstRound = true;
        this.money = 1467; // $500 in January 1984
        this.guns = 0;
        this.daysRemaining = 30;
        this.health = 20;
        this.maxDuffelBagCapacity = 25;
        this.cocaine = 0;
        this.heroin = 0;
        this.acid = 0;
        this.weed = 0;
        this.ecstasy = 0;
        this.xanax = 0;
        this.bank = new Bank(this);
        this.shark = new Shark(this);
        this.currentArea = Locations[5];
        this.cocaineCostBasis = [];
        this.heroinCostBasis = [];
        this.acidCostBasis = [];
        this.weedCostBasis = [];
        this.ecstasyCostBasis = [];
        this.xanaxCostBasis = [];
    }
    buy(drug: string, amount: number, price: number): void {
        let playerDrugAmount = this.getDrugAmount(drug);
        playerDrugAmount += amount;
        this.setDrugAmount(drug, playerDrugAmount);
        this.money -= (amount * price)
        switch (drug) {
            case 'cocaine':
                Array(amount).fill(undefined).forEach(() => {
                    this.cocaineCostBasis.push(price);
                });
                break;
            case 'heroin':
                Array(amount).fill(undefined).forEach(() => {
                    this.heroinCostBasis.push(price);
                });
                break;
            case 'acid':
                Array(amount).fill(undefined).forEach(() => {
                    this.acidCostBasis.push(price);
                });
                break;
            case 'weed':
                Array(amount).fill(undefined).forEach(() => {
                    this.weedCostBasis.push(price);
                });
                break;
            case 'ecstasy':
                Array(amount).fill(undefined).forEach(() => {
                    this.ecstasyCostBasis.push(price);
                });
                break;
            case 'xanax':
                Array(amount).fill(undefined).forEach(() => {
                    this.xanaxCostBasis.push(price);
                });
                break;
        }
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
    getCostBasis(drug: string): number {
        switch (drug) {
            case 'cocaine':
                if (this.cocaineCostBasis.length === 0) return 0;
                return (this.cocaineCostBasis.reduce((a, b) => a + b)) / (this.cocaineCostBasis.length)
            case 'heroin':
                if (this.heroinCostBasis.length === 0) return 0;
                return (this.heroinCostBasis.reduce((a, b) => a + b)) / (this.heroinCostBasis.length)
            case 'acid':
                if (this.acidCostBasis.length === 0) return 0;
                return (this.acidCostBasis.reduce((a, b) => a + b)) / (this.acidCostBasis.length)
            case 'weed':
                if (this.weedCostBasis.length === 0) return 0;
                return (this.weedCostBasis.reduce((a, b) => a + b)) / (this.weedCostBasis.length)
            case 'ecstasy':
                if (this.ecstasyCostBasis.length === 0) return 0;
                return (this.ecstasyCostBasis.reduce((a, b) => a + b)) / (this.ecstasyCostBasis.length)
            case 'xanax':
                if (this.xanaxCostBasis.length === 0) return 0;
                return (this.xanaxCostBasis.reduce((a, b) => a + b)) / (this.xanaxCostBasis.length)
            default: return 0;
        }
    }
    removeDrugFromCostBasis(drug: string): void {
        const newArray: number[] = [];
        switch (drug) {
            case 'cocaine':
                this.cocaineCostBasis.forEach(element => { newArray.push(element); });
                this.cocaineCostBasis = RemoveSmallestFromArray(newArray);
                break;
            case 'heroin':
                this.heroinCostBasis.forEach(element => { newArray.push(element); });
                this.heroinCostBasis = RemoveSmallestFromArray(newArray);
                break;
            case 'acid':
                this.acidCostBasis.forEach(element => { newArray.push(element); });
                this.acidCostBasis = RemoveSmallestFromArray(newArray);
                break;
            case 'weed':
                this.weedCostBasis.forEach(element => { newArray.push(element); });
                this.weedCostBasis = RemoveSmallestFromArray(newArray);
                break;
            case 'ecstasy':
                this.ecstasyCostBasis.forEach(element => { newArray.push(element); });
                this.ecstasyCostBasis = RemoveSmallestFromArray(newArray);
                break;
            case 'xanax':
                this.xanaxCostBasis.forEach(element => { newArray.push(element); });
                this.xanaxCostBasis = RemoveSmallestFromArray(newArray);
                break;
        }
    }
}
