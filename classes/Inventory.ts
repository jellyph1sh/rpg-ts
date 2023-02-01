import { Item } from "./Item.ts"

export class Inventory {
    private _items:Item[] = [];
    
    public get items() {
        return this._items;
    }

    private AddNewItem(item:Item) {
        this._items.push(item);
    }

    // c'est cette método pour rajouter des item
    public AddItem(newItem :Item) {
        const ListItemName :string[] = [];
        for (const item  of this._items) {
            ListItemName.push(item.name);
        }
        if (ListItemName.indexOf(newItem.name) == -1) {
            this.AddNewItem(newItem);
        } else {
            this._items[ListItemName.indexOf(newItem.name)].amount++;
        }

    }

    public RemoveItem(itemIndex:number):void {
        if (this._items[itemIndex].amount == 1) {
            this._items.splice(itemIndex, 1);
        } else {
            this._items[itemIndex].amount--;
        }
    }
}