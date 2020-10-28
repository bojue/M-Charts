let init = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle='green';
    ctx.moveTo(300, 300);
    ctx.arc(300, 300, 180, 0, Math.PI / 8);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.fillStyle='red';
    ctx.arc(300, 300, 180, Math.PI, 1.5 * Math.PI );
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.fillStyle='blue';
    ctx.arc(300, 300, 180, 1.5 * Math.PI, 2 * Math.PI );
    ctx.fill();
}

init();