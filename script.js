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
    const boardArray = board.getBoard();

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
        console.log(`Placing ${getActivePlayer().name}'s mark on the cell ${row}, ${column}...`);
        board.placeMark(row, column, getActivePlayer().mark);

        /*  This is where we would check for a winner and handle that logic,
            such as a win message. */

        const horizontalWinningCondition = (cellRow, player) => {
            const playerRowMarks = boardArray[cellRow].filter(cell => cell.getValue() === player);

            if (playerRowMarks.length === 3) {
                return true;
            }

            return false;
        }

        const verticalWinningCondition = (cellColumn, player) => {
            const playerColumnMarks = boardArray.filter((cellRow) => cellRow[cellColumn].getValue() === player).map(row => row[cellColumn]);

            if (playerColumnMarks.length === 3) {
                return true;
            }

            return false;
        }

        const diagonalWinningCondition = (cellRow, cellColumn, player) => {
            if ((cellRow === 0 && cellColumn === 0) || (cellRow === 2 && cellColumn === 2)) {
                if (
                    boardArray[0][0].getValue() === player
                    && boardArray[1][1].getValue() === player
                    && boardArray[2][2].getValue() === player
                ) return true;
            }

            if ((cellRow === 0 && cellColumn === 2) || (cellRow === 2 && cellColumn === 0)) {
                if (
                    boardArray[0][2].getValue() === player
                    && boardArray[1][1].getValue() === player
                    && boardArray[2][0].getValue() === player
                ) return true;
            }

            if (cellRow === 1 && cellColumn === 1) {
                if (
                    (boardArray[0][0].getValue() === player
                        && boardArray[1][1].getValue() === player
                        && boardArray[2][2].getValue() === player)
                    || (boardArray[0][2].getValue() === player
                        && boardArray[1][1].getValue() === player
                        && boardArray[2][0].getValue() === player)
                ) return true;
            }

            return false;
        }

        const isBoardFull = () => {
            const boardValues = boardArray.map(row => row.map(cell => cell.getValue()));
            return boardValues.flat().every(cell => cell !== ' ');
        };


        if (horizontalWinningCondition(row, getActivePlayer().mark) || verticalWinningCondition(column, getActivePlayer().mark) || diagonalWinningCondition(row, column, getActivePlayer().mark)) {
            console.log(`${getActivePlayer().name} wins the game, thanks for playing!`);
            return;
        }

        if (isBoardFull()) {
            board.printBoard();
            console.log("It's a tie!");
            return;
        }

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