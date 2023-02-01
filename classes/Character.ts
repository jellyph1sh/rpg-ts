import { Attack } from "./Attack.ts"

export class Character {
    private _name: string;
    private _atkValue: number;
    private _defValue: number;
    private _atkSpeed: number;
    private _maxHealth: number;
    private _HP: number;

    constructor(name: string, atkValue: number, defValue: number, atkSpeed: number, maxHealth: number){
        this._name = name;
        this._atkValue = atkValue;
        this._defValue = defValue;
        this._atkSpeed = atkSpeed;
        this._maxHealth = maxHealth;
        this._HP = maxHealth;
    }

    public get name(){
        return this._name;
    }
    public get atkValue(){
        return this._atkValue;
    }

    public get defValue(){
        return this._defValue;
    }

    public get atkSpeed(){
        return this._atkSpeed;
    }

    public get maxHealth() {
        return this._maxHealth
    }

    public get HP(){
        return this._HP;
    }

    public set HP(value: number){
        this._HP = Math.max(Math.min(value,this.maxHealth),0);
        Math.floor(this._HP)
    } 
   

    public Hit(targets: Character[]) {
        const simpleAttack = new Attack(targets, this.atkValue, "Physical");
        simpleAttack.ApplyDmg();
    }

    public Heal(healValue: number){
        if (healValue + this.HP >= this.maxHealth) {
            this.HP =this.maxHealth
            console.log(`${this.name} to recover all its life, it has ${this.HP} HP.`)
        }else{
            this.HP=this.HP + healValue
            console.log(`you have been treated from ${healValue}, ${this.name}it to ${this.HP} HP.`)
        }
    }

    public Revive(healPercentage: number) {
        if (this.HP <= 0) {
            this.HP= Math.floor(healPercentage * this.maxHealth /100)
            console.log(`${this.name} came back to life with ${this.HP} HP.`)
            
        }
    }

    public CanBeHeal(): boolean{
        if(this.HP <= 0 || this.HP == this.maxHealth){
            return false
        }else{
            return true
        }
    }

    public CanBeRevive(): boolean{
        if (this.HP <= 0){
            return true
        }else{
            return false
        }
    }
}

