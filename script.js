var startButton = document.querySelector("#startbutton")
let messageEl = document.querySelector("#message");
let timerEl = document.querySelector("#timer");
let gameoverEl = document.querySelector("#gameover")
let card = document.getElementById("card"); 
let Timer;
let currentTime;
 
var questions = [
    {
        q: "In which HTML element do we put in JavaScript code?",
        o: [
            "1. <js>","2. <script>", "3. <body>", "4. <link>"
        ],
        a: "1. <js>"
    },
    {
        q: "Which HTML attribute is used to reference an external JavaScript file?",

        o: [
            "1. src","2. rel", "3. href", "4. type"
        ],
        a: "1. src"
    },
    {
        q: "A variable in JavaScript must start with which special character",
        o: [
            "1. @","2. $", "3. #", "4. No special characters"
        ],
        a: "2. $"
    },
    {
        q: "Where is the correct place to insert a JavaScript?",
        o: [
            "1. The <body> section","2. The <head> section", "3. Both the <head> and <body> section are correct", "4. In the <footer> section"
        ],
        a: "3. Both the <head> and <body> section are correct",
    }

]


startButton.addEventListener ("click", function(){

    currentTime = 60;
    timerEl.textContent = currentTime;

    card.style.display = "block"
    startButton.style.display="none" 

   
   
    myTimer = setInterval(function (){


        currentTime = currentTime -1;
        if(currentTime <= 0){
            timerEl.textContent = 0;
            showGameOver()
        } else {
            timerEl.textContent = currentTime;
        }
     
    


    }, 1000) 



})



function showQuestion(currentQuestion) {
    
     card.innerHTML = ""; 

    let answer = questions[currentQuestion].a; 
    let questionElement = document.createElement("h2"); 
    questionElement.textContent = questions[currentQuestion].q; 
    
     
    card.appendChild(questionElement); 
    
    
    for(let i = 0; i < 4; i++){ 
        let optionEl = document.createElement("button");
        optionEl.textContent = questions[currentQuestion].o[i] 
        optionEl.addEventListener("click", function(event){ 
           if(answer == event.target.textContent){
            console.log("Correct!");
            messageEl.style.color ="green";
            messageEl.textContent = "Correct";
           
            
            console.log("check:",currentQuestion, questions.length - 1)
            if(currentQuestion == (questions.length -1)){  //4
                showGameOver()
            } else {
                showQuestion(currentQuestion + 1);
            }
         


            setInterval(function(){
                messageEl.textContent = "";
            }, 1000)


           } else {
            console.log("Incorrect")
            messageEl.style.color ="red";
            messageEl.textContent = "Incorrect";
      
           }
    
        })
        card.appendChild(optionEl); 
    }
    
    
    

}

showQuestion(0);


function showGameOver(){
    let scoreEl = document.querySelector("#score");
    scoreEl.textContent = "Your score is: " + currentTime;
    

    gameoverEl.style.display = "block";
    card.style.display = "none";
    timerEl.style.display = "none";
    clearInterval(myTimer);



}

let nameBtn = document.querySelector("#nameSubmit");
nameBtn.addEventListener("click",function () {
    gameoverEl.style.display = "none";
    let inputEl = document.querySelector("#name");
    let highScoreEl = document.querySelector("#highScore");
    highScoreEl.style.display = "block";

    console.log(inputEl, inputEl.value);
    let myScore = {
        name: inputEl.value,
        score: currentTime
    }
    localStorage.setItem("score", JSON.stringify( myScore ));

    let highScores = localStorage.getItem("score");
    highScores = JSON.parse(highScores);

    let listEl  = document.querySelector("#list");
    let pEl = document.createElement("p");
    pEl.textContent = highScores.name + " " + highScores.score;

    listEl.appendChild(pEl);

})

let clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", function(){
    let listEl  = document.querySelector("#list");
    listEl.innerHTML = "";
    localStorage.setItem("score", JSON.stringify( {} ));

    


})























