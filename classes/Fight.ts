
import { Ally } from "./Ally.ts"
import { Character } from "./Character.ts"
import { Skill } from "./Skill.ts"

export class Fight {
    private allyTeam : Ally[]
    private enemyTeam : Character[]
    private order : Character[]
    private whoTurn  = 1

    constructor(allyTeam : Ally[], enemyTeam :Character[] ){
        this.allyTeam  = allyTeam
        this.enemyTeam = enemyTeam
        this.order = this.SetFightOrder()
    }

    private SetFightOrder() : Character[]{
        const order : Character[] = []
        const listCharacter:Character[] = this.enemyTeam.concat(this.allyTeam)
        let characterMoreSpeed : Character
        for (let i =0; i<4; i++){
            characterMoreSpeed = listCharacter[0]
            for(const character of listCharacter){
                if (characterMoreSpeed.atkSpeed < character.atkSpeed){
                    characterMoreSpeed = character
                }
            }
            listCharacter.splice(listCharacter.indexOf(characterMoreSpeed),1)
            order.push(characterMoreSpeed)
        } 
        return order
    }   

    // retourne vrais si c'est le joueur qui gagnier le fight sinon retour faux
    public TurnFigth() : boolean{
        console.log(`Turn ${this.whoTurn}`)
        for (const character of this.order){
            if(!character.CanBeRevive() && !this.IsTeamDead(this.allyTeam) && !this.IsTeamDead(this.enemyTeam)){
                if (this.enemyTeam.indexOf(character) == -1){
                    for(const ally of this.allyTeam){
                        if (ally.name === character.name){
                            console.log(`to the turn of ${ally.name}` )
                            ally.Turn()
                            this.order = this.SetFightOrder()
                        }
                    }
                }else{
                    console.log(`to the turn of ${character.name}`)
                    this.TurnEnemy(character)
                    this.order = this.SetFightOrder()
                }
            }
        }
        this.whoTurn++
        this.order = this.SetFightOrder()
        return this.nextTurn()
    }

    private nextTurn() : boolean {
        if (this.IsTeamDead(this.enemyTeam)){
            console.log("win")
            return true
        } else if (this.IsTeamDead(this.allyTeam)){
            console.log("loose")
            return false
        } else {
            return this.TurnFigth()
        }
    }

    
    private TurnEnemy(enemy :Character){
        const proba = Math.floor(Math.random() * 100);
        if (proba<80){
            let target = this.allyTeam[Math.floor(Math.random() * this.allyTeam.length)]
            while(target.HP <= 0){
                target = this.allyTeam[Math.floor(Math.random() * this.allyTeam.length)]
            }
            enemy.hit(target)
        }else{
            enemy.hit(this.allyLessHP())
        }
    }

    private allyLessHP():Character{
        let allyLessHP =this.allyTeam[0]
        for(const ally of this.allyTeam){
            if (allyLessHP.HP<ally.HP && ally.HP>0)
            allyLessHP = ally
        }
        return allyLessHP
    }

    private IsTeamDead(team: Character[]): boolean{
        let answer = true
        for (const character of team ){
            if (character.HP > 0){
                answer = false 
            }
        }
        return answer
    }
}

const atake = new Skill(15,"physyqye", "ff", 14)

const mage = new Ally([atake], "gordalfe", 20, 10,50,120)
const gladia = new Ally([atake], "link", 70, 40,40,150)
const slim = new Character( "slim", 50, 30,80,150)  
const goleme = new Character( "goleme", 20, 60,10,150)
const combat = new Fight([mage,gladia],[goleme,slim])
combat.TurnFigth()

