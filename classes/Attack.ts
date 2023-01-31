/* Class Attack */
import { Character } from "./Character.ts";

export class Attack {
    private name:string;
    private damage:number;
    private type:string;
    private _targets:Character[];
    private _cost:number;

    public get cost():number {
        return this._cost
    }

    public set targets(target:Character){
        this._targets.push(target)
    }

    constructor(name:string, targets:Character[], damage:number, type:string, cost:number) {
        this.name = name;
        this._targets = targets;
        this.damage = damage;
        this.type = type;
        this._cost = cost;
    }

    public ApplyDmg():void {
        let damageMake:number = this.damage;
        for (const target of this._targets) {
            if (this.type === "Physical") {
                damageMake = (this.damage * (1 - (target.defValue/100)));
                target.HP -= damageMake;
            } else {
                target.HP -= this.damage;
            }
        }
    }
}