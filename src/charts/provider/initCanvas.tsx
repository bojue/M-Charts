declare const window: any;

let canvasInit = function(canvas:any) {
    if(!(canvas && canvas.getContext('2d'))) {
        console.info("参数传递canvas对象!!!");
    }
    var ctx = canvas.getContext('2d');          
    var dpr = getDpr();
    var w = canvas.width;
    var h = canvas.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(w * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = w + 'px';
    ctx.scale(dpr, dpr);
    return ctx;
}

let getDpr = function() {
    return window.devicePixelRatio || window.webkitDevicePixelRatio || window.mozDevicePixelRatio || 1;
}

export {
    getDpr, 
    canvasInit
}