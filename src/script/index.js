let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let init = function() {
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

let addLister = function() {
    canvas.addEventListener('mousemove', (event) => {
        let x = event.clientX;
        let y = event.clientY;
        let res = (Math.pow(x-300, 2) + Math.pow(y-300, 2)) < Math.pow(180, 2);
        if(res) {
            console.log(res);
        }
        
    })
}

init();
addLister();