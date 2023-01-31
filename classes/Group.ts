import { Ally } from "./Ally.ts";
import { Inventory } from "./Inventory.ts";

export class Group {
    private _team:Ally[];
    public inventory:Inventory;

    public get team():Ally[] {
        return this._team;
    }

    constructor(Ally1:Ally, Ally2:Ally, Ally3:Ally, inventory:Inventory) {
        this._team = [Ally1, Ally2, Ally3];
        this.inventory = inventory;
    }

    public setBouttonInventory():string[] {
        const buttons:string[] = [];
        for(let i=1; i <= this.inventory.items.length; i++) {
            buttons.push(this.inventory.items[i].name);
        }
        return buttons;
    }

    public UseItem(indexItem:number, target:Ally) {
        this.inventory.items[indexItem].UseItem(target)
    }
}