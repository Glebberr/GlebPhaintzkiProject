const board = document.querySelector('.board');
let isX = true;
let winner;
let winnerArray;
let scoreX = localStorage.getItem("scoreX") || 0;
let scoreO = localStorage.getItem("scoreO") || 0;



// יצרנו את לוח המשחק
function creatBoard() {
    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        document.querySelector('.scoreX').innerHTML = scoreX;
        document.querySelector('.scoreO').innerHTML = scoreO;

        div.addEventListener('click', ev => {
            const clickedDiv = ev.target;
            //בודק של מי התור
            if (!clickedDiv.innerHTML && !winner) {
                if (isX) {
                    clickedDiv.innerHTML = 'X';
                } else {
                    clickedDiv.innerHTML = "O"
                }
                clickedDiv.className = 'dirty';
                isX = !isX;
                check();
            }
        })
        board.appendChild(div);

    }
}

creatBoard();

// בודק את כל האפשרויות של המשחק
function check() {
    const divs = board.querySelectorAll('div');
    const options = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const op of options) {
        const res = op.map(x => divs[x].innerHTML);

        if (res.every(val => val === 'X')) {
            winner = 'X';
            localStorage.setItem('scoreX', ++scoreX);
            document.querySelector('.scoreX').innerHTML = scoreX;
            winnerArray = op;
            break;
        } else if (res.every(val => val === 'O')) {
            winner = 'O';
            localStorage.setItem('scoreO', ++scoreO)
            document.querySelector('.scoreO').innerHTML = scoreO;
            winnerArray = op;
            break;
        }
    }
    if (winner) {
        divs.forEach(el => {
            el.className = 'dirty'
        });
        showWinner(`The winner is: ${winner}`);
        winnerArray.forEach(i => divs[i].classList.add('bg'));
    }
}
// פונקציה שבודקת מי המנצח ובעקות זאת עושה פעולה כולשהי
function showWinner(text) {
    const winner = document.createElement("div");
    winner.classList.add("winner");
    winner.innerHTML = text;

    const frame = document.querySelector(".frame");
    frame.appendChild(winner);

    confetti({
        particleCount: 100,
        spread: 70,
        decay: 0.9,
        origin: { y: 0.6 }
    });

    setTimeout(function () {
        frame.removeChild(winner);
    }, 2 * 1000);
}
// פונקציה שעושה משחק חדש 
function reset() {
    board.innerHTML = "";
    creatBoard();
    winner = false;
}
// פונקציה שמנקה רק את הניקוד
function resetScore() {
    localStorage.clear();
    location.reload();
}