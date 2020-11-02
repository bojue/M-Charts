
import * as React from 'react';
import { Props } from 'react';
import { canvasInit } from './../../provider/initCanvas';
import "./pie.scss";

class PieComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    colsArr:string[];
    argleArr:number[];
    argleCurrentArr:number[];
    activeIndex:number;
    config: any;
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
        this.addLister();
    }

    initData() {
        this.activeIndex = -1;
        this.colsArr =  [
            '#4988FE',
            '#22D3AA',
            '#00b33c',
            '#99cc00',
            '#4944FE'
        ]
        this.config = {
            RADIUS: 180, // 圆饼半径
            COORDINATE_X:250, // x坐标
            COORDINATE_Y:250, // y坐标
            HOVER_RADIUS_RATIO:1.05, // 鼠标移入缩放比例
            TEXT_LINE_WIDTH:15, // 线条长度 
            TEXT_LINE_POLYLINE_WIDTH:10, // 线条折线部分程度
            TEXT_PADDING: 5, // 文本
        }
    
        this.argleArr =  [
            Math.PI /4,
            Math.PI /4 * 3,
            Math.PI /6,
            Math.PI /2,
            Math.PI /3
        ];
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        canvasInit(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    drawInit() {
        this.argleCurrentArr = [];
        let len = this.argleArr.length;
        let currArgle = 0;
        for(let i=0;i<len;i++) {
            let color = this.colsArr[i];
            let midArgs = this.argleArr[i] / 2+ currArgle;
            let endArgs:number = this.argleArr[i] + currArgle;
            
            let _sy = Math.sin(midArgs) * this.config.RADIUS;
            let _sx = Math.cos(midArgs) * this.config.RADIUS;
            let _ey = Math.sin(midArgs) * (this.config.RADIUS + this.config.TEXT_LINE_WIDTH);
            let _ex = Math.cos(midArgs) * (this.config.RADIUS + this.config.TEXT_LINE_WIDTH);
        
            this.ctx.beginPath();
            this.ctx.lineCap = 'round';
            this.ctx.moveTo(_sx + this.config.COORDINATE_X, _sy + this.config.COORDINATE_Y);
            this.ctx.lineTo(_ex + this.config.COORDINATE_X, _ey + this.config.COORDINATE_Y);
            let str = "当前下标 " + i;
            this.ctx.fillStyle= color;
            this.ctx.font = "100 20px";
            if(midArgs > Math.PI * 3 /2 || midArgs < Math.PI /2) {
                this.ctx.textAlign = 'left';
            }else {
                this.ctx.textAlign = 'right';
            }
            if(_sx >= 0) {
                this.ctx.lineTo(_ex + this.config.COORDINATE_X + this.config.TEXT_LINE_POLYLINE_WIDTH, _ey + this.config.COORDINATE_Y);
                this.ctx.fillText(str, _ex + this.config.COORDINATE_X + this.config.TEXT_LINE_POLYLINE_WIDTH + this.config.TEXT_PADDING  , _ey + this.config.COORDINATE_Y);
            }else {
                this.ctx.lineTo(_ex + this.config.COORDINATE_X - this.config.TEXT_LINE_POLYLINE_WIDTH, _ey +  this.config.COORDINATE_Y);
                this.ctx.fillText(str, _ex + this.config.COORDINATE_X - this.config.TEXT_PADDING - this.config.TEXT_LINE_POLYLINE_WIDTH, _ey +  this.config.COORDINATE_Y);
            }
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo( this.config.COORDINATE_X,  this.config.COORDINATE_Y);
            this.ctx.arc( this.config.COORDINATE_X,  this.config.COORDINATE_Y, this.config.RADIUS , currArgle, endArgs, false);
            this.ctx.fill();
            currArgle = endArgs;
            this.argleCurrentArr[i] = endArgs;
        }
    }

    addLister() {
        window.addEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    moveEvent() {
        if(!event) return;
        event.preventDefault();
        this.throttle(this.updateCont(event), 16)
    }
 
    throttle(fn:any, time:number) {
        let _lastTime:number = 0;
        return function () {
        let _nowTime = + new Date()
        if (_nowTime - _lastTime > time || !_lastTime) {
            fn();
            _lastTime = _nowTime
        }
        }
    };

    updateCont(event:MouseEvent|any) {
        let x = event.clientX - this.clientRect.x;
        let y = event.clientY - this.clientRect.y;
        let hoverBool = (Math.pow(x- this.config.COORDINATE_X, 2) + Math.pow(y- this.config.COORDINATE_Y, 2)) < Math.pow(this.config.RADIUS * this.config.HOVER_RADIUS_RATIO, 2);
        let activeBool = (Math.pow(x- this.config.COORDINATE_X, 2) + Math.pow(y- this.config.COORDINATE_Y, 2)) < Math.pow(this.config.RADIUS, 2);
        if(activeBool || hoverBool && this.activeIndex > -1) {
            if( this.canvas.style.cursor !== 'pointer') {
                this.canvas.style.cursor = 'pointer'
            }
            let angle = Math.atan2(y - this.config.COORDINATE_Y, x - this.config.COORDINATE_X);
            angle = angle >= 0 ? angle : angle + Math.PI * 2;
            let currIndex = this.getCurrentItemIndex(angle);
            this.activeIndex = currIndex;
            this.updateDraw(this.activeIndex);
            this.drawText(event);
        }else {
            if( this.canvas.style.cursor === 'pointer') {
                this.canvas.style.cursor = 'default';
            }
            if(this.activeIndex >= 0) {
                this.activeIndex = -1;
                this.clearCanvas();
                this.drawInit();
            }
    
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawText(event:MouseEvent) {
        let x = event.clientX - this.clientRect.x;
        let y = event.clientY - this.clientRect.y;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.fillRect(x + 10, y + 10, 90, 30);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.colsArr[this.activeIndex];
        this.ctx.strokeRect(x + 9.5, y + 9.5, 90, 30);
        this.ctx.fillStyle = this.colsArr[this.activeIndex];
        this.ctx.font = "30px";
        this.ctx.fillText("区域下标  "+ this.activeIndex, x + 20, y + 28);

    }

    updateDraw(currIndex:number, state?:string) {
        this.clearCanvas();
        this.drawInit();
        this.ctx.beginPath();
        this.ctx.moveTo(this.config.COORDINATE_X, this.config.COORDINATE_Y);
        this.ctx.fillStyle = this.colsArr[currIndex];
        this.ctx.arc(this.config.COORDINATE_X, this.config.COORDINATE_Y, this.config.RADIUS * this.config.HOVER_RADIUS_RATIO, this.argleCurrentArr[currIndex -1] || 0, this.argleCurrentArr[currIndex], false);
        this.ctx.fill();
    }

    getCurrentItemIndex(args:number) {
        let len = this.argleCurrentArr.length;
        for(let i=0;i<len-1;i++) {
            let curr = this.argleCurrentArr[i];
            if(curr >= args && args < this.argleCurrentArr[i+1]) {
                return i;
            }
        }
        return len-1;
    }



    render() {
        return  <div className="charts">
                <canvas id="canvas" onMouseMove={e => this.moveEvent()} width="600" height="500"></canvas>
            </div>
    }
}
export default PieComponent;