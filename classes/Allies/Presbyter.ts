import { Ally } from "../Ally.ts";
import { Character } from "../Character.ts";

export class Presbyter extends Ally {

    constructor() {
        super("Presbyter", 15, 20, 20, 100, 100)
    }

    public UseSkill(skillIndex:number, target:Character) {
        switch (skillIndex) {
            case (1): {
                this.Skill1(target);
                break;
            }
        }
    }

    private Skill1(target:Character) {
        if (target.CanBeHeal()) {
            target.HP = target.HP*1.25
        }
    }
}