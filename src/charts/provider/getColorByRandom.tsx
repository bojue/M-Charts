let cols = [
    '#22D3AA',
    '#00b33c',
    '#99cc00',
    '#4988FE'
]

let getColByRandom = function() {
    let index = parseInt((Math.random() * cols.length ) + '', 10)
    return cols[index];
}

export {
    getColByRandom
}