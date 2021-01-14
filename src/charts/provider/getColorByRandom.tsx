import { CONFIG } from './../config/color_def';

let cols = CONFIG.DEF_COLS;

let getColByRandom = function() {
    let index = parseInt((Math.random() * cols.length ) + '', 10)
    return cols[index];
}

let getColByIndex = function(index:number) {
    return cols[index];
}

export {
    getColByRandom,
    getColByIndex
}