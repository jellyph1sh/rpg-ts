import { Ally } from "../Ally.ts";
import { Item } from "../Item.ts";

export class Ether extends Item {
    constructor() {
        super("Ether")
    }

    public UseItem(target:Ally) {
        if (target.CanRestoreMana()) {
            target.mana += Math.floor(target.manaMax*0.3)
        }
    }
}