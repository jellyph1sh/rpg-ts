import { Character } from "./Character.ts"
import { Skill } from "./Skill.ts";

export class Ally extends Character {
    private _mana = 100;
    private skills:Skill[];

    public get mana() {
        return this._mana
    }

    public set mana(value:number) {
        this._mana = Math.min(Math.max(value, 0), 100)
    }

    constructor(skills:Skill[], name: string, atkValue: number, defValue: number, atkSpeed: number, maxHealth: number) {
        super(name, atkValue, defValue, atkSpeed, maxHealth)
        this.skills = skills;
    }

    public UseSkill(skillName:string, target:Character) {
        let usedSkill:Skill;
        for (const skill of this.skills) {
            if (skill.name === skillName) {
                usedSkill = skill;
                this.mana -= skill.cost
                console.log(usedSkill, target, this.mana);
            }
        }
    }
}
