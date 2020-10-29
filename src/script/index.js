import {throttle} from './utils/throttle';
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let clientRect = canvas.getBoundingClientRect();
let colsArr = [
    '#4988FE',
    '#22D3AA',
    '#00b33c',
    '#99cc00',
    '#4944FE'
];
let argleArr = [
    Math.PI /4,
    Math.PI /4 * 3,
    Math.PI /6,
    Math.PI /2,
    Math.PI /3
];
let argleCurrentArr = [];
let activeIndex = null;
let option = {
    title: {
        text: "广告收益百分比",
        textAlign: "center"
    },
    series: [
        {
            name:"广告收益百分比",
            data:[{
                name:"百度",
                value:800,
            },{
                name:"谷歌",
                value:2000,
            },{
                name:"FaceBook",
                value:1600,
            },{
                name:"Alibaba",
                value:1900,
            },{
                name:"Tencet",
                value:1200
            }]
        }
    ]
}

function drawInit() {
    argleCurrentArr = [];
    let len = argleArr.length;
    let currArgle = 0;
    for(let i=0;i<len;i++) {
        let color = colsArr[i];
        let midArgs = argleArr[i] / 2+ currArgle;
        let endArgs = argleArr[i] + currArgle;
           
        let _sy = Math.sin(midArgs) * 200;
        let _sx = Math.cos(midArgs) * 200;
        let _ey = Math.sin(midArgs) * 220;
        let _ex = Math.cos(midArgs) * 220;
    
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.moveTo(_sx + 300, _sy + 300);
        ctx.lineTo(_ex + 300, _ey + 300);
        let str = "当前下标 " + i;
        ctx.fillStyle= color;
        ctx.font = "100 20px";
        if(midArgs > Math.PI * 3 /2 || midArgs < Math.PI /2) {
            ctx.textAlign = 'left';
        }else {
            ctx.textAlign = 'right';
        }
        if(_sx >= 0) {
            ctx.lineTo(_ex + 315, _ey + 300);
            ctx.fillText(str, _ex + 320 , _ey + 300);
        }else {
            ctx.lineTo(_ex + 285, _ey + 300);
            ctx.fillText(str, _ex + 280, _ey + 300);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(300, 300);
        ctx.arc(300, 300, 200, currArgle, endArgs, false);
        ctx.fill();
        currArgle = endArgs;
        argleCurrentArr[i] = endArgs;
    }
}

function addLister() {
    canvas.addEventListener('mousemove', throttleMouseMove);
    window.addEventListener('resize', function() {
        clientRect = canvas.getBoundingClientRect();
    })
}

function throttleMouseMove(event) {
    if(!event) return;
    event.preventDefault();
    throttle(updateContent(event), 16)
}

function updateContent(event) {
    let x = event.clientX - clientRect.x;
    let y = event.clientY - clientRect.y;
    let res = (Math.pow(x-300, 2) + Math.pow(y-300, 2)) < Math.pow(200, 2);
    if(res) {
        if( canvas.style.cursor !== 'pointer') {
            canvas.style.cursor = 'pointer'
        }
        let angle = Math.atan2(y - 300, x - 300);
        angle = angle >= 0 ? angle : angle + Math.PI * 2;
        let currIndex = getCurrentItemIndex(angle);
        // 优化方案
        // if(activeIndex !== currIndex || !activeIndex) {
        //     activeIndex = currIndex;
        //     updateDraw(activeIndex);
        //     drawText(event);
        // }
        activeIndex = currIndex;
        updateDraw(activeIndex);
        drawText(event);
    }else {
        if( canvas.style.cursor === 'pointer') {
            canvas.style.cursor = 'default';
        }
        if(activeIndex >= 0) {
            updateDraw(activeIndex);
            activeIndex = null;
        }
  
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawText(event) {
    let x = event.clientX - clientRect.x;
    let y = event.clientY - clientRect.y;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(x + 10, y + 10, 90, 30);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ff704d';
    ctx.strokeRect(x + 9.5, y + 9.5, 90, 30);
    ctx.fillStyle = colsArr[activeIndex];
    ctx.font = "30px";
    ctx.fillText("区域下标  "+ activeIndex, x + 20, y + 28);

}

function updateDraw(currIndex, state) {
    clearCanvas();
    drawInit();
    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.fillStyle = colsArr[currIndex];
    ctx.arc(300, 300, 210, argleCurrentArr[currIndex -1] || 0, argleCurrentArr[currIndex], false);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.strokeStyle = colsArr[currIndex];;
    ctx.arc(300, 300, 212, argleCurrentArr[currIndex -1] || 0, argleCurrentArr[currIndex], false);
    ctx.stroke();
}

function getCurrentItemIndex(args) {
    let len = argleCurrentArr.length;
    for(let i=0;i<len-1;i++) {
        let curr = argleCurrentArr[i];
        if(curr >= args && args < argleCurrentArr[i+1]) {
            return i;
        }
    }
    return len-1;
}


drawInit();
addLister();