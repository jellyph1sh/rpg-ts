import { Ally } from "./Ally.ts";
import { Inventory } from "./Inventory.ts";

export class Group {
    private _team:Ally[];
    public inventory:Inventory;

    public get team():Ally[] {
        return this._team
    }

    constructor(Ally1:Ally, Ally2:Ally, Ally3:Ally, inventory:Inventory){
        this._team = [Ally1, Ally2, Ally3]
        this.inventory = inventory
    }

    setBouttonInventory():string[]{
        const repont :string[]=[]
        for(let i=1; i <= this.inventory.items.length; i++){
            repont.push(this.inventory.items[i].name)
        }

        return repont
    }

    UseItem(indexItem:number, target :Ally):boolean{
        let itemtoUse = false
        if(this.inventory.items[indexItem].effect == "Revive" ){
            if (target.CanBeRevive()){
                target.Revive(this.inventory.items[indexItem].value)
                itemtoUse = true
            }
        }
        if(this.inventory.items[indexItem].effect == "Heal" ){
            if (target.CanBeHeal()){
                target.Heal(this.inventory.items[indexItem].value)
                itemtoUse = true
            }
        }
        if (this.inventory.items[indexItem].effect == "Mana" ){
            if (target.CanBeRestoreMana()){
                target.restoreMana(this.inventory.items[indexItem].value)
                itemtoUse = true
            }
        }
        return itemtoUse
    }

}