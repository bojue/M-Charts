let init = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle='#4988FE';
    ctx.moveTo(300, 300);
    ctx.arc(300, 300, 180, 0, Math.PI / 4);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.fillStyle='#22D3AA';
    ctx.arc(300, 300, 180, Math.PI / 4,  Math.PI );
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.fillStyle='#00b33c';
    ctx.arc(300, 300, 180, Math.PI ,  Math.PI * 1.4 );
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.fillStyle='#4944FE';
    ctx.arc(300, 300, 180, 1.4 * Math.PI, 2 * Math.PI );
    ctx.fill();
}

init();