import { Attack } from "./Attack.ts"

export class Character {
    name: string;
    atkValue: number;
    defValue: number;
    atkSpeed: number;
    maxHealth: number;
    HP: number;
    
    constructor(name: string, atkValue: number, defValue: number, atkSpeed: number, maxHealth: number){
        this. name = name
        this.atkValue = atkValue
        this.defValue = defValue
        this.atkSpeed = atkSpeed
        this.maxHealth = maxHealth
        this.HP = maxHealth

    }

    hit(target: Character) {
        const AttackSimple = new Attack(target, this.atkValue, "Physical")
        AttackSimple.ApplyDmg()
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
            console.log(`no heal`)
            return false
        }else{
            return true
        }
    }

    CanBeRevive(): boolean{
        if (this.HP <= 0){
            return true
        }else{
            console.log(`object not used`)
            return false
        }
    }
}

