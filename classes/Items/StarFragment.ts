import { Ally } from "../Ally.ts";
import { Item } from "../Item.ts";

export class StarFragment extends Item {
    constructor() {
        super("StarFragment");
    }

    public UseItem(target:Ally) {
        if (target.CanBeRevive()) {
            target.HP += target.maxHealth*0.2;
        } else {
            target.HP += target.maxHealth*0.5;
        }
    }
}