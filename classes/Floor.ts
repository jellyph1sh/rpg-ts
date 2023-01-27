import { Orientation, Room, RoomType } from "./Room.ts";


export class Floor {
    private ActualPostion = 12;
    public virtualFloor:number[][] = [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    private ActualRoom:Room = new Room(this.virtualFloor[Math.floor(this.ActualPostion/5)][this.ActualPostion%5], this.ActualPostion) 
    private _maxRooms = 0;

    public get maxRooms():number {
        return this._maxRooms
    }

    public set maxRooms(value:number) {
        this._maxRooms = Math.max(Math.min(value, 25), 5)
    }

    constructor(maxRooms:number){
        this.maxRooms = maxRooms;
        this.Generation(this._maxRooms);
    }

    ShowFloor() {
        const parseMap = [];
        let stringMap = "";
        for (let pos=0; pos<25; pos++) {
            let roomString = "";
            const posX = pos%5;
            const posY = Math.floor(pos/5);
            if (this.virtualFloor[posY][posX]) {
                if (posY-1 >= 0 && this.virtualFloor[posY-1][posX]) {
                    roomString += hWalls.upOpenWall
                } else {
                    roomString += hWalls.upWall
                }

                if (posX-1 >= 0 && this.virtualFloor[posY][posX-1]) {

                    if (posX+1 <= 5 && this.virtualFloor[posY][posX+1]) {
                        roomString += vWalls.OpenBothWall
                    } else {
                        roomString += vWalls.OpenLeftWall
                    }

                } else {

                    if (posX+1 <= 5 && this.virtualFloor[posY][posX+1]) {
                        roomString += vWalls.OpenRightWall
                    } else {
                        roomString += vWalls.Wall
                    }
                }

                if (posY+1 < 5 && this.virtualFloor[posY+1][posX]){
                    roomString += hWalls.downOpenWall
                } else {
                    roomString += hWalls.downWall
                }
            } else {
                roomString = "                   \n                   \n                   \n                   \n                   \n                   \n                   \n                   \n                   \n                   \n"
            }
            parseMap.push(roomString.split("\n"))
        }
        for (let n=0; n<5;n++) {
            for (let i=0; i<parseMap[0].length-1; i++) {
                for (let j=0; j<5;j++) {
                    if (j+5*n == this.ActualPostion && (i == 5 || i == 6)) {
                        parseMap[j+5*n][i] = parseMap[j+5*n][i].substring(0,9) + "☐" + parseMap[j+5*n][i].substring(10)
                    }
                    stringMap += parseMap[j+5*n][i]
                }
                stringMap += "\n"
            }
        }
        console.log(stringMap);
        console.log(this.virtualFloor);
        
        
        
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
            this.virtualFloor[Math.floor(position/5)][position%5] = 5
            return
        }
    }
}

enum vWalls {
    Wall = "│                 │\n│                 │\n│                 │\n│                 │\n│                 │\n│                 │\n│                 │\n│                 │\n",
    OpenLeftWall = "│                 │\n│                 │\n│                 │\n┘                 │\n┐                 │\n│                 │\n│                 │\n│                 │\n",
    OpenRightWall = "│                 │\n│                 │\n│                 │\n│                 └\n│                 ┌\n│                 │\n│                 │\n│                 │\n",
    OpenBothWall = "│                 │\n│                 │\n│                 │\n┘                 └\n┐                 ┌\n│                 │\n│                 │\n│                 │\n"
}

enum hWalls {
    upWall =        "┌─────────────────┐\n",
    upOpenWall =    "┌──────┘   └──────┐\n",
    downWall =      "└─────────────────┘\n",
    downOpenWall =  "└──────┐   ┌──────┘\n"
}