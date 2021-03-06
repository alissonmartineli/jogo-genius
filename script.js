const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let enableClick = false;
let pos = 0;

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        click(this.dataset.color);
    });
});

const btnStart = document.querySelector('.start');
btnStart.addEventListener('click', play);

const message = document.querySelector('.message');

const score = document.querySelector('.score');

function nextLevel() {
    enableClick = false;
    setTimeout(() => {
        score.innerHTML =`SCORE: ${sequence.length}`;
        const random = Math.floor(Math.random() * 4);
        sequence.push(colors[random]);
        pos = 0;
        runSequence(sequence[pos]);
    }, 500);
}

function runSequence(color) {
    const el = document.querySelector(`.${color}`);
    setTimeout(() => {
    el.classList.add('active');
        setTimeout(() => {
            el.classList.remove('active');
            if (pos >= sequence.length - 1) {
                pos = 0;
                enableClick = true;
            } else {
                pos++;
                runSequence(sequence[pos]);
            }
        }, 500);
    }, 500);
}

function click(color) {
    if (!enableClick) {
        return;
    }

    const el = document.querySelector(`.${color}`);
    el.classList.add('active');
    setTimeout(() => {
        el.classList.remove('active');
    }, 200);

    if (color !== sequence[pos]) {
        gameover();
        return;
    }

    if (pos === sequence.length - 1) {
        nextLevel();
        return;
    }

    pos++;
}

function gameover() {
    enableClick = false;
    sequence = [];

    score.innerHTML = 'SCORE: 0';
    message.innerHTML = 'Você perdeu!';
    message.classList.remove('hidden');
    btnStart.classList.remove('hidden');
}

function play() {
    message.classList.add('hidden');
    btnStart.classList.add('hidden');

    let i = 3;
    const interval = setInterval(() => {
        if (i > 0) {
            message.innerHTML = i;
            message.classList.remove('hidden');
            setTimeout(() => {
                message.classList.add('hidden');
            }, 500);
            i--;
        } else {
            message.innerHTML = 'GO!';
            message.classList.remove('hidden');
            setTimeout(() => {
                message.classList.add('hidden');
            }, 500);
            clearInterval(interval);
            nextLevel();
        }
    }, 1000)
}
