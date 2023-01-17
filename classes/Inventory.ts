import { Item } from "./Item.ts"

export class Inventory {
    private items:Item[] = [];

    public AddItem(item:Item):void {
        this.items.push(item)
    }

    public RemoveItem(itemIndex:number):void {
        this.items.splice(itemIndex, 1)
    }

    public ShowInventory() {
        console.log(this.items)
    }
}