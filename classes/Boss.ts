import { Attack } from "./Attack.ts";
import { Character } from "./Character.ts";

export class Boss extends Character {

    constructor(name: string, atkValue: number, defValue: number, atkSpeed: number, maxHealth: number, skill:Attack) {
        super(name, atkValue, defValue, atkSpeed, maxHealth);
    }
}
