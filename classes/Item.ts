export class Item {
    private _name:string;
    private _amount = 1;
    
    constructor(name:string) {
        this._name = name;
    }

    public get name(){
        return this._name;
    }

    public get amount(){
        return this._amount;
    }

    public set amount(value:number){
        this._amount = Math.max(value, 0);
    }

}