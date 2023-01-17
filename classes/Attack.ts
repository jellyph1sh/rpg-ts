/* Class Attack */
import { Character } from "./Character.ts";

export class Attack {
    private damage:number;
    private type:string;
    private target :Character;

    constructor(target :Character, damage :number, type :string) {
        this.target = target
        this.damage = damage
        this.type = type
    }

    public ApplyDmg() {
        if (this.type === "Physical") {
            this.target.HP -= (this.damage * (1 - (this.target.defValue/100)))
        } else {
            this.target.HP -= this.damage
        }
    }
}