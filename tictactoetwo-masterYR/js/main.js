document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-modal');
    const disableModalButton = document.getElementById('disable-modal');
    const storageKey = 'disableModal';

    // Show modal on page load if not disabled
    if (!localStorage.getItem(storageKey)) {
        modal.classList.remove('hidden');
    }

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    disableModalButton.addEventListener('click', () => {
        localStorage.setItem(storageKey, 'true');
        modal.classList.add('hidden');
    });

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let board, turn = 'X', win;
    let scores = { X: 0, O: 0 };

    // Load scores from localStorage
    const savedScores = JSON.parse(localStorage.getItem('scores'));
    if (savedScores) {
        scores = savedScores;
    }

    const squares = Array.from(document.querySelectorAll('#board div'));
    const messages = document.querySelector('h2');
    const resetButton = document.getElementById('reset-button');

    resetButton.addEventListener('click', init);

    document.getElementById('board').addEventListener('click', handleTurn);

    function handleTurn(event) {
        const idx = squares.findIndex(sq => sq === event.target);
        if (board[idx] || win) return;
        board[idx] = turn;
        turn = turn === 'X' ? 'O' : 'X';
        win = getWinner();
        render();
    }

    function getWinner() {
        for (const [a, b, c] of winningCombos) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes('') ? null : 'T';
    }

    function render() {
        board.forEach((mark, i) => squares[i].textContent = mark);
        if (win) {
            if (win !== 'T') {
                scores[win]++;
                localStorage.setItem('scores', JSON.stringify(scores));
            }
            messages.textContent = win === 'T' ? 'Match nul!' : `${win} gagne!`;
        } else {
            messages.textContent = `Vite ${turn}, c'est à ton tour!`;
        }
    }

    function init() {
        board = Array(9).fill('');
        win = null;
        render();
    }

    init();
});



