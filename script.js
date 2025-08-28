function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeMark = (row, column, player) => {
        const isEmptyCell = board[row][column].getValue() === ' ';

        if (!isEmptyCell) return;

        board[row][column].addMark(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return { getBoard, placeMark, printBoard };
}


function Cell() {
    let value = ' ';

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMark,
        getValue
    };
}


function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: 'O',
        },
        {
            name: playerTwoName,
            mark: 'X',
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`Placing ${getActivePlayer().name}'s mark on the grid ${row}, ${column}...`);
        board.placeMark(row, column, getActivePlayer().mark);

        /*  This is where we would check for a winner and handle that logic,
            such as a win message. */

            // TODO: Winning condition (If the newly put mark is on the corner, check x, y and diagonal winning conds but if somewhere else, check x and y only)


        // Switch player turn
        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();