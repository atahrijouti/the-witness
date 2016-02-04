let Puzzle = {
    columns: 10,
    rows: 8,
    margin: 1
};
let Construction = {
    columns: 5,
    rows: 6
};
let Game = {
    debug: true,
    squareSide: 40,
    get columns(){
        return Construction.columns + Puzzle.margin + Puzzle.columns;
    },
    get rows(){
        return Math.max(Puzzle.rows + 2, Construction.rows);
    },
    get width(){
        return Game.columns * Game.squareSide;
    },
    get height(){
        return Game.rows * Game.squareSide;
    }
};

export {Puzzle, Construction, Game};