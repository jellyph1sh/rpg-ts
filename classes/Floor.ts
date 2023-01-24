import { Orientation, Room, RoomType } from "./Room.ts";


export class Floor {
    private ActualPostion = 12;
    private virtualFloor:number[][] = [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    private ActualRoom:Room = new Room(this.virtualFloor[Math.floor(this.ActualPostion/5)][this.ActualPostion%5], this.ActualPostion) 
    private _maxRooms = 0;

    public get maxRooms():number {
        return this._maxRooms
    }

    public set maxRooms(value:number) {
        this._maxRooms = Math.max(Math.min(value, 25), 5)
    }

    constructor(maxRooms:number){
        this.maxRooms = maxRooms
        this.Generation(this._maxRooms)
    }

    ShowFloor() {
        console.log(this.virtualFloor)
    }

    private AddRoom(position:number, type:RoomType) {
        this.virtualFloor[Math.floor(position/5)][position%5] = type
    }

    ShowRoom() {
        console.log(this.ActualRoom)
    }

    Move(orientation:Orientation) {
        if (((this.ActualPostion +orientation) > 0 && (this.ActualPostion +orientation) < 25)) {
            if (this.virtualFloor[Math.floor((this.ActualPostion+orientation)/5)][(this.ActualPostion+orientation)%5]) {
                this.ActualPostion += orientation
                this.ActualRoom = new Room(this.virtualFloor[Math.floor(this.ActualPostion/5)][this.ActualPostion%5], this.ActualPostion)
            }
        }
    }

    private Generation(MaxRooms:number, position=12, orientations:Orientation[]=[Orientation.Up, Orientation.Down, Orientation.Left, Orientation.Right]):void{
        const roomTypes:RoomType[] = [RoomType.Chest, RoomType.Fight, RoomType.TrapChest, RoomType.Void];
        console.log(`Max room : ${MaxRooms}`)
        if (position%5 == 0) {
            const index = orientations.indexOf(Orientation.Left, 0);
                    if (index > -1) {
                        orientations.splice(index, 1);
                    }
        } else if (position%5 == 4) {
            const index = orientations.indexOf(Orientation.Right, 0);
                    if (index > -1) {
                        orientations.splice(index, 1);
                    }
        }
        if (Math.floor(position/5) == 0) {
            const index = orientations.indexOf(Orientation.Up, 0);
                    if (index > -1) {
                        orientations.splice(index, 1);
                    }
        } else if (Math.floor(position/5) == 4) {
            const index = orientations.indexOf(Orientation.Down, 0);
                    if (index > -1) {
                        orientations.splice(index, 1);
                    }
        }
        if (MaxRooms>0 && orientations.length>0) {
            const orientation:Orientation =  orientations[Math.floor(Math.random()*orientations.length)]
            console.log(orientations, `orientation: ${orientation}`);
            const newPosition = position+orientation
            if ((newPosition)>= 0 && (newPosition)< 25) {
                const nextPosition:number = this.virtualFloor[Math.floor(newPosition/5)][newPosition%5] 
                if (!nextPosition) {
                    const roomType:RoomType =  roomTypes[Math.floor(Math.random()*4)];
                    this.AddRoom(newPosition, roomType);
                    orientations = [Orientation.Up, Orientation.Down, Orientation.Left, Orientation.Right]
                    const index = orientations.indexOf(orientation*-1, 0);
                    if (index > -1) {
                        orientations.splice(index, 1);
                    }
                    return this.Generation(MaxRooms-1, newPosition, orientations)
                } else {
                    const index = orientations.indexOf(orientation, 0);
                    if (index > -1) {
                        orientations.splice(index, 1);
                    }
                    return this.Generation(MaxRooms, position, orientations)
                }
            } else {
                const index = orientations.indexOf(orientation, 0);
                    if (index > -1) {
                        orientations.splice(index, 1);
                    }
                return this.Generation(MaxRooms, position, orientations)
        
            }
        } else {
            return
        }
    }
}
