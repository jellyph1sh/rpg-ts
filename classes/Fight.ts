import { Ally } from "./Ally.ts"
import { Character } from "./Character.ts"


export class Fight {
    private allyTeam : Ally[]
    private enemyTeam : Character[]
    private order : Character[]
    private characterTurn :Character
    private whoTurn  = 1

    constructor(allyTeam : Ally[], enemyTeam :Character[] ){
        this.allyTeam  = allyTeam
        this.enemyTeam = enemyTeam
        this.order = this.SetFightOrder()
        this.characterTurn = this.order[0]
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

    public TurnFigth() : boolean{
        console.log(`Turn ${this.whoTurn}`)
        for (const character of this.order){
            if(!character.CanBeRevive() || this.IsTeamDead(this.allyTeam) || this.IsTeamDead(this.enemyTeam)){
                if (this.enemyTeam.indexOf(character) == -1){
                    for(const ally of this.allyTeam){
                        if (ally.name === character.name){
                            ally.Turn()
                            console.log(`to the turn of ${ally.name}` )
                        }
                    }
                }else{
                    this.TurnEnemy(character)
                    console.log(`to the turn of ${character.name}`)
                }
            }
        }
        this.whoTurn++
        return this.nextTurn()
    }

    private nextTurn() : boolean {
        if (this.IsTeamDead(this.enemyTeam)){
            console.log("win")
            return true
        } else if (this.IsTeamDead(this.allyTeam)){
            console.log("perdu")
            return false
        } else {
            return this.TurnFigth()
        }
    }

    // retourne vrais si c'est le joueur qui gagnier le fight sinon retour faux
    private TurnEnemy(enemy :Character){
        const proba = Math.floor(Math.random() * 100);
        const target = this.allyTeam[Math.floor(Math.random() * this.allyTeam.length)]
        if (proba<80){
            for (const character of this.order){
                if (character.name === target.name){
                    enemy.hit(character)
                }
            }
        }else{
            enemy.hit(this.allyLessHP())
        }
    }

    private allyLessHP():Character{
        let allyLessHP =this.allyTeam[0]
        for(const ally of this.allyTeam){
            if (allyLessHP.HP<ally.HP)
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

