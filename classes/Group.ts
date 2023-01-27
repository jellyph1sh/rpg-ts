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
        Ally1.group=this
        Ally2.group=this
        Ally3.group=this
    }

    setBouttonInventory():string[]{
        const repont :string[]=[]
        for(let i=1; i <= this.inventory.items.length; i++){
            repont.push(this.inventory.items[i].name)
        }

        return repont
    }

    useItem(indexItem:number, target :Ally):boolean{
        if(this.inventory.items[indexItem].effect == "Revive" ){
            if (target.CanBeRevive()){
                target.Revive(50)
                return true
            }else{
                return false
            }
        }
        return false
    }
}