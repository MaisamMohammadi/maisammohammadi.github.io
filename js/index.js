// Das Spielfeld vorbreiten. 
let button4 = document.querySelector('#vier').addEventListener('click', () => {field(4)} );

let button16 = document.querySelector('#sechszehn').addEventListener('click', () => {field(16)} );

let button36 = document.querySelector('#sechsunddreissig').addEventListener('click', () => {field(36)} );

var gamefield = document.querySelector('.field');

const images = ["./images/Apfel.jpg", "./images/Auge.jpg", "./images/Aussicht.jpg", "./images/Blatt.jpg", "./images/Blue.jpg", "./images/Essen.jpg", "./images/Flasche.jpg", "./images/Football.jpg", "./images/Handy.jpg", "./images/Kaffee.jpg", "./images/Mond.jpg", "./images/Puppy.jpg", "./images/Schuhe.jpg", "./images/Sofa.jpg", "./images/Toy.jpg", "./images/Vogel.jpg", "./images/Wasserkugel.jpg", "./images/Zeichen.jpg"];

var opendcards = [];

function field(count)
{
    
    if(gamefield.hasChildNodes())
    {
        gamefield.innerHTML = "";
    }
    	
    let halfcount = count / 2;

    let cards = [];

    for (let i = 1; i <= halfcount; i++) // die Karten werden als Nummer herstellt. 
    {
        cards.push(i);
        cards.push(i);
    }
    
    cards = shuffle(cards); // Die gemischte Karten

    // Die Anzahl der Karten in der Reihe bestimmen und die Größe der Karten ändern. 
    let rowCount = 0;
    rowCount = Math.sqrt(count); 

    cards = itemsCreate(cards, rowCount); // Das ist ein Array von der angezeigten Karten. 

    

    console.log(cards); // Die Karten auf der Konsole ausgeben. 

    opendcards = cards;

}

function shuffle(cards) // die Karten müssen gemischt werden.
{
    shufflecards=[];

    for (let i = cards.length; i >= 1; i--) 
    {
        const card = cards.splice((Math.floor(Math.random() * i)), 1);
        shufflecards.push(card);
    }

    return shufflecards;
}

function itemsCreate(cards, count) // Die Karten werden als Item erstellt.
{
    let displaycards = []; // Als div in einer Liste speichern. 

    let index = 0;
    while (displaycards.length < cards.length) // Die Karten in der Reihe auflisten. 
    {
        let row = document.createElement('div');
        row.className = 'row';

        row = gamefield.appendChild(row);


        for(let i = 0; i < count; i++) // Die Karten in der Reihe einstellen. 
        {
            // Karte in HTML als div erstellen. 
            const div = document.createElement('div');
            div.className = 'mem';
            
            div.innerHTML = cards[index];

            if(count == 6)
            {
                div.style.width = "90px";
                div.style.height = "90px";
            }
            else if(count == 4)
            {
                div.style.width = "120px";
                div.style.height = "120px";
                
            }   
            displaycards.push(div);
            row.appendChild(div);
            index++;
        }
               
    }
                   
    return displaycards;
}

// Jede Karte bearbeiten. 
let buttonstart = document.querySelector('#start').addEventListener('click', start);

var twocards = []

function start()
{

    if(gamefield.hasChildNodes())
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
    if(firstcard.innerHTML == secondcard.innerHTML)
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
    opendcards.splice(opendcards.indexOf(firstcard), 1);
    foundCards.push(firstcard);
    opendcards.splice(opendcards.indexOf(secondcard), 1);
    foundCards.push(secondcard);
    if(opendcards.length == 0)
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