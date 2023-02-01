import { Ally } from "../Ally.ts";
import { Attack } from "../Attack.ts";
import { Character } from "../Character.ts";
import { Group } from "../Group.ts";

export class Paladin extends Ally {
    protected _skillsName = ["Divine Hammer"];
    protected _team!: Group;

    public get skillsName():string[] {
        return this._skillsName;
    }

    constructor() {
        super("Paladin", 40, 70, 45, 150, 0);
    }

    public UseSkill(skillIndex:number, targetEnemy:Character[], _targetAlly:Group) {
        switch (skillIndex) {
            case (0): {
                this.Skill1(targetEnemy);
                break;
            }
        }
    }

    private Skill1(targets:Character[]) {
        const attack = new Attack(targets, this.atkValue*0.4, "Physical");
        attack.ApplyDmg();
    }
}