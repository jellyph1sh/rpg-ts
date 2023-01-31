import { Ally } from "../Ally.ts";
import { Attack } from "../Attack.ts";
import { Character } from "../Character.ts";

export class Magician extends Ally{

    constructor() {
        super("Magician", 10, 20, 55, 100, 150)
    }

    public UseSkill(skillIndex:number, target:Character) {
        switch (skillIndex) {
            case (1): {
                this.Skill1(target);
                break;
            }
            case (2): if (this.mana >= 100) this.Skill2(target);
        }
    }

    private Skill1(target:Character) {
        const attack = new Attack([target], 60, "Magic", 30)
        attack.ApplyDmg()
        this.mana -= 30
    }

    private Skill2(target:Character) {
        const attack = new Attack([target], 90, "Magic", 100)
        attack.ApplyDmg()
        this.mana -= 100
    }
}