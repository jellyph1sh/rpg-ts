/* Class Attack */
import { Character } from "./Character.ts";

export class Attack {
    private damage:number;
    private type:string;
    private _targets:Character[];

    public set targets(target:Character){
        this._targets.push(target)
    }

    constructor(targets:Character[], damage:number, type:string) {
        this._targets = targets;
        this.damage = damage;
        this.type = type;
    }

    public ApplyDmg():void {
        let damageMake:number = this.damage;
        for (const target of this._targets) {
            if (this.type === "Physical") {
                damageMake = (this.damage * (1 - (target.defValue/100)));
                target.HP -= damageMake;
            } else {
                console.log("Magicccc");
                prompt("")
                target.HP -= this.damage;
            }
        }
    }
}