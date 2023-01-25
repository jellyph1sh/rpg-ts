import { Group } from "./Group.ts";
import { Ally } from "./Ally.ts";
import { Menu } from "./Menu.ts";
import { Inventory } from "./Inventory.ts";
import { Character } from "./Character.ts";

export class GameManager {
    public team:Group | null = null;
    public characters:Character[] = [];

    public deployAllCharacters(): void {
        this.characters = [new Ally([], "Warrior", 50, 50, 0.6, 100), new Ally([], "Magician", 75, 25, 0.25, 100), new Ally([], "Paladin", 65, 20, 0.25, 100), new Ally([], "Barbaric", 55, 45, 0.5, 100), new Ally([], "Presbyter", 75, 25, 0.2, 100), new Ally([], "Thief", 45, 10, 0.8, 100), new Character("Slime", 45, 65, 0.2, 100), new Character("Skeleton", 65, 25, 0.6, 100), new Character("Gobelin", 45, 10, 0.8, 100), new Character("Zombie", 65, 40, 0.4, 100)];
    }

    public SelectAllyCharacters(allies:Ally[]) {
        const alliesName:string[] = [];
        for (const charact of allies) {
            alliesName.push(charact.name);
        }
        const localTeam:Ally[] = [];
        while (localTeam.length !== 2) {
            const selectAllyMenu = new Menu("Select your ally!", "Select your three allies.", alliesName);
            const index = selectAllyMenu.Naviguate();
            localTeam.push(allies[index]);
            allies.splice(index, 1);
            alliesName.splice(index, 1);
        }
        this.team = new Group(localTeam[0], localTeam[1], localTeam[2], new Inventory());
    }
}
