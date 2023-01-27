import { Character } from "./Character.ts"
import { Skill } from "./Skill.ts";
import { Menu } from "./Menu.ts";
import { Fight } from "./Fight.ts";
import { Group } from "./Group.ts";

export class Ally extends Character {
    private _mana = 100;
    private skills:Skill[];
    public group: Group | null = null
    

    public get mana() {
        return this._mana
    }

    public set mana(value:number) {
        this._mana = Math.min(Math.max(value, 0), 100)
    }

    constructor(skills:Skill[], name: string, atkValue: number, defValue: number, atkSpeed: number, maxHealth: number) {
        super(name, atkValue, defValue, atkSpeed, maxHealth)
        this.skills = skills;
    }

    public UseSkill(skillName:string, target:Character) {
        let usedSkill:Skill;
        for (const skill of this.skills) {
            if (skill.name === skillName) {
                usedSkill = skill;
                this.mana -= skill.cost
                console.log(usedSkill, target, this.mana);
            }
        }
    }

    public  Turn(enemyTeam: Character[], fight: Fight, group:Group){
        const enemieName: string[] = []
        const targetList: Character[] = []
        for(const enemy of enemyTeam){
            if(!enemy.CanBeRevive()){
                enemieName.push(enemy.name)
                targetList.push(enemy)
            }
        }
        const chooseAction = new Menu(fight.DisplayHP(), `to the turn of ${this.name} `,["single attack","skil","inventory"])
        const choose =chooseAction.Naviguate()
        if (choose == 0){
            console.log("test")
            const menu = new Menu(fight.DisplayHP(),"who to attack",enemieName)
            const target = menu.Naviguate()
            this.hit(targetList[target])
            prompt("")
        }
        if(choose == 2 ){
            const itamsName: string[] = []
            for(const items of group.inventory.items){
                    itamsName.push(items.name)
            }
            const menu = new Menu(fight.DisplayHP(),"who to attack",itamsName)
            const target = menu.Naviguate()
            group.useItem(target,group.team[1])
            
        }
    }
}

