import { Ally } from "../Ally.ts";
import { Attack } from "../Attack.ts";
import { Character } from "../Character.ts";

export class Paladin extends Ally {
    constructor() {
        super("Paladin", 40, 70, 45, 150, 0)
    }

    public UseSkill(skillIndex:number, targets:Character[]) {
        switch (skillIndex) {
            case (1): {
                this.Skill1(targets);
                break;
            }
        }
    }

    private Skill1(targets:Character[]) {
        const attack = new Attack(targets, this.atkValue*0.4, "Physical", 0)
        attack.ApplyDmg()
    }
}