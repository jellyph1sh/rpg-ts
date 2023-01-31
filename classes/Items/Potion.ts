import { Ally } from "../Ally.ts";
import { Item } from "../Item.ts";

export class Potion extends Item {
    constructor() {
        super("Ether")
    }

    public UseItem(target:Ally) {
        if (target.CanBeHeal()) {
            target.HP += Math.floor(target.maxHealth*0.5)
        }
    }
}