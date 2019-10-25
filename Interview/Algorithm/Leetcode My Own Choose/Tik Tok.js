/**
 * Initialize your data structure here.
 * @param {number} n
 */
var TicTacToe = function (n) {
    this.row = new Array(n).fill(0);
    this.col = new Array(n).fill(0);
    this.diagonal = 0;
    this.anti_diagonal = 0;
    this.n = n;
};

/**
 * Player {player} makes a move at ({row}, {col}).
        @param row The row of the board.
        @param col The column of the board.
        @param player The player, can be either 1 or 2.
        @return The current winning condition, can be either:
                0: No one wins.
                1: Player 1 wins.
                2: Player 2 wins. 
 * @param {number} row 
 * @param {number} col 
 * @param {number} player
 * @return {number}
 */
TicTacToe.prototype.move = function (row, col, player) {
    let val = player === 1 ? 1 : -1;
    let target = player === 1 ? this.n : -(this.n);
    if ((row - col) === 0) {
        this.diagonal += val;
        if (this.diagonal === target) return player;
    }

    if ((row + col) === (this.n - 1)) {
        this.anti_diagonal += val;
        if (this.anti_diagonal === target) return player;
    }

    this.row[row] += val;
    this.col[col] += val;

    if (this.row[row] == target || this.col[col] == target) return player;
    return 0;
};

let chase = new TicTacToe(3);

chase.move(0,0,1)
chase.move(0,2,2)
chase.move(2,2,1)
chase.move(1,1,2)
chase.move(2,0,1)
chase.move(1,0,2)
chase.move(2,2,1)
console.log(chase.row);
console.log(chase.col);

/**
 * Your TicTacToe object will be instantiated and called as such:
 * var obj = new TicTacToe(n)
 * var param_1 = obj.move(row,col,player)
 */

 /* 

 class TicTacToe {

    private int[][] board;
    private int n;
    public TicTacToe(int n) {
        board = new int[n][n];
        this.n = n;
    }
    
    public int move(int row, int col, int player) {
        board[row][col] = player;
        for (int i = 0; i < n; ++i) {
            if (board[row][i] != player) {
                break;
            }
            
            if (i == n - 1) {
                return player;
            }
        }
        
        for (int i = 0; i < n; ++i) {
            if (board[i][col] != player) {
                break;
            }
            
            if (i == n - 1) {
                return player;
            }
        }
        
        for (int i = 0; i < n; ++i) {
            if (board[i][i] != player) {
                break;
            }
            
            if (i == n - 1) {
                return player;
            }
        }
        
        for (int i = n - 1; i >= 0; --i) {
            if (board[n - 1 - i][i] != player) {
                break;
            }
            
            if (i == 0) {
                return player;
            }
        }
        
        return 0;
    }
}
 
 */