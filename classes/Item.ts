export class Item {
    public name:string;
    public effect:string;
    public value:number
    public amount = 1;
    
    constructor(name:string, effect:string, value:number) {
        this.name = name
        this.effect = effect
        this.value=value
    }
}