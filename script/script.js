const player = document.querySelector('.player');
const background = document.querySelector('.background');
const home = document.querySelector('.home');
const content = document.querySelector('.content');
const soundToggle = document.querySelector('#soundToggle');
const score = document.querySelector('#score');
const record = document.querySelector('#record');

//audios
const audio1 = document.querySelector('#intro');
const audio2 = document.querySelector('#jump');
const audio3 = document.querySelector('#died');

let isJumping = false;
let position = 0;  //player position 


//score
let highScore = 0;
let totalScore = 0;
let actualScore = 0;

//Do have Data?
let thereIsData = ()=>{
if (highScore > 0 ){
 return true;
 } else{
  return false;
}
}


const SCORE_PARCIAL = setInterval(() => {
    totalScore++
    score.innerText = totalScore
    actualScore = totalScore;
    return actualScore;
    
},200)


function stopScore(){
    localStorage.setItem('actualScore',actualScore);
    clearInterval(SCORE_PARCIAL)
    isRecord();
}



 function isRecord (){

    if (!thereIsData)
    {
    localStorage.setItem('recordScore', actualScore);
    return highScore = localStorage.getItem('recordScore');
    }
    else{
        let scoreData = localStorage.getItem('recordScore');
            if(actualScore >= scoreData){
           return localStorage.setItem('recordScore', actualScore);
        }
    }
 }


function updateScreen(){
  
    record.innerText = localStorage.getItem('recordScore');
}


function handleKeyUp(event){

    if(event.keyCode === 32){

        if(!isJumping){
        jump();
        }
    }
    else if(event.keyCode === 38){
        if(!isJumping){
            jump();
            }
    }

}

function jump(){
    
    isJumping = true;

    let upInterval = setInterval(()=>{
        if(position >= 260){
            clearInterval(upInterval);

            //Down
            let downInterval = setInterval(()=>{
                if(position <=0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                position -= 40;
                player.style.bottom = `${position}px`;
            }
            }, 20);
        }
        
        else{

            //up
            audio2.play();
            position += 40;
             player.style.bottom = `${position}px`;
            }
        }, 20);
}

function createObstacle(){
    const obstacle = document.createElement('img');
    let obstaclePosition = window.innerWidth - 120;
    let randomTime =  Math.random()*3000 + Math.random()*3000;
    

    obstacle.classList.add('obstacle');
    obstacle.style.left = 1000 + 'px';
    obstacle.src='../assets/obstacle.gif'
    background.appendChild(obstacle);

    //movin


    let leftInterval = setInterval(()=>{
   
        if (obstaclePosition <= -obstaclePosition){
            clearInterval(leftInterval);
            background.removeChild(obstacle);
        } else if( obstaclePosition > 0 && obstaclePosition < 60 && position < 60){
        
            //gameover
            audio3.play();
            stopScore();
        
            // isRecord();
            setTimeout(()=>{
            clearInterval(leftInterval);
            document.body.innerHTML = `<div class='gameOver'> <h1>GAME OVER</h1><h3>SCORE: ${actualScore}</h3><button onclick='restart(this)'>RESTART</button><button onclick='backHome(this)'>HOME</button></div>`;
            },250);

        }else{
            obstaclePosition -= 10;   //obstacle speed , for change the game level.
            obstacle.style.left = `${obstaclePosition}px`;    
        }
    }, 20)

    setTimeout(createObstacle, randomTime);

  


}



document.addEventListener('keyup', handleKeyUp);

//Events

function restart (){
    window.location.reload()
}

function start(){
    
   window.location.replace('../gameboard.html')

}

function backHome(){

    window.location.replace('../index.html')

}


//sound Toggle

let activateSound = true;

function sound(){
    let action = !activateSound;

    if(!action){
        soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>'
        audio1.pause();
        return activateSound = false;
    }else{
        soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>'
        audio1.play();
        return activateSound = true;
    }

}


createObstacle();

updateScreen()





