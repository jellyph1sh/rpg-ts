import { Character } from "./Character.ts"
import { Menu } from "./Menu.ts";
import { Fight } from "./Fight.ts";
import { Group } from "./Group.ts";
import { Attack } from "./Attack.ts";

export class Ally extends Character {
    private _mana:number;
    private _manaMax:number;
    
    public get mana() {
        return this._mana;
    }

    public set mana(value:number) {
        this._mana = Math.min(Math.max(value, 0), 100);
    }

    public get manaMax():number {
        return this._manaMax
    }

    constructor(name:string, atkValue:number, defValue:number, atkSpeed:number, maxHealth:number, manaMax:number) {
        super(name, atkValue, defValue, atkSpeed, maxHealth);
        this._mana = manaMax
        this._manaMax = manaMax
    }

    public Turn(enemyTeam: Character[], fight: Fight, group:Group) {
        let restart = true;
        while (restart) {
            restart = false;
            const displayActions = new Menu(fight.DisplayHP(), `to the turn of ${this.name} `, ["single attack","skil","inventory"]);
            const choosedAction = displayActions.Naviguate();
            switch (choosedAction) {
            case 0:
                this.AllyAttack(enemyTeam, fight);
                break;
            case 2:
                if (group.inventory.items.length != 0) {
                    restart = !this.AllyInventory(group,fight);
                } else {
                    console.log("you no longer have an object");
                    restart = true;
                    prompt("");
                }
                break;
            }
        }
        prompt("");
    }

    private AllyAttack(enemyTeam:Character[], fight:Fight) {
        const enemyNames: string[] = [];
            const targetList: Character[] = [];
            for (const enemy of enemyTeam) {
                if (!enemy.CanBeRevive()) {
                    enemyNames.push(enemy.name);
                    targetList.push(enemy);
                }
            }
            console.log("test");
            const menu = new Menu(fight.DisplayHP(), "who to attack", enemyNames);
            const target = menu.Naviguate();
            this.Hit([targetList[target]]);
    }

    private AllyInventory(group:Group, fight:Fight):boolean {
        const itemNames: string[] = [];
        for (const items of group.inventory.items) {
            itemNames.push(items.name +" X " +items.amount);
        }
        const allyNames: string[] = [];
        for (const ally of group.team) {
            allyNames.push(ally.name);
        }
        const inventoryMenu = new Menu(fight.DisplayHP(), "what item do you want to usewho to item ?", itemNames);
        const choosedItem = inventoryMenu.Naviguate();
        const selectAllyMenu = new Menu(fight.DisplayHP(),"on which ?",allyNames);
        const indexAlly = selectAllyMenu.Naviguate();
        const itemUsed = group.UseItem(choosedItem, group.team[indexAlly]);
        if (itemUsed) {
            group.inventory.RemoveItem(choosedItem);
            return true;
        } else {
            console.log(`you can't use ${group.inventory.items[choosedItem].name} on ${group.team[indexAlly].name}`);
            prompt("");
            return false;
        }
    }

    public RestoreMana(regenValue:number) {
        if (regenValue + this._mana >= this._manaMax) {
            this.mana = 100;
            console.log(`${this.name}has found all his mana, it has ${this._mana} mana.`);
        } else {
            this._mana = this._mana + regenValue;
            console.log(`you have restore ${regenValue} from mana. ${this.name}it to ${this._mana} mana.`);
        }
    }

    public CanRestoreMana():boolean {
        if (this.HP <= 0 || this._mana == this._manaMax) {
            return false;
        } else {
            return true;
        }
    }
}

