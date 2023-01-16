import { Character } from "./Character.ts"


export class Fight {
    private allyTeam : Character[]
    private enemyTeam : Character[]
    private order : Character[]
    public whoTurn  = 0

    constructor(allyTeam : Character[], enemyTeam :Character[] ){
        this.allyTeam  = allyTeam
        this.enemyTeam = enemyTeam
        this.order = this.SetFightOrder()
    }

    private SetFightOrder() : Character[]{
        const order : Character[] = []
        const listCharacter = this.allyTeam.concat(this.enemyTeam)
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





