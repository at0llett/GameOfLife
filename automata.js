

class Automata {


    constructor () {

    

    this.canvas = document.getElementById('gameWorld');
    this.ctx = this.canvas.getContext('2d');

    this.cellSize = 15;
    this.rows = 100;
    this.columns = 100;
    this.grid = this.createGrid(); // Create 2D array to keep track of alive or dead
                                   // 1 is black (alive), 0 is white (dead)
    

    this.randomFill();                     

    }

    update() {
        let newGrid = this.createGrid();
    
        
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
               
                let count = this.countLiveNeighboors(i, j);
    
                
                if (this.grid[i][j] === 0 && count === 3) {
                    newGrid[i][j] = 1; // Cell becomes alive
                } else if (this.grid[i][j] === 1 && (count < 2 || count > 3)) {
                    newGrid[i][j] = 0; // Cell dies
                } else {
                    newGrid[i][j] = this.grid[i][j]; // Cell remains the same
                }
            }
        }
    
        
        this.grid = newGrid;
    }
    

    countLiveNeighboors(x, y) {
        var count = 0;

        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i < 0 || y < 0 || i >= this.columns || j >= this.rows) {
                    continue;
                }

                if (this.grid[i][j] == 1) {
                    count += 1;
                }

            }
        }

        count -= this.grid[x][y];

        return count;

    }

    draw () {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                const cell = this.grid[i][j];
                this.ctx.beginPath();
                this.ctx.rect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
                this.ctx.fillStyle = cell ? 'black' : 'white';
                this.ctx.fill();
                this.ctx.stroke();
            }
        }
        
        
    }

    randomFill () {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j] = Math.random() > 0.5 ? 1 : 0;
            }
        }
    }

    createGrid () {
        return new Array(this.columns).fill(null).map(() => new Array(this.rows).fill(0));
    }

    // drawGrid () {
        
    // }
}