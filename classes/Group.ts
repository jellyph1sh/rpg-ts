import { Ally } from "./Ally.ts";
import { Inventory } from "./Inventory.ts";

export class Group {
    public team:Ally[];
    public inventory:Inventory;

    constructor(Ally1:Ally, Ally2:Ally, Ally3:Ally, inventory:Inventory){
        this.team = [Ally1, Ally2, Ally3]
        this.inventory = inventory
    }
}