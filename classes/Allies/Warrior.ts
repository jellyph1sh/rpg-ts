import { Ally } from "../Ally.ts";
import { Character } from "../Character.ts";
import { Group } from "../Group.ts";

export class Warrior extends Ally {
    protected _skillsName = [];
    protected _team!: Group;

    constructor() {
        super("Warrior", 65, 65, 50, 120, 0);
    }

    public UseSkill(_skillIndex: number, _targetEnemy: Character[], _targetAlly: Group): void {
    }
}