// Das Spielfeld vorbreiten. 
let button4 = document.querySelector('#vier').addEventListener('click', () => {createcards(4)} );

let button16 = document.querySelector('#sechszehn').addEventListener('click', () => {createcards(16)} );

let button36 = document.querySelector('#sechsunddreissig').addEventListener('click', () => {createcards(36)} );

var gamefield = document.querySelector('.field');

const images = ["./images/Apfel.jpg", "./images/Auge.jpg", "./images/Aussicht.jpg", "./images/Blatt.jpg", "./images/Blue.jpg", "./images/Essen.jpg", "./images/Flasche.jpg", "./images/Football.jpg", "./images/Handy.jpg", "./images/Kaffee.jpg", "./images/Mond.jpg", "./images/Puppy.jpg", "./images/Schuhe.jpg", "./images/Sofa.jpg", "./images/Toy.jpg", "./images/Vogel.jpg", "./images/Wasserkugel.jpg", "./images/Zeichen.jpg"];

var cards = [];

function createcards (count)
{
    if(gamefield.hasChildNodes())
    {
        gamefield.innerHTML = "";
        cards = [];
        foundCards = [];
    }

    let halfCount = count / 2;

    let rowCount = Math.sqrt(count);

    for(let i = 0; i < halfCount; i++) // Die Karten in der Reihe einstellen. 
    {
        // Karte in HTML als div erstellen. 
        const div = creating(i, rowCount);
        const div2 = creating(i, rowCount);

        cards.push(div);
        cards.push(div2);

    }
    
    cards = shuffle(); // Die gemischte Karten

    let index = 0;
    let rowIndex = 0;
    while(rowIndex < rowCount)
    {
        let row = document.createElement('div');
        row.className = 'row';
        row = gamefield.appendChild(row);

        for(let i = 0; i < rowCount; i++)
        {
            let a = cards[index];
            row.appendChild(a);
            index++;
        }

        rowIndex++;
    }
    
    console.log(cards);
}

function creating(i, count)
{
    const div = document.createElement('div');
    div.className = 'mem';

    const imgfront = document.createElement('img');
    imgfront.className = 'imgfront';
    imgfront.src = images[i];
    div.appendChild(imgfront);

    const imgback = document.createElement('img');
    imgback.className = 'imgback';
    imgback.src = './images/Forderseite.png';
    div.appendChild(imgback);
    
    

    if(count == 4)
    {
        div.style.width = "120px";
        div.style.height = "120px";

        imgfront.style.width = "90px";
        imgback.style.width = "90px";
                
        imgfront.style.height = "90px";
        imgback.style.height = "90px";
    }

    else if(count == 6)
    {
        div.style.width = "90px";
        div.style.height = "90px";

        imgfront.style.width = "70px";
        imgback.style.width = "70px";
                
        imgfront.style.height = "70px";
        imgback.style.height = "70px";
    }

    return div;
}

function shuffle() // die Karten müssen gemischt werden.
{
    let shufflecards = [];

    for (let i = cards.length; i >= 1; i--) 
    {
        let card = cards.splice(Math.floor(Math.random() * i), 1);
        let div = card.pop();
        shufflecards.push(div);
    }

    return shufflecards;
}

// Jede Karte bearbeiten. 
let buttonstart = document.querySelector('#start').addEventListener('click', start);

var twocards = []

function start()
{

    if(gamefield.hasChildNodes()) //Jede Karte den Event click eingeben. 
    {
        let rows = gamefield.childNodes; // Alle Reihen in einem Array speichern. 

        for (let i = 0; i < rows.length; i++) 
        {   
            let row = rows[i].childNodes; // Alle Kisten einer Reihe ein einem Array speichern. 
            for(let j = 0; j < row.length; j++)
            {
                let card = row[j];
                card.addEventListener('click', flipCard);
            }
        }
    }

    else
    {
        window.alert("You hat to click on one of numbers.");
    }

}

function flipCard() // Die Karten werden gedreht. 
{
    if(lockBoard) return;
    this.classList.add('flip');
    if(!isFlipped)
    {
        isFlipped = true;
        firstcard = this;
    }
    else
    {
        isFlipped = false;
        secondcard = this;
        comparing();
    }
}

function comparing() // Die Karten werden vergleicht.  
{
    let firstcardvalue = firstcard.childNodes[0].src;
    let secondcardvalue = secondcard.childNodes[0].src;

    console.log(firstcard.childNodes[0], secondcard.childNodes[0]);

    if(firstcardvalue == secondcardvalue)
    {
        disableCards();
        transfering();
    }
    else
    {
        console.log("false");
        unflipCards();
    }

}

function disableCards() // Die Karten werden nicht mehr gedreht. Das Event flipCard wird von den Karten gelöscht.
{
    firstcard.removeEventListener('click', flipCard);
    secondcard.removeEventListener('click', flipCard);
}

function transfering()
{
    cards.splice(cards.indexOf(firstcard), 1);
    foundCards.push(firstcard);
    cards.splice(cards.indexOf(secondcard), 1);
    foundCards.push(secondcard);
    if(cards.length == 0)
    {
        setTimeout(() => 
            {
                window.alert("The game is finished!"); // If a round of game is finished!
                console.log(foundCards); // Die gefundene Karten werden gelistet.
            }
        , 500)
    }
}

function unflipCards() // Die ungleiche Karten werden gedreht. 
{
    lockBoard = true;
    setTimeout(() => 
        {
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');

        lockBoard = false;
        }
        , 1000
    )
}

let foundCards = [];

let lockBoard = false; // Während zwei Karten gedeckt wurden, ist es nicht möglich zusätliche Karten zu drehen. 
let isFlipped = false;
let firstcard, secondcard;