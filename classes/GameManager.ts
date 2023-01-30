import { Group } from "./Group.ts";
import { Ally } from "./Ally.ts";
import { Menu } from "./Menu.ts";
import { Inventory } from "./Inventory.ts";

export class GameManager {
    public team:Group | null = null;
    public allies:Ally[] = [];

    public deployAllAlliesCharacters():void {
        this.allies = [new Ally([], "Warrior", 50, 50, 0.6, 100), new Ally([], "Magician", 75, 25, 0.25, 100), new Ally([], "Paladin", 65, 20, 0.25, 100), new Ally([], "Barbaric", 55, 45, 0.5, 100), new Ally([], "Presbyter", 75, 25, 0.2, 100), new Ally([], "Thief", 45, 10, 0.8, 100)];
    }

    public selectAlliesCharacters():void {
        const alliesName:string[] = [];
        for (const ally of this.allies) {
            alliesName.push(ally.name);
        }
        const localTeam:Ally[] = [];
        while (localTeam.length !== 2) {
            const selectAllyMenu = new Menu("Select your ally!", "Select your three allies.", alliesName);
            const index = selectAllyMenu.Naviguate();
            localTeam.push(this.allies[index]);
            this.allies.splice(index, 1);
            alliesName.splice(index, 1);
        }
        this.team = new Group(localTeam[0], localTeam[1], localTeam[2], new Inventory());
    }
}
