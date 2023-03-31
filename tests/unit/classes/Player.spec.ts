import Player from "@/classes/Player";
import DrugsList from "@/static/DrugsList";

describe('the Player test suite', () => {
    test('the setDrugAmount method', () => {
        const player: Player = new Player();
        DrugsList.forEach((drug: string) => {
            player.setDrugAmount(drug, 1);
        });
        DrugsList.forEach((drug: string) => {
            expect(player.getDrugAmount(drug)).toBe(1);
        });
    });
});