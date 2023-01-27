/* Class Attack */
import { Character } from "./Character.ts";

export class Attack {
    private damage:number;
    private type:string;
    private targets :Character[];
    private cost =0;

    constructor(targets :Character[], damage :number, type :string) {
        this.targets = targets;
        this.damage = damage;
        this.type = type;
    }

    public ApplyDmg():void {
        for (const target of this.targets) {
            if (this.type === "Physical") {
                target.HP -= (this.damage * (1 - (target.defValue/100)));
            } else {
                target.HP -= this.damage;
            }
        }
    }
}