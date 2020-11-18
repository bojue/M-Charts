
import * as React from 'react';
import { init, getEventCoordinates } from '../../provider/canvas';
import "./radar.scss";
import { array } from 'prop-types';
class RadarComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
    }

    initData() {
        this.config = {
            CENTER_X:300.5, // 起始点x
            CENTER_Y:250.5, // 起始点y
            ANGULAR: Math.PI /3, //转角角度
            LINE_WIDTH:200, // 线条长度
            COUNT:6, // 维度个数
            MAX_VAL:100, // 最大值
            TEXT_PEDDING: 10 // 文本间距
         
        }
        this.data = [
            {
                name:"JavaScript",
                value:65
            },{
                name:"Python",
                value:85
            },{
                name:"Node",
                value:70
            },{
                name:"Java",
                value:98
            },{
                name:"Web",
                value:90
            },{
                name:"Go",
                value:90
            },
        ]

    }

    componentWillUnmount() {
 
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        init(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    // drawText
    drawText(val:string ,x: number, y:number, state?:string) {
        this.ctx.fillStyle = '#99cc00';
        if(state === 'left') {
            this.ctx.fillRect(x - 5 , y - 10, this.ctx.measureText(val).width + 10, 24);
        }else if(state === 'right') {
            this.ctx.fillRect(x - 5 - this.config.TEXT_PEDDING - this.ctx.measureText(val).width + 10, y - 10, this.ctx.measureText(val).width + 10, 24);
        }else if(state === 'bottom'){
            this.ctx.fillRect(x - 5 - this.ctx.measureText(val).width /2 , y - 8 - this.config.TEXT_PEDDING, this.ctx.measureText(val).width + 10, 24);
        }else {
            this.ctx.fillRect(x - 5 - this.ctx.measureText(val).width /2 , y - 12 + this.config.TEXT_PEDDING, this.ctx.measureText(val).width + 10, 24);
        }
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText( val , x, y );
    }

    drawInit() {
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.2)';
        this.ctx.lineWidth = 1;
        let startAngular = Math.PI / 6;
        let points:Array<Array<any>> = [[]];
        let args = []; // 角度数组

        // 绘制线条
        this.ctx.font = "14px serif";
        for(let i=0;i<this.config.COUNT;i++) {
            this.ctx.beginPath();
            let angular = startAngular + this.config.ANGULAR * i;
            args.push(angular)
            this.ctx.moveTo(this.config.CENTER_X, this.config.CENTER_Y);
            let x = (this.config.CENTER_X + this.config.LINE_WIDTH * Math.cos(angular)).toFixed(2);
            let y = (this.config.CENTER_Y + this.config.LINE_WIDTH * Math.sin(angular)).toFixed(2);
            this.ctx.lineTo(x, y);
            this.ctx.textBaseline = 'middle';
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.2)';
            if(this.config.CENTER_X < x) {
                this.ctx.textAlign = 'left';
                let _x = parseInt( x ) + this.config.TEXT_PEDDING;
                this.drawText(this.data[i].name + " " + this.data[i].value + "%", _x,  y, 'left')
            }else if(this.config.CENTER_X == x) {
                this.ctx.textAlign = 'center';
                if(this.config.CENTER_Y < y) {
                    this.ctx.textBaseline = 'top';
                    this.drawText(this.data[i].name + " " + this.data[i].value + "%", x , y + this.config.TEXT_PEDDING, 'top');
                }else {
                    this.ctx.textBaseline = 'bottom';
                    this.drawText(this.data[i].name + " " + this.data[i].value + "%", x , y - this.config.TEXT_PEDDING, 'bottom');
                }
            }else {
                this.ctx.textAlign = 'right';
                this.drawText(this.data[i].name + " " + this.data[i].value + "%", x - this.config.TEXT_PEDDING, y, 'right');
            }
  
            this.ctx.stroke();
            for(let j=0 ;j<4;j++) {
                let point = {
                    x: j === 3 ? x : (this.config.CENTER_X + this.config.LINE_WIDTH / 4 * (1+ j)  * Math.cos(angular)).toFixed(2), 
                    y: j === 3 ? y : (this.config.CENTER_Y + this.config.LINE_WIDTH  / 4 * (1+ j)* Math.sin(angular)).toFixed(2)
                }

                if(!points[j]) {
                    points[j] = [];
                }
                points[j][i] = point;

            }
        }

    

        // 绘制区域分割
        let len = points.length;
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.1)';
        for(let i=len-1;i>=0;i--) {
            let lines =  points[i];
            let subLen = lines.length;
            this.ctx.beginPath();
            for(let j=0;j<subLen;j++) {
                let point = lines[j];
                if(j === 0) {
                    this.ctx.moveTo(point.x, point.y);
                }else {
                    this.ctx.lineTo(point.x, point.y);
                }
               
            }
            if(subLen) {
                this.ctx.lineTo(lines[0].x, lines[0].y);
            }

            this.ctx.stroke();
        }

        // 绘制数据
        let length = this.data.length;
        this.ctx.strokeStyle = '#4988FE';
        this.ctx.beginPath();
        let dataPoints = [];
        for(let i=0;i<length;i++) {
            let a = args[i];
            let data = this.data[i];
            let val = data.value / this.config.MAX_VAL;
            let x = (this.config.CENTER_X + this.config.LINE_WIDTH * Math.cos(a) * val).toFixed(2);
            let y = (this.config.CENTER_Y + this.config.LINE_WIDTH * Math.sin(a) * val).toFixed(2);
            if(i=== 0) {
                this.ctx.moveTo(x, y);
            }else {
                this.ctx.lineTo(x, y);
            }
            dataPoints.push([x, y])
        }
    
        this.ctx.strokeStyle = '#4988FE';
        if(length) {
            let a = args[0];
            let data = this.data[0];
            let val = data.value / this.config.MAX_VAL;
            let x = (this.config.CENTER_X + this.config.LINE_WIDTH * Math.cos(a) * val).toFixed(2);
            let y = (this.config.CENTER_Y + this.config.LINE_WIDTH * Math.sin(a) * val).toFixed(2);
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();

        // 绘制坐标点
        this.ctx.strokeStyle = '#4988FE';
        this.ctx.fillStyle = "#fff";
        this.ctx.lineWidth = 3;
        for(let i=0;i<length;i++) {
            this.ctx.beginPath();
            let data = dataPoints[i];
            this.ctx.arc( data[0] , data[1] , 4, 0, 2*Math.PI);
            this.ctx.stroke();
            this.ctx.fill();
        }

    }

    render() {
        return  <div className="charts">
                <canvas id="canvas" width="600" height="500"></canvas>
            </div>
    }
}
export default RadarComponent;