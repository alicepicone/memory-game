// array con src di tutte le immagini ---- deck = mazzo
let halfDeck = ["assets/img/img1.jpeg", "assets/img/img2.jpeg", "assets/img/img3.jpeg", 
"assets/img/img4.jpeg", "assets/img/img5.jpeg", "assets/img/img6.jpeg", "assets/img/img7.jpeg", "assets/img/img8.jpeg" ]; 
//let mezzoMazzo = ["assets/img/img1.png", "assets/img/img2.png", "assets/img/img3.png"];
// array con due copie di mezzo mazzo
let deck = [...halfDeck, ...halfDeck];

let turns = 0; //giri
let firstChoice;
let secondChoice;
let score = halfDeck.length;
let comparisonInProgress = false;

let title = document.createElement("h1"); // crea elemento h1 per il titolo
title.classList.add("title");
title.id = "id";
title.innerText = "MEMORY GAME"; //titolo
document.querySelector(".memoryGame").appendChild(title); //appende il titolo alla classe memory

startGame();

function startGame() {

    shuffleDeck(deck);
    showCards(deck);
    resetGame();
    timer();
}

function shuffleDeck(deck) {
    let currentIndex = deck.length;
    let randomIndex;
  
    while (currentIndex > 0) { //controlla a monte se ripetere il ciclo
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--; 
      // And swap it with the current element.
      [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }  
    return deck;
}

function showCards(deck) {  //funzione per mostrare le carte

    for(i = 0; i < deck.length; i++) {
    
        let cards = document.createElement("div"); //crea elemento div
        let front = document.createElement("img"); //crea elemento img
        let back = document.createElement("img");

        cards.classList.add("class" + i); //aggiunge la classe e l'id al div
        cards.id = "ID" + i;
        cards.setAttribute("onClick", "turnCard(" + i + ")"); //richiama funzione turnCard

        front.classList.add("front");
        back.classList.add("back");
        back.style.display = "none";

        front.src = deck[i];
        back.src = "assets/img/images9.jpeg";
        cards.appendChild(front); //appendo il front e il back al div
        cards.appendChild(back);

        document.querySelector(".cards").appendChild(cards);  //appendo il div al memoryGame

    }
    setTimeout(() => { //funzione che mette tutti i back

        for(index = 0; index < deck.length; index++) {

            let singleCard = document.querySelector("#ID" + index);
            singleCard.querySelector(".front").style.display = "none";
            singleCard.querySelector(".back").style.display = "block";          
        }    
    }, 1000);
}

function turnCard(cards) { //funzione che gira le carte

    if (comparisonInProgress) {
        return; // Se il confronto è in corso, esce dalla funzione
    }

    let choice = document.querySelector("#ID" + cards);
    choice.querySelector(".front").style.display = "block";
    choice.querySelector(".back").style.display = "none";
    turns++;

    if(turns == 1) { //gira due carte
        firstChoice = "#ID" + cards;
    }else if (turns == 2) {
        secondChoice = "#ID" + cards;
        let firstCard = document.querySelector(firstChoice).querySelector(".front");
        let secondCard = document.querySelector(secondChoice).querySelector(".front");

        if(firstCard.src == secondCard.src) { //confronta le prime due carte girate
            console.log("le carte sono uguali");
            score--;
        } else {

            //console.log("le carte sono diverse");
            setTimeout(() => { //dopo un sec rigira le carte con il back

                firstCard.style.display = "none";
                secondCard.style.display = "none";

                document.querySelector(firstChoice).querySelector(".back").style.display = "block";
                document.querySelector(secondChoice).querySelector(".back").style.display = "block";    
            }, 1000);
        }
        turns = 0;

        comparisonInProgress = true; // Avvia il confronto
            setTimeout(() => {
                // Controllo delle carte e altre operazioni come prima
                comparisonInProgress = false; // Finito il confronto, abilita di nuovo i clic sulle carte
            }, 1000); // Timeout per mostrare le carte prima di girarle nuovamente
    }
}

function reset(){ //funzione per ricaricare la pagina
    window.location.reload();
}

function resetGame(){
    let reset = document.createElement("button"); //crea bottone reset
    reset.setAttribute("onClick", "reset()"); //chiama funzione reset
    reset.innerHTML = "reset"; 
    document.querySelector(".reset").appendChild(reset); //appende reset 
}

function timer() { //scrivere funzione timer
    
    let seconds = 0;
    let minutes = 0;

    const interval = setInterval(() => {
        seconds++;

        if(seconds === 60) {
            seconds = 0;
            minutes++;
        }
        let temp = " TIMER: 0 : " + minutes + " : " + seconds;
        document.querySelector("#timer").innerText = temp;

        if (score <= 0) {
            alert("Hai vinto in: " + minutes + " : " + seconds);
            clearInterval(interval);
        }
    }, 1000);    
}