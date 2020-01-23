/*
 * took general ideas from mike wells Udacity
 */

//here to start and restart the game and remove childs
let restart = document.querySelector("div.restart");
restart.addEventListener('click', function() {
    game();

})

function createGame() {

    //make list of cards, then assign it to the HTML file
    let lists = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-bomb', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
        'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt',
        'fa fa-cube', 'fa fa-cube', 'fa fa-bicycle', 'fa fa-bicycle',
        'fa fa-leaf', 'fa fa-leaf'
    ]

    let deck = document.querySelector(".deck");
    //this while loop will remove all childs from deck(parent) source: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }


    //when refresh the page will shuffle cards Auto.
    shuffle(lists);

    //this for loop to create Card in dynamicly
    for (let list of lists) {
        let setCard = document.createElement("li");
        setCard.classList.add("card", "open", "show");
        setCard.innerHTML = `<i class ="${list}"></i>`;
        setTimeout(function() {
            setCard.classList.remove("open", "show");
        }, 4000);

        deck.appendChild(setCard);
    }

}

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
 *all functions and vairblse inside game();
 *anyway game() will be called auto when open the page,
 * we only need to call game() to restart the game, everything will be reset.
 */

///the code start by calling game(); then calling createGame()
game();

//when just call game method, it will reset every thing !!!
function game() {
    //createGame
    createGame();

    //create timer ; take counting only seconds then convert it minutes and seconds
    // source https://www.w3schools.com/jsref/met_win_setinterval.asp
    //source https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
    //// it will remove all child, reset the time
        let scorePanel = document.querySelector("section.timer");
        while (scorePanel.firstChild) {
            scorePanel.removeChild(scorePanel.firstChild);
        }
    let time = 0;
    let mins = 0;
    let seconds = 0;
      timer();
    //insert the while cardsfa-diamond
    let cards = document.querySelectorAll('li.card');
    //holds 2 cards
    let cardsCounter = [];
    //holds only the correct cards
    let correct = [];
    //holds only the wrong moves
    let wrong = [];
    // move counter
    let clicks = 0;
    //assign movesCounter to moves class
    let movesCounter = document.querySelector('.moves');
    movesCounter.innerText = "0";
    // assign to the starts
    let stars = document.querySelector("ul.stars")
    stars.innerHTML = `<li><i class="fa fa-star"> </i></li><li><i class="fa fa-star"> </i></li> <li><i class="fa fa-star"></i></li>`;
    //remove star function

    //here all functions to make the game valid
    for (let card of cards) {

        card.addEventListener('click', function(e) {
                //call openCards to open it (card)
                openCards(card);
                // if cardsCounter contain 2 cards, then will check if they are correct or not. after 1.5seconds
                setTimeout(function() {
                        if (cardsCounter.length == 2) {
                            //here to count the moves
                            clicks += 1;
                            movesCounter.innerText = `${clicks}`;
                            //here to check if they are correct
                            if (cardsCounter[0].innerHTML === cardsCounter[1].innerHTML) {
                                for (let cardCounter of cardsCounter) {
                                    correct.push(cardCounter);
                                    //change the background color
                                    cardCounter.classList.remove('open');
                                }
                                //here to finish the game
                                if (correct.length == 16) {
                                    win()
                                };
                                cardsCounter = [];
                            }
                            //here will be wrong cards
                            else {
                                close();
                            }
                        }
                    }, 1600)

            }

        )
    }

    function close() {
      // 1. card 2. cards
        for (let cardCounter of cardsCounter) {
            wrong.push(cardCounter);
            cardCounter.classList.remove('open', 'show', 'unclick');
        }

        removeStar();
        cardsCounter = [];
    }

    function removeStar() {
        if (wrong.length > 10 && wrong.length < 15) {
            stars.innerHTML = `<li><i class="fa fa-star"> </i></li> <li><i class="fa fa-star"></i></li>`;
        }
        if (wrong.length > 20) {
            stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
        }
    }

    function openCards(card) {
        if (cardsCounter.length < 2) {
            cardsCounter.push(card);
            //here to  check if the cards are correct or not, and use set time
            card.classList.add('open', 'show', 'unclick');
            //here call function to remove stars
        }

    }



    //win
    function win() {
        {
            alert("YOU WIN \n" + "Time " + mins + ":" + seconds +"\n moves:"+ clicks +"\n Press Restart to play again")
        }
    }

    function timer () {
      let scorePanel = document.querySelector(".timer");
      let showTime = document.createElement("UL");
      scorePanel.appendChild(showTime);
      let timeCalculate = setInterval(calculate,1000);
            function calculate(){
            time += 1;
            mins = Math.floor(time / 60);
            seconds = time - mins * 60;
            showTime.innerHTML=`Time ${mins}:${seconds}`;
      }
    }

}
