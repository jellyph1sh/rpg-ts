export class Item {
    public name:string;
    public effect:string;
    public amount = 1;
    
    constructor(name:string,effect:string) {
        this.effect = effect
        this.name = name
    }
}