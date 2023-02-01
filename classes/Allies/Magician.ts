import { Ally } from "../Ally.ts";
import { Attack } from "../Attack.ts";
import { Character } from "../Character.ts";
import { Group } from "../Group.ts";
import { Menu } from "../Menu.ts";

export class Magician extends Ally{
    protected _skillsName = ["FireBall (30 mana)", "Avada Kedavra (100 mana)"];
    protected _team!: Group;

    public get skillsName():string[] {
        return this._skillsName;
    }

    constructor() {
        super("Magician", 10, 20, 55, 100, 150);
    }

    public UseSkill(skillIndex:number, targetsEnemy:Character[], _targetAlly:Group) {
        const enemiesNames:string[] = [];
                for (const enemy of targetsEnemy) {
                    enemiesNames.push(enemy.name);
                }
                const selectTarget = new Menu("Launch a skill!", "Choose an enemy:", enemiesNames);
                const selectedTarget = selectTarget.Naviguate();
        switch (skillIndex) {
            case (0): {
                this.Skill1(targetsEnemy[selectedTarget]);
                break;
            }
            case (1): if (this.mana >= 100) this.Skill2(targetsEnemy[selectedTarget]);
        }
    }

    private Skill1(target:Character) {
        const attack = new Attack([target], 60, "Magic");
        attack.ApplyDmg();
        this.mana -= 30;
    }

    private Skill2(target:Character) {
        const attack = new Attack([target], 90, "Magic");
        attack.ApplyDmg();
        this.mana -= 100;
    }
}