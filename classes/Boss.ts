import { Attack } from "./Attack.ts";
import { Character } from "./Character.ts";

export class Boss extends Character {
    skill:Attack;

    constructor(name: string, atkValue: number, defValue: number, atkSpeed: number, maxHealth: number, skill:Attack) {
        super(name, atkValue, defValue, atkSpeed, maxHealth);
        this.skill = skill;
    }

    public UseSkill():void {
        this.skill.ApplyDmg();
    }
}
