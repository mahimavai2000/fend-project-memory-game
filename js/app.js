/*
 * Create a list that holds all of your cards
 */
/*jshint esversion: 6 */
start_game();
let moves = 0;
let opened = [];
let timer=0;
var gameStarted;
const stars = document.getElementsByClassName('fa-star');

//Initializes the game
function start_game() {
    const symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
    const cards = shuffle(symbols);
    const deck = document.getElementsByClassName('deck')[0];
    for (var index = 0; index < 16; index++) {
        deck.innerHTML += '<li class="card"><i class="fa fa-' + cards[index] + '"></i></li>';
    }
}

//Function for Timer
function gameTimer() {
    setInterval(function() {
        timer++;
        $('.time').text(timer);
    }, 750);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
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

//jQuery function for card click
$('.card').click(function() {
    if (!gameStarted) {
        // start timer!
        gameTimer();
        gameStarted = true;
    }
    if (!($(this).hasClass('open') || $(this).hasClass('match'))) {
        moves++;
        $('.moves').text(moves);
        check_stars();
        $(this).addClass('open');
        opened.push($(this));
        if (opened.length % 2 === 0) {
            setTimeout(card_match, 1000);
        }
    }
});

//Function for matches cards.
function card_match() {
    if (opened[opened.length - 2].html() == opened[opened.length - 1].html()) {
        opened[opened.length - 2].removeClass('open');
        opened[opened.length - 2].addClass('match');
        opened[opened.length - 1].removeClass('open');
        opened[opened.length - 1].addClass('match');
    } else {
        opened[opened.length - 1].removeClass('open');
        opened[opened.length - 2].removeClass('open');
        opened.pop();
        opened.pop();
    }
    if (opened.length == 16) {
        clearTimeout(timer);
        const stars = document.getElementsByClassName('fa-star').length;
        swal({

            allowEscapeKey: false,
            allowOutsideClick: false,
            title: 'Congratulations! You Won!',
            text: 'With ' + moves + ' Moves and ' + stars + ' Stars and took ' + timer + 'secs to finish.',
            type: 'success',
            confirmButtonColor: '#02ccba',
            confirmButtonText: 'Play again!'
        }).then(function(isConfirm) {
            if (isConfirm) {
                window.location.reload();
            }
        });
    }
}

//Function for star ratings.
function check_stars() {
    if (moves == 23) {
        stars[2].classList.add('fa-star-o');
        stars[2].classList.remove('fa-star');
    } else if (moves == 31) {
        stars[1].classList.add('fa-star-o');
        stars[1].classList.remove('fa-star');
    }
}