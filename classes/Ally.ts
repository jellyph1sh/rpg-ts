import { Character } from "./Character.ts"
import { Menu } from "./Menu.ts";
import { Fight } from "./Fight.ts";
import { Group } from "./Group.ts";

export abstract class Ally extends Character {
    private _mana:number;
    private _manaMax:number;
    protected abstract _skillsName:string[];
    protected abstract _team:Group;
    
    public get mana() {
        return this._mana;
    }

    public set mana(value:number) {
        this._mana = Math.min(Math.max(value, 0), 100);
    }

    public get manaMax():number {
        return this._manaMax;
    }

    public set team(team:Group) {
        this._team = team
    }

    constructor(name:string, atkValue:number, defValue:number, atkSpeed:number, maxHealth:number, manaMax:number) {
        super(name, atkValue, defValue, atkSpeed, maxHealth);
        this._mana = manaMax;
        this._manaMax = manaMax;
    }

    public abstract UseSkill(skillIndex:number, targetEnemy:Character[], targetAlly:Group):void;

    public Turn(enemyTeam: Character[], fight: Fight, group:Group) {
        let restart = true;
        while (restart) {
            restart = false;
            const displayActions = new Menu(fight.DisplayHP(), `Turn of ${this.name} `, ["Single attack","Skill","Inventory"]);
            const choosedAction = displayActions.Naviguate();
            switch (choosedAction) {
                case 0: {
                    this.AllyAttack(enemyTeam, fight);
                    break;
                }
                case 1: {
                    const selectSkill = new Menu(fight.DisplayHP(), "Choose a skill:", this._skillsName);
                    const selectedSkill = selectSkill.Naviguate();
                    this.UseSkill(selectedSkill, enemyTeam, group);
                    break;
                }
                case 2: {
                    if (group.inventory.items.length != 0) {
                        restart = !this.AllyInventory(group,fight);
                    } else {
                        console.log("You no longer have any object!");
                        restart = true;
                        prompt("");
                    }
                    break;
                }
            }
        }
        // prompt("");
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
            const menu = new Menu(fight.DisplayHP(), "Choose a target:", enemyNames);
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
        const inventoryMenu = new Menu(fight.DisplayHP(), "What item do you want to use?", itemNames);
        const choosedItem = inventoryMenu.Naviguate();
        const selectAllyMenu = new Menu(fight.DisplayHP(),"On which?",allyNames);
        const indexAlly = selectAllyMenu.Naviguate();
        group.UseItem(choosedItem, group.team[indexAlly]);
        group.inventory.RemoveItem(choosedItem);
        return true;
    }

    public RestoreMana(regenValue:number) {
        if (regenValue + this._mana >= this._manaMax) {
            this.mana = 100;
            console.log(`${this.name} got back all his mana, he has ${this._mana} mana.`);
        } else {
            this._mana = this._mana + regenValue;
            console.log(`You have restore ${regenValue} from mana. ${this.name} it to ${this._mana} mana.`);
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

