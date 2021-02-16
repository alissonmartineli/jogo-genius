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

const overlay = document.querySelector('.overlay');

function nextLevel() {
    enableClick = false;
    setTimeout(() => {
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
    alert('você perdeu!');
    enableClick = false;
    sequence = [];

    btnStart.style.display = 'block';
    overlay.style.display = 'grid';
}

function play() {
    btnStart.style.display = 'none';
    overlay.style.display = 'none';
    nextLevel();
}
