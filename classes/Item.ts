export class Item {
    private _name:string;
    private _effect:string;
    private _value:number;
    private _amount = 1;
    
    constructor(name:string, effect:string, value:number) {
        this._name = name;
        this._effect = effect;
        this._value = value;
    }

    public get name(){
        return this._name;
    }
    public get effect(){
        return this._effect;
    }
    public get value(){
        return this._value;
    }

    public get amount(){
        return this._amount;
    }

    public set amount(value:number){
        this._amount = Math.max(value, 0);
    }

}