
import { Character } from "./Character.ts"
import { Color } from "./Color.ts";
import { Group } from "./Group.ts";



export class Fight {
    private allyTeam : Group
    private enemyTeam : Character[]
    private order : Character[]
    private whoTurn  = 1

    constructor(allyTeam : Group, enemyTeam :Character[] ){
        this.allyTeam  = allyTeam
        this.enemyTeam = enemyTeam
        this.order = this.SetFightOrder()
        this.EnemyAnnouncement()
    }
   
    private  EnemyAnnouncement(){
        console.clear();
        console.log(`the enemies appear are :`) 
        for(const enemy of this.enemyTeam){
            console.log(`- ${enemy.name}`)
        }
        prompt("")
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

    // retourne vrais si c'est le joueur qui gagnier le fight sinon retour faux
    public  async TurnFigth() : Promise<boolean>{
        console.clear();
        console.log(this.DisplayHP())
        console.log(`Turn ${this.whoTurn} \n`)
        await this.delay(2)
        for (const character of this.order){
            if(!character.CanBeRevive() && !this.IsTeamDead(this.allyTeam.team) && !this.IsTeamDead(this.enemyTeam)){
                if (this.enemyTeam.indexOf(character) == -1){
                    console.log(`to the turn of ${character.name}` )
                    this.TurnAlly(character)
                    await this.delay(2)
                    console.clear();
                    console.log(this.DisplayHP())
                }else{
                    console.log(`to the turn of ${character.name}`)
                    this.TurnEnemy(character)
                    await this.delay(4)
                    console.clear();
                    console.log(this.DisplayHP())
                    this.order = this.SetFightOrder()
                }
            }
        }
        this.whoTurn++
        this.order = this.SetFightOrder()
        console.clear();
        console.log(this.DisplayHP())
        return this.nextTurn()
    }

    private nextTurn() : Promise<boolean> {
        if (this.IsTeamDead(this.enemyTeam)){
            console.log("win")
            return Promise.resolve(true)
        } else if (this.IsTeamDead(this.allyTeam.team)){
            console.log("loose")
            return Promise.resolve(false)
        } else {
            return this.TurnFigth()
        }
    }

    
    private TurnEnemy(enemy :Character){
        const proba = Math.floor(Math.random() * 100);
        if (proba<80){
            let target = this.allyTeam.team[Math.floor(Math.random() * this.allyTeam.length)];
            while(target.HP <= 0){
                target = this.allyTeam.team[Math.floor(Math.random() * this.allyTeam.length)];
            }
            enemy.hit([target]);
        }else{
            enemy.hit([this.allyLessHP()]);
        }
    }

    private TurnAlly(allyAsset :Character){
        for(const ally of this.allyTeam.team){
            if (ally.name === allyAsset.name){
                ally.Turn(this.enemyTeam,this,this.allyTeam)
                console.clear();
                console.log(this.DisplayHP())
                this.order = this.SetFightOrder()
            }
        }
    }

    private allyLessHP():Character{
        let allyLessHP =this.allyTeam.team[0]
        for(const ally of this.allyTeam.team){
            if (allyLessHP.HP<ally.HP && ally.HP>0)
            allyLessHP = ally
        }
        return allyLessHP
    }


    public DisplayHP():string{
        let display = ""
        display= display +("here are the HP of your team: \n")
        for (const ally of this.allyTeam.team){
            display= display +this.DysplayHPBar(ally as Character)
        }
        display= display +("\nhere are the HP of the enemies:\n ")
        for (const enemy of this.enemyTeam ){
            display= display +this.DysplayHPBar(enemy)
        }
        return display
    }
    
    private DysplayHPBar(character :Character):string{
        const percentageHP = Math.floor(character.HP*100/character.maxHealth)
        let HPgreen =""
        let HPred =""
        for(let i=1; i<=percentageHP;i++){
           HPgreen = HPgreen + "■"
        }
        for(let i=percentageHP; i<100;i++){
            HPred = HPred + "■"
        }
        return(`- ${character.name} as ${character.HP} HP \n`+Color.green +HPgreen+Color.red+HPred+Color.white +"\n") 
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

    delay(n:number){
        return new Promise(function(resolve){
            setTimeout(resolve,n*1000);
        });
    }
    
}

