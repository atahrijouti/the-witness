namespace Config{
    export let Puzzle = {
        columns: 10,
        rows: 8,
        margin: 1
    };
    export let Construction = {
        columns: 5,
        rows: 6
    };
    export let Game = {
        debug: true,
        squareSide: 40,
        squareColor: "#2378ef",
        debugColor: 'rgba(0,255,0,0.65)',
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
}

export default Config;