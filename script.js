const timer = document.querySelector('.timer');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let time = 60;
let score = 0;
let t = null;
let a = null;
let moleNums = null;
let occupied = [];

function resetGame() {
    clearInterval(t);
    clearInterval(a);
    scoreBoard.textContent = 0;
    score = 0;
    timer.textContent = 60;
    time = 60;
    t = setInterval(timeReset, 1000);
    appear();
    a = setInterval(appear, 1500);
}

function timeReset() {
    time--;
    timer.textContent = time;

    if (time == 0) {
        alert('The Game Is Over! Great Job!');
        clearInterval(t);
    }

}

function appear() {
    const minTime = 1000;
    const maxTime = 5000;
    const startTime = time;
    const appearTime = Math.round(Math.random() * (maxTime - minTime) + minTime);
    moleNums = Math.floor(Math.random() * moles.length);
    while (occupied.includes(moleNums)) {
        moleNums = Math.floor(Math.random() * moles.length);
    }
    occupied.push(moleNums);
    document.getElementById(moleNums).src = 'mole.png';
    document.getElementById(moleNums).addEventListener('click', whack);
    if (time <= startTime - appearTime) {
        document.getElementById(moleNums).src = 'hole.png';
    }
    //setTimeout(function () { document.getElementById(moleNums).src = 'hole.png'; }, appearTime)
    var index = occupied.indexOf(moleNums);
    occupied.splice(index, 1);
}

function whack() {
    score++;
    document.getElementById(moleNums).src = 'hole.png';
    scoreBoard.textContent = score;
    document.getElementById(moleNums).removeEventListener('click', whack);
}