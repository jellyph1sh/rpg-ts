import { Group } from "./Group.ts";
import { Ally } from "./Ally.ts";
import { Menu } from "./Menu.ts";
import { Inventory } from "./Inventory.ts";
import { Warrior } from "./Allies/Warrior.ts";
import { Barbaric } from "./Allies/Barbaric.ts";
import { Magician } from "./Allies/Magician.ts";
import { Paladin } from "./Allies/Paladin.ts";
import { Presbyter } from "./Allies/Presbyter.ts";
import { Thief } from "./Allies/Thief.ts";
import { Floor } from "./Floor.ts";
import { Orientation } from "./Room.ts";
import { Fight } from "./Fight.ts";
import { Zombie } from "./Enemies/Zombie.ts";
import { Skeleton } from "./Enemies/Skeleton.ts";
import { Slime } from "./Enemies/Slime.ts";
import { Character } from "./Character.ts";
import { Ether } from "./Items/Ether.ts";
import { Potion } from "./Items/Potion.ts";
import { StarFragment } from "./Items/StarFragment.ts";
import { SemiStar } from "./Items/SemiStar.ts";
import { Cyclops } from "./Boss/Cyclops.ts";

export class GameManager {
    public team:Group | null = null;
    public allies:Ally[] = [];
    private floor:Floor = new Floor(7);
    private isBossDefeated = false;
    private isAlive = true;
    private static _instance:GameManager;

    public static get instance():GameManager {
        if (!GameManager._instance) {
            GameManager._instance = new GameManager()
        }
        return GameManager._instance;
    }

    private constructor(){}

    public deployAllAlliesCharacters():void {
        this.allies = [new Barbaric(), new Magician(), new Paladin(), new Presbyter(), new Thief(this.team as Group), new Warrior()]
    }

    public selectAlliesCharacters():void {
        const alliesName:string[] = [];
        for (const ally of this.allies) {
            alliesName.push(ally.name);
        }
        const localTeam:Ally[] = [];
        while (localTeam.length !== 3) {
            const selectAllyMenu = new Menu("Select your ally!", "Select your three allies.", alliesName);
            const index = selectAllyMenu.Naviguate();
            localTeam.push(this.allies[index]);
            this.allies.splice(index, 1);
            alliesName.splice(index, 1);
        }
        this.team = new Group(localTeam[0], localTeam[1], localTeam[2], new Inventory());
        this.team.inventory.AddItem(new Potion());
        this.team.inventory.AddItem(new Potion());
        this.team.inventory.AddItem(new Ether());
        this.team.inventory.AddItem(new StarFragment());
    }

    public Game() {
        console.clear()
        this.deployAllAlliesCharacters();
        this.selectAlliesCharacters();
        if (this.team) {
            while (!this.isBossDefeated && this.isAlive) {
                const mouvementChoice = new Menu(this.floor.ShowFloor(), "Select a direction", this.floor.actualRoom.possibleMovements);
                const mouvement = mouvementChoice.Naviguate();
                console.clear();
                console.log(this.floor.actualRoom.possibleMovements);
                switch (this.floor.actualRoom.possibleMovements[mouvement]) {
                    case ("Up") : this.floor.Move(Orientation.Up); break;
                    case ("Down") : this.floor.Move(Orientation.Down); break;
                    case ("Left") : this.floor.Move(Orientation.Left); break;
                    case ("Right") : this.floor.Move(Orientation.Right);
                }
                switch (this.floor.actualRoom.roomType) {
                    case (2) : {
                        const enemies = [];
                        for (let i=0; i<3; i++) {
                            enemies.push(this.SelectRandomEnemy());
                        }
                        const fight = new Fight(this.team, enemies);
                        const hasWin = fight.TurnFigth();
                        if (!hasWin) {
                            console.clear();
                            console.log("You lose");
                            this.isAlive = false;
                        }
                        break;
                    }
                    case (3) : {
                        const possibleItems = [new Ether(), new Potion(), new StarFragment(), new SemiStar()];
                        const randomValue = Math.floor(Math.random()*4);
                        const hadItem = new Menu("You find a chest", `there is ${possibleItems[randomValue].name} in`, ["Use it !", "Just take it"]);
                        const choice = hadItem.Naviguate();
                        switch (choice) {
                            case (0) : {
                                const names = [];
                                for (const ally of this.allies) {
                                    names.push(ally.name);
                                }
                                const chooseTarget = new Menu("You want to use the item", "Who's the target", names);
                                const targetChoice = chooseTarget.Naviguate();
                                possibleItems[randomValue].UseItem(this.allies[targetChoice]);
                                break;
                            }
                            case (1) : {
                                this.team?.inventory.AddItem(possibleItems[randomValue]);
                            }
                        }
                        break;
                    }
                    case (4) :{
                        const characterHit = Math.floor(Math.random()*3);
                        const HPLoose = Math.floor(Math.random()*20);
                        this.team.team[characterHit].HP -= (HPLoose+10);
                        console.clear();
                        console.log(`You open a chest and got traped, someone in your team was hurt and loose ${(HPLoose+10)} HP`);
                        prompt("")
                        break;
                    }
                    case (5) :{
                        // const enemies = [this.SelectRandomEnemy(), this.SelectRandomEnemy()]
                        const fight = new Fight(this.team, [], new Cyclops());
                        const hasSlayTheBoss = fight.TurnFigth();
                        console.clear();
                        if (!hasSlayTheBoss) {
                            console.log("You lose");
                            this.isAlive = false;
                        } else {
                            console.log("You have Win !!!");
                            this.isBossDefeated = true;
                        }
                    }
                }
            }
        }
    }

    private SelectRandomEnemy():Character {
        const enemies = [new Zombie(), new Skeleton(), new Slime()];
        const randomValue = Math.floor(Math.random()*3);
        return enemies[randomValue];
    }
}
