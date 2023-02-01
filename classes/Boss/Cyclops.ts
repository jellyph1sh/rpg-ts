import { Attack } from "../Attack.ts";
import { Character } from "../Character.ts";

export class Cyclops extends Character {
    constructor() {
        super("Cyclops", 70, 65, 70, 150);
    }

    public UseSkill(targets:Character[]): void {
        const attack = new Attack(targets, 50, "Physical");
        attack.ApplyDmg();
    }
}