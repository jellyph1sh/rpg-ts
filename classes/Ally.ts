import { Character } from "./Character.ts"

export class Ally extends Character {
    private mana = 100;
    private skills:Skill[];

    constructor(skills:Skill[], name: string, atkValue: number, defValue: number, atkSpeed: number, maxHealth: number) {
        super(name, atkValue, defValue, atkSpeed, maxHealth)
        this.skills = skills;
    }

    private UseSkill(skillIndex, target:Character) {
        
    }
}
