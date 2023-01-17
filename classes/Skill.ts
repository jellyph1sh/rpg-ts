export class Skill {
    public damage:number;
    public type:string;
    public name:string;

    constructor(damage:number, type:string, name:string) {
        this.damage = damage
        this.type = type
        this.name = name
    }
}