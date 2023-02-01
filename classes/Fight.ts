import { Cyclops } from "./Boss/Cyclops.ts";
import { Character } from "./Character.ts"
import { Color } from "./Color.ts";
import { Group } from "./Group.ts";



export class Fight {
    private allyTeam:Group;
    private enemyTeam:Character[];
    private order:Character[];
    private whoTurn = 1;

    constructor(allyTeam:Group, enemyTeam:Character[], boss:Cyclops|null = null) {
        this.allyTeam  = allyTeam;
        this.enemyTeam = enemyTeam;
        if (boss) {
            this.enemyTeam.push(boss);
        }
        this.order = this.SetFightOrder();
        this.EnemyAnnouncement();
    }
   
    private EnemyAnnouncement() {
        console.clear();
        console.log(`the enemies appear are :`);
        for(const enemy of this.enemyTeam) {
            console.log(`- ${enemy.name}`);
        }
        prompt("");
    }


    private SetFightOrder():Character[] {
        const order:Character[] = [];
        const Characters:Character[] = this.enemyTeam.concat(this.allyTeam.team);
        let fastestCharacter:Character;
        for (let i=0; i<(this.allyTeam.team.length+this.enemyTeam.length); i++) {
            fastestCharacter = Characters[0];
            for (const character of Characters) {
                if (fastestCharacter.atkSpeed < character.atkSpeed) {
                    fastestCharacter = character;
                }
            }
            Characters.splice(Characters.indexOf(fastestCharacter), 1);
            order.push(fastestCharacter);
        } 
        return order;
    }   

    public TurnFigth():boolean{
        console.clear();
        console.log(this.DisplayHP());
        console.log(`Turn ${this.whoTurn} \n`);
        prompt("");
        for (const character of this.order) {
            if (!character.CanBeRevive() && !this.IsTeamDead(this.allyTeam.team) && !this.IsTeamDead(this.enemyTeam)) {
                if (this.enemyTeam.indexOf(character) == -1) {
                    console.log(`to the turn of ${character.name}`);
                    prompt("");
                    this.TurnAlly(character);
                    console.clear();
                    console.log(this.DisplayHP());
                } else {
                    console.log(`to the turn of ${character.name}`);
                    if (character.name == "Cyclops") {
                        this.turnBoss(character as Cyclops);
                    } else {
                        this.TurnEnemy(character);
                    }
                    prompt("");
                    console.clear();
                    console.log(this.DisplayHP());
                    this.order = this.SetFightOrder();
                }
            }
        }
        this.whoTurn++;
        this.order = this.SetFightOrder();
        console.clear();
        console.log(this.DisplayHP());
        return this.NextTurn();
    }

    private NextTurn():boolean {
        if (this.IsTeamDead(this.enemyTeam)) {
            console.log("win");
            return true;
        } else if (this.IsTeamDead(this.allyTeam.team)) {
            console.log("loose");
            return false;
        } else {
            return this.TurnFigth();
        }
    }

    private turnBoss(boss:Cyclops) {
        const zoneAttack = Math.floor(Math.random() * 100);
        if (zoneAttack < 30) {
            boss.UseSkill(this.allyTeam.team);
        } else {
            this.TurnEnemy(boss);
        }
    }

    private TurnEnemy(enemy:Character) {
        const proba = Math.floor(Math.random() * 100);
        if (proba < 80) {
            let target = this.allyTeam.team[Math.floor(Math.random() * this.allyTeam.team.length)];
            while (target.HP <= 0) {
                target = this.allyTeam.team[Math.floor(Math.random() * this.allyTeam.team.length)];
            }
            enemy.Hit([target]);
        } else {
            enemy.Hit([this.AllyLessHP()]);
        }
    }

    private TurnAlly(allyAsset:Character) {
        for(const ally of this.allyTeam.team) {
            if (ally.name === allyAsset.name) {
                ally.Turn(this.enemyTeam,this,this.allyTeam);
                console.clear();
                console.log(this.DisplayHP());
                this.order = this.SetFightOrder();
            }
        }
    }

    private AllyLessHP():Character {
        let allyLessHP = this.allyTeam.team[0];
        for (const ally of this.allyTeam.team) {
            if (allyLessHP.HP<ally.HP && ally.HP>0) {
                allyLessHP = ally;
            }
        }
        return allyLessHP;
    }


    public DisplayHP():string {
        let display = "";
        display += ("here are the HP of your team: \n");
        for (const ally of this.allyTeam.team) {
            display += this.DisplayHPBar(ally);
        }
        display += ("\nhere are the HP of the enemies:\n ");
        for (const enemy of this.enemyTeam) {
            display += this.DisplayHPBar(enemy);
        }
        return display;
    }
    
    private DisplayHPBar(character:Character):string {
        const percentageHP = Math.floor(character.HP*100/character.maxHealth);
        let HPgreen = "";
        let HPred = "";
        for(let i = 1; i <= percentageHP; i++) {
           HPgreen += "■";
        }
        for(let i = percentageHP; i<100; i++) {
            HPred += "■";
        }
        return(`- ${character.name} as ${character.HP} HP \n`+Color.green +HPgreen+Color.red+HPred+Color.white +"\n");
    }

    private IsTeamDead(team:Character[]):boolean{
        let answer = true;
        for (const character of team ) {
            if (character.HP > 0) {
                answer = false; 
            }
        }
        return answer
    }
}

