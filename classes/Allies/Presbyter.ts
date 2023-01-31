import { Ally } from "../Ally.ts";
import { Character } from "../Character.ts";
import { Group } from "../Group.ts";
import { Menu } from "../Menu.ts";

export class Presbyter extends Ally {
    protected _skillsName = ["Heal"];

    public get skillsName():string[] {
        return this._skillsName;
    }

    constructor() {
        super("Presbyter", 15, 20, 20, 100, 100)
    }

    public UseSkill(skillIndex:number, _targetEnemy:Character[], targetAlly:Group) {
        const enemiesNames:string[] = [];
        for (const ally of targetAlly.team) {
            enemiesNames.push(ally.name)
        }
        const selectTarget = new Menu("Launch a skill", "Choose an enemy", enemiesNames)
        const selectedTarget = selectTarget.Naviguate()
        switch (skillIndex) {
            case (0): {
                this.Skill1(targetAlly.team[selectedTarget]);
                break;
            }
        }
    }

    private Skill1(target:Character) {
        if (target.CanBeHeal()) {
            target.HP = target.HP*1.25
        }
    }
}