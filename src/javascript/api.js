import confetti from "canvas-confetti";

var apiRes;
var answer;
var guessNumber = 0;
var displayStrings = [];
var lyricArr = [];

window.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
        submitGuess();
    }
  });

let file = "https://taylorswiftapi.onrender.com/get";
fetch (file)
.then(x => x.json())
.then(t => prepGame(t));

function prepGame(data){
    apiRes = data;
    lyricArr = data.quote.split(" ");
    constructHTMLStrings(lyricArr);
    answer = data.song.toLowerCase();
    showLevel();
}
function showLevel(){
    var levelone = Math.floor(displayStrings.length * 0.5);
    var leveltwo = Math.floor(displayStrings.length * 0.65);
    var levelthree = Math.floor(displayStrings.length * 0.75);
    var levelfour = Math.floor(displayStrings.length * 0.9);
    var levelcounts = [levelone,leveltwo,levelthree,levelfour,displayStrings.length];
        var tobedisplayednumber = levelcounts[guessNumber];
        while(tobedisplayednumber>document.getElementsByClassName("displayed").length){
            var hiddenitems =  document.getElementsByClassName("hidden");
            var randomNumber = Math.floor(Math.random()*hiddenitems.length);
            var randomItem = hiddenitems[randomNumber];
            randomItem.removeAttribute("class");
            randomItem.setAttribute("class","displayed");
            randomItem.innerHTML = lyricArr[randomItem.getAttribute("data-index")];
    }
}
function submitGuess(){
    let guess = String(document.getElementById("input").value).toString().toLowerCase();
    if(guess===answer){
        winGame()
    }
    if(guess!==answer){
        incorrectGuess(document.getElementById("input").value)
    }
}

function skipGuess(){
window.location.reload()
}

function winGame(){
    document.getElementsByClassName("guess-score-widget")[guessNumber].style.backgroundColor = "green";
    document.getElementById("answer").innerHTML = "🤩 " + apiRes.song + " 🤩";
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
}

function incorrectGuess(guess){
    var guessToInput = guess;
    if(guessToInput==="Guess the song..."){guessToInput="SKIPPED"};
    document.getElementsByClassName("previous-guess")[guessNumber].innerHTML=guessToInput;
    document.getElementsByClassName("guess-score-widget")[guessNumber].style.backgroundColor = "red";
    if(guessNumber===4){
        loseGame()
        return
    }
    else{
        guessNumber++;
        showLevel();
    }
}
function loseGame(){
    document.getElementById("answer").innerHTML = "😥 " + apiRes.song + " 😥";
}

function clearInput(){
    document.getElementById("input").value = "";
}
function constructHTMLStrings(){
    console.log(lyricArr);
   for (let i=0;i<lyricArr.length;i++){
    var hiddenText = "";
    for(let p=0;p<lyricArr[i].length;p++){
        hiddenText+="*";
    }
    displayStrings.push("<span class='hidden' data-index=" + i + ">" + hiddenText + "</span>");
   }
   displayStrings.map((elem) => {document.getElementById("lyric-block").innerHTML+=(elem +" ")});
}
export {
    submitGuess,
    skipGuess,
    clearInput
  }