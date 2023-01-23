
import { Ally } from "./Ally.ts"
import { Character } from "./Character.ts"
import { Color } from "./Color.ts";


export class Fight {
    private allyTeam : Ally[]
    private enemyTeam : Character[]
    private order : Character[]
    private whoTurn  = 1

    constructor(allyTeam : Ally[], enemyTeam :Character[] ){
        this.allyTeam  = allyTeam
        this.enemyTeam = enemyTeam
        this.order = this.SetFightOrder()
        this.EnemyAnnouncement()
    }
   
    private EnemyAnnouncement(){
        console.log(`the enemies appear are :`) 
        for(const enemy of this.enemyTeam){
            console.log(`- ${enemy.name}`)
        }
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
        console.log(` \n Turn ${this.whoTurn} \n`)
        for (const character of this.order){
            if(!character.CanBeRevive() && !this.IsTeamDead(this.allyTeam) && !this.IsTeamDead(this.enemyTeam)){
                if (this.enemyTeam.indexOf(character) == -1){
                    this.TurnAlly(character)
                }else{
                    console.log(`to the turn of ${character.name}`)
                    this.TurnEnemy(character)
                    prompt()
                    console.clear();
                    this.DisplayHP()
                    this.order = this.SetFightOrder()
                }
            }
        }
        this.whoTurn++
        this.order = this.SetFightOrder()
        prompt()
        console.clear();
        this.DisplayHP()
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

    private TurnAlly(allyAsset :Character){
        for(const ally of this.allyTeam){
            if (ally.name === allyAsset.name){
                console.log(`to the turn of ${ally.name}` )
                prompt()
                ally.Turn()
                console.clear();
                this.DisplayHP()
                this.order = this.SetFightOrder()
            }
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


    private DisplayHP(){
        console.log("here are the HP of your team: \n")
        for (const ally of this.allyTeam){
            this.DysplayHPBar(ally as Character)
        }
        console.log("\nhere are the HP of the enemies:\n ")
        for (const enemy of this.enemyTeam ){
            this.DysplayHPBar(enemy)
        }
        console.log(" ")
    }
    
    private DysplayHPBar(character :Character){
        console.log(`- ${character.name} as ${character.HP} HP`)
        const percentageHP = Math.floor(character.HP*100/character.maxHealth)
        let HPgreen =""
        let HPred =""
        for(let i=1; i<percentageHP;i++){
           HPgreen = HPgreen + "■"
        }
        for(let i=percentageHP; i<100;i++){
            HPred = HPred + "■"
        }
        console.log(Color.green +HPgreen+Color.red+HPred+Color.white ) 
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
