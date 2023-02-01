import { Ally } from "../Ally.ts";
import { Attack } from "../Attack.ts";
import { Character } from "../Character.ts";
import { Group } from "../Group.ts";
import { Menu } from "../Menu.ts";


export class Barbaric extends Ally{
    protected _skillsName = ["Berzerker"];
    protected _team!: Group;

    public get skillsName():string[] {
        return this._skillsName;
    }

    constructor() {
        super("Barbaric", 65, 30, 75, 85, 0);
    }

    public UseSkill(skillIndex:number, targetsEnemy:Character[], _targetAlly:Group) {
        const enemiesNames:string[] = [];
        const targetList: Character[] = [];
        for (const enemy of targetsEnemy) {
            if (!enemy.CanBeRevive()) {
                enemiesNames.push(enemy.name);
                targetList.push(enemy);
            }
        }
        const selectTarget = new Menu("Launch a skill!", "Choose an enemy:", enemiesNames);
        const selectedTarget = selectTarget.Naviguate();
        switch (skillIndex) {
            case (0): this.Skill1(targetList[selectedTarget]);
        }
    }

    private Skill1(target:Character) {
        const attack = new Attack([target], 1.3*this.atkValue, "Physical");
        this.HP = this.HP*0.8;
        attack.ApplyDmg();
    }
}