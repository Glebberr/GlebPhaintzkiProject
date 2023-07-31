const amount = 12;
const numbers = [];
let attempts = 0;
let timer = 0;

// Interval to start and display the timer
let timerInterval = setInterval(() => {
    timer++;

    const date = new Date(timer * 1000);
    const m = date.getMinutes();
    const s = date.getSeconds();

    document.querySelector('.timer').innerHTML = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}, 1000);

const board = document.querySelector(".board");
board.style.gridTemplateColumns = `repeat(6, 1fr)`;

for (let i = 1; i <= amount; i++) {
    numbers.push(i, i);
}

for (let i = 1; i <= amount * 2; i++) {
    // Random Index from the array
    const rand = Math.floor(Math.random() * numbers.length);

    const div = document.createElement("div");
    div.innerHTML = `<span>${numbers[rand]}</span>`;
    board.appendChild(div);

    // Removed from the array in order to not have duplicates
    numbers.splice(rand, 1);
    // Event listener to flip the element when clicked
    div.addEventListener("click", ev => {
        if (ev.target.classList.contains('hidden')) {
            return;
        }

        if (board.querySelectorAll(".showing").length == 2) {
            return;
        }

        ev.target.classList.add("showing");

        const elements = board.querySelectorAll("div:not(.showing)");

        for (const elem of elements) {
            if (elem.textContent == ev.target.textContent) {
                break;
            }
        }

        check();
    });
}
// Funtion that checks if the cards are matching and hides them if they're a match
function check() {
    const cards = board.querySelectorAll(".showing");

    if (cards.length == 2) {
        const first = cards[0];
        const last = cards[1];
        document.querySelector(".counter").innerHTML = ++attempts;

        if (first.textContent == last.textContent) {
            setTimeout(() => {
                first.classList.remove("showing");
                last.classList.remove("showing");

                first.classList.add("hidden");
                last.classList.add("hidden");

                checkIsComplete();
            }, 1000);
        } else {
            setTimeout(() => {
                first.classList.remove("showing");
                last.classList.remove("showing");
            }, 1500);
        }
    }
}
// Function that checks if the game is over
function checkIsComplete() {
    const cards = board.querySelectorAll("div:not(.hidden)");

    if (!cards.length) {
        clearInterval(timerInterval);

        confetti({
            particleCount: 100,
            spread: 70,
            decay: 0.9,
            origin: { y: 0.6 }
        });
    }
}