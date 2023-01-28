import { Character } from "./Character.ts"
import { Skill } from "./Skill.ts";
import { Menu } from "./Menu.ts";
import { Fight } from "./Fight.ts";
import { Group } from "./Group.ts";

export class Ally extends Character {
    private _mana = 100;
    private skills:Skill[];
    
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
        let startAgain =true
        while(startAgain){
            startAgain =false
            const chooseAction = new Menu(fight.DisplayHP(), `to the turn of ${this.name} `,["single attack","skil","inventory"])
            const choose =chooseAction.Naviguate()
            switch(choose){
            case 0:
                this.AllyAttack(enemyTeam, fight)
                break;
            case 2:
                if (group.inventory.items.length != 0){
                    startAgain=!this.AllyInventory(group,fight)
                }else{
                    console.log("you no longer have an object")
                    startAgain=true
                    prompt("")
                }
                break
            }
        }
        prompt("")
    }

private AllyAttack(enemyTeam: Character[], fight: Fight){
    const enemieName: string[] = []
        const targetList: Character[] = []
        for(const enemy of enemyTeam){
            if(!enemy.CanBeRevive()){
                enemieName.push(enemy.name)
                targetList.push(enemy)
            }
        }
        console.log("test")
        const menu = new Menu(fight.DisplayHP(),"who to attack",enemieName)
        const target = menu.Naviguate()
        this.hit([targetList[target]])
    }

    private AllyInventory(group: Group, fight: Fight) :boolean{
        const itemsName: string[] = []
        for(const items of group.inventory.items){
            itemsName.push(items.name +" X " +items.amount)
        }
        const allyName: string[] = []
        for(const ally of group.team){
            allyName.push(ally.name)
        }
        const inventoryMenu = new Menu(fight.DisplayHP(),"what item do you want to usewho to item ?",itemsName)
        const chooseItem = inventoryMenu.Naviguate()
        const chooseAllyMenu = new Menu(fight.DisplayHP(),"on which ?",allyName)
        const indexAlly = chooseAllyMenu.Naviguate()
        const use = group.UseItem(chooseItem,group.team[indexAlly])
        if (use){
            group.inventory.RemoveItem(chooseItem)
            return true

        }else{
            console.log(`you can't use ${group.inventory.items[chooseItem].name} on ${group.team[indexAlly].name}`)
            prompt("")
            return false
        }
    }

    restoreMana(mana: number){
        if (mana + this._mana >= 100) {
            this.HP =this.maxHealth
            console.log(`${this.name}has found all his mana, it has ${this._mana} mana.`)
        }else{
            this._mana=this._mana + mana
            console.log(`you have restore ${mana} from mana. ${this.name}it to ${this._mana} mana.`)
        }
    }

    CanBeRestoreMana(): boolean{
        if(this.HP <= 0 || this._mana == 100){
            return false
        }else{
            return true
        }
    }
}

