import { Ally } from "../Ally.ts";
import { Attack } from "../Attack.ts";
import { Character } from "../Character.ts";


export class Barbaric extends Ally{

    constructor() {
        super("Barbaric", 65, 30, 75, 85, 0)
    }

    public UseSkill(skillIndex:number, target:Character) {
        switch (skillIndex) {
            case (1): this.Skill1(target)
        }
    }

    private Skill1(target:Character) {
        const attack = new Attack([target], 1.3*this.atkValue, "Physical", 0)
        this.HP = this.HP*0.8
        attack.ApplyDmg()
    }
}