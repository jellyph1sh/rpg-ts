import { Group } from "./Group.ts";
import { Ally } from "./Ally.ts";
import { Menu } from "./Menu.ts";
import { Inventory } from "./Inventory.ts";

export class GameManager {
    public team:Group | null = null;
    public allies:Ally[] = [];

    public deployAllAlliesCharacters():void {
        this.allies = []
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

    public Game() {

    }

    public DisplayGame() {

    }
}
