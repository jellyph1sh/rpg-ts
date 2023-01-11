/* Class Attack */

export class Attack {
    damage :number = 0;
    type :string = "";
    target :Character;

    constructor(target :Character, damage :number, type :string) {
        this.target = target
        this.damage = damage
        this.type = type
    }

    ApplyDmg() {
        console.log(`Enemy life before Attack : ${this.target.HP}`)
        if (this.type === "Physical") {
            this.target.HP -= (this.damage * (1 - (this.target.defValue/100)))
        } else {
            this.target.HP -= this.damage
        }
        console.log(`Damage : ${this.damage}, enemy defense : ${this.target.defValue} ==> damage apply : ${this.damage * (1 - (this.target.defValue/100))} \nEnemy life : ${this.target.HP}`)
    }
}

class Character{
    name :string = "Enemy";
    HP :number = 100;
    maxHealth :number = 100;
    defValue :number = 10;
}

const Enemy1 = new Character();
const Attack1 = new Attack(Enemy1, 30, "Physical");
Attack1.ApplyDmg()

