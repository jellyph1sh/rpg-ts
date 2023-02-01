import { Orientation, Room, RoomType } from "./Room.ts";


export class Floor {
    public actualPostion = 12;
    public virtualFloor:number[][] = [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    private _actualRoom:Room;
    private _maxRooms = 0;

    public get maxRooms():number {
        return this._maxRooms;
    }

    public set maxRooms(value:number) {
        this._maxRooms = Math.max(Math.min(value, 25), 5);
    }

    public get actualRoom():Room {
        return this._actualRoom;
    }
 
    constructor(maxRooms:number){
        this.maxRooms = maxRooms;
        this.Generation(this._maxRooms);
        this._actualRoom = new Room(this.virtualFloor[Math.floor(this.actualPostion/5)][this.actualPostion%5], this.actualPostion, this.PossibleMoves());
    }

    ShowFloor():string {
        const parseMap = [];
        let stringMap = "";
        for (let pos=0; pos<25; pos++) {
            let roomString = "";
            const posX = pos%5;
            const posY = Math.floor(pos/5);
            if (this.virtualFloor[posY][posX]) {
                if (posY-1 >= 0 && this.virtualFloor[posY-1][posX]) {
                    roomString += hWalls.upOpenWall;
                } else {
                    roomString += hWalls.upWall;
                }
                if (posX-1 >= 0 && this.virtualFloor[posY][posX-1]) {
                    if (posX+1 <= 5 && this.virtualFloor[posY][posX+1]) {
                        roomString += vWalls.OpenBothWall;
                    } else {
                        roomString += vWalls.OpenLeftWall;
                    }
                } else {
                    if (posX+1 <= 5 && this.virtualFloor[posY][posX+1]) {
                        roomString += vWalls.OpenRightWall;
                    } else {
                        roomString += vWalls.Wall;
                    }
                }
                if (posY+1 < 5 && this.virtualFloor[posY+1][posX]) {
                    roomString += hWalls.downOpenWall;
                } else {
                    roomString += hWalls.downWall;
                }
            } else {
                roomString = "                   \n                   \n                   \n                   \n                   \n                   \n                   \n                   \n";
            }
            parseMap.push(roomString.split("\n"));
        }
        for (let n=0; n<5;n++) {
            for (let i=0; i<parseMap[0].length-1; i++) {
                for (let j=0; j<5;j++) {
                    if (j+5*n == this.actualPostion && (i == 5 || i == 6)) {
                        parseMap[j+5*n][i] = parseMap[j+5*n][i].substring(0,9) + "☐" + parseMap[j+5*n][i].substring(10);
                    }
                    stringMap += parseMap[j+5*n][i];
                }
                stringMap += "\n";
            }
        }
        return stringMap;
    }

    private AddRoom(position:number, type:RoomType) {
        this.virtualFloor[Math.floor(position/5)][position%5] = type;
    }

    ShowRoom():Room {
        return this.actualRoom;
    }

    Move(orientation:Orientation) {
        this.virtualFloor[Math.floor(this.actualPostion/5)][this.actualPostion%5] = 1;
        if (((this.actualPostion + orientation) >= 0 && (this.actualPostion + orientation) < 25)) {
            if (this.virtualFloor[Math.floor((this.actualPostion+orientation)/5)][(this.actualPostion+orientation)%5]) {
                this.actualPostion += orientation;
                this._actualRoom = new Room(this.virtualFloor[Math.floor(this.actualPostion/5)][this.actualPostion%5], this.actualPostion, this.PossibleMoves());
            }
        }
    }

    public PossibleMoves():string[] {
        const nextOrientations:string[] = [];
        const orientations = [Orientation.Up, Orientation.Down, Orientation.Left, Orientation.Right];
        for (const nextOrientation of orientations) {
            if (!(this.actualPostion+nextOrientation>24 || this.actualPostion+nextOrientation<0)) {
                if (nextOrientation == Orientation.Left) {
                    if ((this.actualPostion)%5!=0) {
                        if (this.virtualFloor[Math.floor((this.actualPostion+nextOrientation)/5)][(this.actualPostion+nextOrientation)%5]!=0) {
                            nextOrientations.push("Left");
                        }
                    }
                } else if (nextOrientation == Orientation.Right) {
                    if ((this.actualPostion)%5!=4) {
                        if (this.virtualFloor[Math.floor((this.actualPostion+nextOrientation)/5)][(this.actualPostion+nextOrientation)%5]!=0) {
                            nextOrientations.push("Right");
                        }
                    }
                } else if (nextOrientation == Orientation.Up) {
                    if (this.actualPostion >= 5) {
                        if (this.virtualFloor[Math.floor((this.actualPostion+nextOrientation)/5)][(this.actualPostion+nextOrientation)%5]!=0) {
                            nextOrientations.push("Up");
                        }
                    }
                } else if (nextOrientation == Orientation.Down) {
                    if (this.actualPostion < 20) {
                        if (this.virtualFloor[Math.floor((this.actualPostion+nextOrientation)/5)][(this.actualPostion+nextOrientation)%5]!=0) {
                            nextOrientations.push("Down");
                        }
                    }
                }
            }
        }
        return nextOrientations;
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
            const orientation:Orientation =  orientations[Math.floor(Math.random()*orientations.length)];
            const newPosition = position + orientation;
            if ((newPosition)>= 0 && (newPosition)< 25) {
                const nextPosition:number = this.virtualFloor[Math.floor(newPosition/5)][newPosition%5];
                if (!nextPosition) {
                    const roomType:RoomType = roomTypes[Math.floor(Math.random()*4)];
                    this.AddRoom(newPosition, roomType);
                    orientations = [Orientation.Up, Orientation.Down, Orientation.Left, Orientation.Right];
                    const index = orientations.indexOf(orientation*-1, 0);
                    if (index > -1) {
                        orientations.splice(index, 1);
                    }
                    return this.Generation(MaxRooms-1, newPosition, orientations);
                } else {
                    const index = orientations.indexOf(orientation, 0);
                    if (index > -1) {
                        orientations.splice(index, 1);
                    }
                    return this.Generation(MaxRooms, position, orientations);
                }
            } else {
                const index = orientations.indexOf(orientation, 0);
                    if (index > -1) {
                        orientations.splice(index, 1);
                    }
                return this.Generation(MaxRooms, position, orientations);
        
            }
        } else {
            this.virtualFloor[Math.floor(position/5)][position%5] = 5;
            return;
        }
    }
}

enum vWalls {
    Wall = "│                 │\n│                 │\n│                 │\n│                 │\n│                 │\n│                 │\n",
    OpenLeftWall = "│                 │\n│                 │\n┘                 │\n┐                 │\n│                 │\n│                 │\n",
    OpenRightWall = "│                 │\n│                 │\n│                 └\n│                 ┌\n│                 │\n│                 │\n",
    OpenBothWall = "│                 │\n│                 │\n┘                 └\n┐                 ┌\n│                 │\n│                 │\n"
}

enum hWalls {
    upWall =        "┌─────────────────┐\n",
    upOpenWall =    "┌──────┘   └──────┐\n",
    downWall =      "└─────────────────┘\n",
    downOpenWall =  "└──────┐   ┌──────┘\n"
}

type movement = {
    orientation:Orientation;
    description:string;
} 