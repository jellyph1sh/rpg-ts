import { Group } from "./Group.ts";
import { Ally } from "./Ally.ts";
import { Menu } from "./Menu.ts";
import { Inventory } from "./Inventory.ts";
import { Attack } from "./Attack.ts";

export class GameManager {
    public team:Group | null = null;
    public allies:Ally[] = [];

    public deployAllAlliesCharacters():void {
        this.allies = [new Ally([], "Warrior", 50, 50, 50, 120, 0), new Ally([new Attack("FireBall", [], 60, "Magic", 30), new Attack("LightArrows", [], 25, "Magic", 10), new Attack("LightningHands", [], 85, "Magic", 65)], "Magician", 10, 20, 55, 100, 100), new Ally([new Attack("LightHammer", [], 25, "Physical", 0)], "Paladin", 40, 60, 45, 150, 60), new Ally([new Attack("DoubleAxes", [], 85, "Physical", 0)], "Barbaric", 65, 30, 75, 85, 0), new Ally([], "Presbyter", 15, 20, 20, 100, 100), new Ally([], "Thief", 45, 10, 80, 75, 40)];
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
