import {Color} from "./Color.ts";

export class Menu {
    title:string;
    description:string;
    buttons:string[];
    input:number = 0;

    constructor(title:string, description:string, buttons:string[]) {
        this.title = title;
        this.description = description;
        this.buttons = buttons;
    }

    up() {
        if (this.input > 0) {
            this.input -= 1;
        }
    }

    down() {
        if (this.input !== this.buttons.length - 1) {
            this.input += 1;
        }
    }

    Naviguate() {
        let enter = false;
        while (!enter) {
            this.display();
            let consoleInput = window.prompt("Choice >> ")
            if (consoleInput === "up") {
                this.up();
            } else if (consoleInput === "down") {
                this.down();
            } else if (consoleInput === "enter") {
                enter = !enter;
            }
        }
        return this.input;
    }

    display():void {
        console.clear();
        console.log(this.title);
        console.log(this.description);
        for(let i=0; i < this.buttons.length; i++) {
            let text = `${i+1}. ${this.buttons[i]}.`;
            let color = Color.white;
            if (this.input === i) {
                color = Color.red;
            }
            console.log(color + text + Color.white);
        }
    }
}

let menuTest = new Menu("Test", "Description de test", ["Rémi", "Emeric", "Sacha"]);
console.log(menuTest.Naviguate());
