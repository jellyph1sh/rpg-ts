import { Character } from "./Character.ts"

export class Ally extends Character {
    private mana = 100;
    private skills:Skill[];

    constructor(skills:Skill[], name: string, atkValue: number, defValue: number, atkSpeed: number, maxHealth: number) {
        super(name, atkValue, defValue, atkSpeed, maxHealth)
        this.skills = skills;
    }

    private UseSkill(skillName:String, target:Character) {
        const usedSkill:Skill;
        for (const skill of this.skills) {
            if (skill.name === skillName) {
                usedSkill = skill
            }
        }
        console.log(usedSkill);
        
    }
}
