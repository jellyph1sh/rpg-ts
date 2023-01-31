export class Room {
    roomType:RoomType;
    position:number;
    possibleMovements:string[];

    constructor(typeZone:RoomType, position:number, possibleMovements:string[]) {
        this.roomType = typeZone;
        this.position = position;
        this.possibleMovements = possibleMovements;
    }
}

export enum RoomType {
    Void = 1,
    Fight = 2,
    Chest = 3,
    TrapChest = 4,
    BossFight = 5
}

export enum Orientation {
    Up = -5,
    Down = 5,
    Left = -1,
    Right = 1
}
