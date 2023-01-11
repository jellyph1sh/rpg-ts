export class Inventory {
    Items:Item[] = [];

    AddItem(item:Item):void {
        this.Items.push(item)
    }

    RemoveItem(itemIndex:number):void {
        this.Items.splice(itemIndex, 1)
    }

    ShowInventory() {
        console.log(this.Items)
    }
}

class Item {
    Effect:string = "";
    Amount:number = 1;

    constructor(effect:string){
        this.Effect = effect;
    }
}