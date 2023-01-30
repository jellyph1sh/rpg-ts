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
        let damageMake :number=this.damage
        for (const target of this.targets) {
            if (this.type === "Physical") {
                damageMake = (this.damage * (1 - (target.defValue/100)));
                target.HP -= damageMake;
            } else {
                target.HP -= this.damage;
            }
            console.log(`${target.name} received ${damageMake} of the damages `);
        }
    }
}