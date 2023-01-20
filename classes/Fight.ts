
import { Character } from "./Character.ts"
import { Group } from "./Group.ts"

export class Fight {
    private allyTeam : Group
    private enemyTeam : Character[]
    private order : Character[]
    private characterTurn :Character
    private whoTurn  = 0

    constructor(allyTeam : Group, enemyTeam :Character[] ){
        this.allyTeam  = allyTeam
        this.enemyTeam = enemyTeam
        this.order = this.SetFightOrder()
        this.characterTurn = this.order[0]
    }

    private SetFightOrder() : Character[]{
        const order : Character[] = []
        const listCharacter:Character[] = this.enemyTeam.concat(this.allyTeam.team)
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

    public TurnFigth(){
        for (const character of this.order){
        if (this.enemyTeam.indexOf(character) == -1){
            for(const ally of this.allyTeam.team){
                if (ally.name == character.name)
                ally.Turn()
            }
        }else{
            this.TurnEnemy(this.characterTurn)
        }
        }
        this.whoTurn++
    }

    private TurnEnemy(enemy :Character){
        const proba = Math.floor(Math.random() * 100);
        if (proba<80){
            enemy.hit(this.allyTeam.team[Math.floor(Math.random() * 3)])
        }else{
            enemy.hit(this.allyLessHP())
        }
    }

    private allyLessHP():Character{
        let allyLessHP =this.allyTeam.team[0]
        for(const ally of this.allyTeam.team){
            if (allyLessHP.HP<ally.HP)
            allyLessHP = ally
        }
        return allyLessHP
    }

    public IsTeamDead(team: Character[]): boolean{
        let answer = true
        for (const character of team ){
            if (character.HP > 0){
                answer = false 
            }
        }
        return answer
    }
}





