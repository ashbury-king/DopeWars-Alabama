import GetRandomInt from '@/utils/RandomInt';
import Player from '@/classes/Player';
import RandomInt from '@/utils/RandomInt';

export default class Prices {
    player: Player;
    heroin: number;
    cocaine: number;
    ecstasy: number;
    acid: number;
    weed: number;
    xanax: number;
    actions: string[];
    constructor(player: Player) {
        this.player = player;
        this.heroin = GetRandomInt(15000, 30000);
        this.cocaine = GetRandomInt(5000, 14000);
        this.ecstasy = GetRandomInt(1000, 4500);
        this.acid = GetRandomInt(300, 900);
        this.weed = GetRandomInt(70, 250);
        this.xanax = GetRandomInt(10, 60);
        this.actions = [];
    }
    copsBustCocaine(rand15: number): void {
        if (3 === rand15) {
            this.cocaine = GetRandomInt(5000, 14000);
            this.cocaine = Math.floor(this.cocaine * 2);
            this.actions.push("Cops raided a coke house! Prices are rising!!!");
        }
    }
    addictsBuyCoke(rand15: number): void {
        if (3 === rand15) {
            this.cocaine = GetRandomInt(5000, 14000);
            this.cocaine = Math.floor(this.cocaine * 4);
            this.actions.push("Cokeheads everywhere are ready to pay. Prices are skyrocketing!!");
        }
    }
    copsBustHeroin(rand25: number): void {
        if (3 === rand25) {
            this.heroin = GetRandomInt(15000, 30000);
            this.heroin = Math.floor(this.heroin * 2);
            this.actions.push("Cops raided a heroin kinpin's warehouse! Prices are rising!!!");
        }
    }
    addictsBuyHeroin(rand25: number): void {
        if (3 === rand25) {
            this.heroin = GetRandomInt(15000, 30000);
            this.heroin = Math.floor(this.heroin * 4);
            this.actions.push("Heroin junkies everywhere need their fix. Prices are skyrocketing!!");
        }
    }
    cheapAcid(rand15: number): void {
        if (3 === rand15) {
            this.acid = GetRandomInt(300, 900);
            this.acid = Math.floor(this.acid / 4);
            this.actions.push("Somebody found a reliable method for synthesizing acid. It's super cheap!");
        }
    }
    cheapXannies(rand10: number): void {
        if (3 === rand10) {
            this.xanax = GetRandomInt(10, 60);
            this.xanax = Math.floor(this.xanax / 4);
            this.actions.push("The pharmacy was robbed! Xannies are extremely cheap.");
        }
    }
    cheapWeed(rand10: number): void {
        if (3 === rand10) {
            this.weed = GetRandomInt(70, 250);
            this.weed = Math.floor(this.weed / 4);
            this.actions.push(`Hempfest ${new Date().getFullYear()}! Weed is basically being handed out!`);
        }
    }
    cheapHeroin(rand30: number): void {
        if (3 === rand30) {
            this.heroin = GetRandomInt(15000, 30000);
            this.heroin = Math.floor(this.heroin / 4);
            this.actions.push(`Heroin markets are flooded! Prices have dropped!!`);
        }
    }
    cheapCocaine(rand25: number): void {
        if (3 === rand25) {
            this.cocaine = GetRandomInt(5000, 14000);
            this.cocaine = Math.floor(this.cocaine / 4);
            this.actions.push(`You made a connection from Latin America here. Coke is cheap!`);
        }
    }
    cheapEcstasy(rand10: number): void {
        if (3 === rand10) {
            this.ecstasy = GetRandomInt(1000, 4500);
            this.ecstasy = Math.floor(this.ecstasy / 4);
            this.actions.push(`Ecstasy markets are flooded! Prices are dropping!`);
        }
    }
    updateDailyEvent(): void {
        const eventIndex = RandomInt(0, 10);
        switch (eventIndex) {
            case 0:
                this.copsBustCocaine(RandomInt(0, 15));
                break;
            case 1:
                this.addictsBuyCoke(RandomInt(0, 15));
                break;
            case 2:
                this.copsBustHeroin(RandomInt(0, 25));
                break;
            case 3:
                this.addictsBuyHeroin(RandomInt(0, 25));
                break;
            case 4:
                this.cheapAcid(RandomInt(0, 15));
                break;
            case 5:
                this.cheapXannies(RandomInt(0, 10));
                break;
            case 6:
                this.cheapWeed(RandomInt(0, 10));
                break;
            case 7:
                this.cheapHeroin(RandomInt(0, 30));
                break;
            case 8:
                this.cheapCocaine(RandomInt(0, 25));
                break;
            case 9:
                this.cheapEcstasy(RandomInt(0, 10));
                break;
        }
    }

    getPriceOfDrug(drug: string): number {
        switch (drug) {
            case 'heroin':
                return this.heroin;
            case 'cocaine':
                return this.cocaine;
            case 'ecstasy':
                return this.ecstasy;
            case 'acid':
                return this.acid;
            case 'weed':
                return this.weed;
            case 'xanax':
                return this.xanax;
            default:
                break;
        }
        return 0;
    }
}
