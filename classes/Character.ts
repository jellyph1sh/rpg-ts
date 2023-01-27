import { Attack } from "./Attack.ts"

export class Character {
    name: string;
    atkValue: number;
    defValue: number;
    atkSpeed: number;
    maxHealth: number;
    _HP: number;

    public get HP(){
        return this._HP;
    }

    public set HP(value: number){
        this._HP = Math.max(Math.min(value,this.maxHealth),0);
    } 
    
    constructor(name: string, atkValue: number, defValue: number, atkSpeed: number, maxHealth: number){
        this. name = name;
        this.atkValue = atkValue;
        this.defValue = defValue;
        this.atkSpeed = atkSpeed;
        this.maxHealth = maxHealth;
        this._HP = maxHealth;

    }

    hit(targets: Character[]) {
        const AttackSimple = new Attack(targets, this.atkValue, "Physical");
        const degat =AttackSimple.ApplyDmg();
        for (const target of targets) {
            console.log(`${this.name} did ${degat} damage on ${target.name}`);
        }
    }

    Heal(healValue: number){
        if (healValue + this.HP >= this.maxHealth) {
            this.HP =this.maxHealth
            console.log(`${this.name} to recover all its life, it has ${this.HP} HP.`)
        }else{
            this.HP=this.HP + healValue
            console.log(`you have been treated from ${healValue}, ${this.name}it to ${this.HP} HP.`)
        }
    }

    Revive(healPercentage: number) {
        if (this.HP <= 0) {
            this.HP= Math.floor(healPercentage * this.maxHealth /100)
            console.log(`${this.name} came back to life with ${this.HP} HP.`)
            
        }
    }

    CanBeHeal(): boolean{
        if(this.HP <= 0 || this.HP == this.maxHealth){
            return false
        }else{
            return true
        }
    }

    CanBeRevive(): boolean{
        if (this.HP <= 0){
            return true
        }else{
            return false
        }
    }
}

