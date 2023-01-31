import {Color} from "./Color.ts";

export class Menu {
    private title:string;
    private description:string;
    private buttons:string[];
    private input = 0;

    constructor(title:string, description:string, buttons:string[]) {

        console.clear()
        this.title = title;
        this.description = description;
        this.buttons = buttons;
    }

    private Up():void {
        if (this.input > 0) {
            this.input -= 1;
        }
    }

    private Down():void {
        if (this.input !== this.buttons.length - 1) {
            this.input += 1;
        }
    }

    public Naviguate():number {
        /*  Up : 27 91 65 
            Down : * * 66
            Enter : 13 0 0*/
        
        let enter = false;
        while (!enter) {
            this.Display();
            const buf = new Uint8Array(3);
            Deno.stdin.setRaw(true);
            Deno.stdin.readSync(buf);
            Deno.stdin.setRaw(false);
            if (buf[0] === 27 && buf[1] === 91, buf[2] === 65) {
                this.Up();
            } else if (buf[0] === 27 && buf[1] === 91, buf[2] === 66) {
                this.Down();
            } else if (buf[0] === 13 && buf[1] === 0, buf[2] === 0) {
                enter = !enter;
            }
        }
        
        return this.input;
    }

    private Display():void {
        console.log(this.title);
        console.log(this.description);
        for(let i=0; i < this.buttons.length; i++) {
            const text = `${i+1}. ${this.buttons[i]}.`;
            let color = Color.white;
            if (this.input === i) {
                color = Color.red;
            }
            console.log(color + text + Color.white);
        }
    }
}
