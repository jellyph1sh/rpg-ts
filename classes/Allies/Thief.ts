import { Ally } from "../Ally.ts";
import { Group } from "../Group.ts";
import { Ether } from "../Items/Ether.ts";
import { Potion } from "../Items/Potion.ts";
import { SemiStar } from "../Items/SemiStar.ts"
import { StarFragment } from "../Items/StarFragment.ts";


export class Thief extends Ally {
    protected _skillsName = ["stealing"];
    protected _team!: Group;

    public get skillsName():string[] {
        return this._skillsName;
    }

    constructor() {
        super("Thief", 45, 30, 85, 75, 0);
    }



    public UseSkill(skillIndex:number) {
        switch (skillIndex) {
            case (0): {
                this.Skill1();
                break;
            }
        }
    }

    private Skill1() {
        const randomValue = Math.floor(Math.random()*100);
        if (randomValue <= 5) {
            this._team.inventory.AddItem(new SemiStar());
        } else if (randomValue <= 15) {
            this._team.inventory.AddItem(new Ether());
        } else if (randomValue <= 30) {
            this._team.inventory.AddItem(new StarFragment());
        } else if (randomValue <= 60) {
            this._team.inventory.AddItem(new Potion());
        }
    }
}