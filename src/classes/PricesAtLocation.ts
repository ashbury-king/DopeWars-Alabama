import Prices from "@/classes/Prices";
import Player from "@/classes/Player";
import LocationsEnum from "@/enums/Locations";

interface PricesAtLocationDict {
    [city: string]: Prices,
}

export default class PriceAtLocation {
    locations: PricesAtLocationDict;
    constructor(player: Player) {
        this.locations = {};
        Object.values(LocationsEnum).forEach(element => {
            this.locations[element] = new Prices(player);
            this.locations[element].updateDailyEvent();
        });
    }
    updateAllCityEvents(): void {
        Object.values(LocationsEnum).forEach(element => {
            this.locations[element].updateDailyEvent();
        });
    }
}
