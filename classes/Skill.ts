export class Skill {
    public damage:number;
    public type:string;
    public name:string;
    public cost:number;

    constructor(damage:number, type:string, name:string, cost:number) {
        this.damage = damage
        this.type = type
        this.name = name
        this.cost = cost
    }
}