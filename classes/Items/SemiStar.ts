import { Ally } from "../Ally.ts";
import { Item } from "../Item.ts";

export class SemiStar extends Item {
    constructor() {
        super("Ether")
    }

    public UseItem(target:Ally) {
        target.HP = target.maxHealth
    }
}