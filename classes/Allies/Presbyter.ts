import { Ally } from "../Ally.ts";
import { Character } from "../Character.ts";
import { Group } from "../Group.ts";
import { Menu } from "../Menu.ts";

export class Presbyter extends Ally {
    protected _skillsName = ["Heal (20 mana)"];
    protected _team!: Group;

    public get skillsName():string[] {
        return this._skillsName;
    }

    constructor() {
        super("Presbyter", 15, 20, 20, 100, 100);
    }

    public UseSkill(skillIndex:number, _targetEnemy:Character[], targetAlly:Group) {
        const alliesNames:string[] = [];
        const targetList: Character[] = [];
        for (const ally of targetAlly.team) {
            if (!ally.CanBeRevive()) {
                alliesNames.push(ally.name);
                targetList.push(ally);
            }
        }
        const selectTarget = new Menu("Launch a skill!", "Choose an enemy:", alliesNames);
        const selectedTarget = selectTarget.Naviguate();
        switch (skillIndex) {
            case (0): {
                this.Skill1(targetList[selectedTarget]);
                break;
            }
        }
    }

    private Skill1(target:Character) {
        if (target.CanBeHeal()) {
            target.HP = target.HP*1.25;
            this.mana -= 20;
        }
    }
}