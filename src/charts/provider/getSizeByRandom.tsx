const defSize = 6;
const defMinSize = 0;

let getSizeByRandom = function(size:number = defSize, minSize:number = defMinSize) {
    let _size =  parseInt((Math.random() * size ) + '', 10)
    return Math.max(_size, minSize)
}

export {
    getSizeByRandom
}