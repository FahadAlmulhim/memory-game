

#Memory Game project.

###### description:  common memory game.


##installation
- simply open the index.html file on browser.
##Dependencies
```html
  <link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">

    <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Coda">
```

####   general ideas  from mike wells Udacity
- link: https://www.youtube.com/watch?v=x47oLiTpIVk&feature=emb_logo


##instructions
- the cards will be open for 4 seconds then will be closed
- try to find the right cards with less mistakes, (the rating stars will be effected)
- after finding the right 16 cards, you win
- click on restart to restart the game


### Features
-  automaticlly check  if your picked cards are correct or not
-  game has attractive motion (create by using CSS)
-  there are rating preformance stars
- moves will showing and counted
- popup when finish the game

---

### HTML


```html
	</div>
        </section>

        <ul class="deck">

        </ul>
    </div>
```
-  ul class = deck (parent) has used to be attached by all cards (children) by javaScript


### javaScript

```JavaScript
for (let list of lists) {
  let setCard = document.createElement("li");
  setCard.classList.add("card","open","show");
  setCard.innerHTML=`<i class ="${list}"></i>`;
  setTimeout(function(){ setCard.classList.remove("open","show");}, 4000);

  deck.appendChild(setCard);
}
```
- this code will create the cards and appendchild to deck.
- the cards will showing for only 4 seconds  
- setTime used to hide the cards

```javascript
//this while loop will remove all childs from deck(parent) source: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
}
```
- when click on restart, the code will remove all childs

```JavaScript
//here to start and restart the game
let restart = document.querySelector("div.restart");
restart.addEventListener('click', function (){
      game();
})
```

- to restart the game we need just to call game(); it will reset all values.



```javaScript
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
```
- innerHTML has used to check if the picked cards are correct
- the card can be clicked again when it picked
- the right cards will be added to correct array,

```javascript
else {
    for (let cardCounter of cardsCounter) {
        wrong.push(cardCounter);
        cardCounter.classList.remove('open', 'show', 'unclick');
    }
    removeStar();
    cardsCounter = [];
}
}
```
- if it not correct matching, it will be remove all classes and rehide again the card.
- if the classes are removed, the cards can be clicked
- wrong [] array to hold the numbers of wrong picked, it will effect on the rating perfomance stars.


```javaScript
   //here to count the moves
        clicks +=1;
        movesCounter.innerText=`${clicks}`;
```
- the moves will be counted when choose 2 cards( 2 clicks).  2 clicks = 1 move


```javascript
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
```

- setTimeOut to give apportiny to the player to check his answers.
- if the picked answers are wrong, it will call close();



```JavaScript
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
```
- create child, when restart game will remove the old child and create new child
- This function to count and calculate the seconds and mins
