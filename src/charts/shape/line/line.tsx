
import * as React from 'react';
import { Props } from 'react';
import { init } from '../../provider/canvas';
import "./line.scss";

class PieComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    vals:number[];
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
        // this.addLister();
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        init(this.canvas);
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    initData() {
        this.vals = [
            0,
            100,
            200,
            300,
            400
        ]
        this.data = [{
            name:"星期一",
            conut:  329,
        },{
            name:"星期二",
            conut:  220,
        },{
            name:"星期三",
            conut:  220,
        },{
            name:"星期四",
            conut:  315,
        },{
            name:"星期五",
            conut:  389,
        },{
            name:"星期六",
            conut:  309,
        },{
            name:"星期日",
            conut:  129,
        }]
        this.config = {
            W: 500, //长度
            H: 405, //高度
            START_X: 50, // 起点X
            START_Y: 40, // 起点Y
            Label_line: 5,
            R:4 //半径

        }
    }

    drawInit() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
        this.ctx.lineWidth = 1;
        // X轴
        this.ctx.moveTo(this.config.START_X, this.config.H + this.config.START_Y + 0.5);
        this.ctx.lineTo(this.config.START_X + this.config.W + 0.5, this.config.H + this.config.START_Y + 0.5);
        let xLen = this.data.length;
        let x = 70;
        this.ctx.stroke();  

        
        for(let i=0;i<xLen;i++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = '#4988FE';
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            let _currW = x * (i+1);
            this.ctx.textAlign = "left";
            this.ctx.moveTo(this.config.START_X + _currW + 0.5, this.config.H + this.config.START_Y + 0.5);
            this.ctx.lineTo(this.config.START_X + _currW + 0.5, this.config.H + this.config.START_Y + this.config.Label_line + 0.5);
            this.ctx.fillText(this.data[i]['name'], this.config.START_X - x / 2 + _currW + 0.5 , this.config.H + this.config.START_Y + this.config.Label_line + 10 + 0.5);
            this.ctx.stroke();   

            if(i< xLen-1) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = '#4988fe';
                this.ctx.moveTo(this.config.START_X - x / 2  + _currW, this.data[i]['conut']);
                this.ctx.lineTo(this.config.START_X + x / 2 + _currW, this.data [i+1]['conut']);
                this.ctx.stroke();    
            }

            this.ctx.beginPath();
            this.ctx.arc(this.config.START_X - x / 2 + _currW + 0.5 ,this.data[i]['conut'],this.config.R , 0, 2 * Math.PI);
            this.ctx.fillStyle = '#fff';
            this.ctx.fill();
            this.ctx.stroke();    

        }
       

        // Y轴
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
        this.ctx.moveTo(this.config.START_X + 0.5, this.config.START_Y);
        this.ctx.lineTo(this.config.START_X +  0.5, this.config.START_Y + this.config.H);
        this.ctx.stroke();    

        let yLen = this.vals.length;
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = "right";
        this.ctx.font = "12px serif";    
        for(let i=0;i<yLen;i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            let _currH = i > 0 ? - 100 * i : 0;
            this.ctx.moveTo(this.config.START_X , this.config.START_Y + this.config.H + _currH + 0.5);
            this.ctx.lineTo(this.config.START_X - this.config.Label_line, this.config.START_Y + this.config.H + _currH + 0.5);
            this.ctx.stroke();   
            this.ctx.fillStyle = '#4988FE';
            if(i > 0) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = 'rgba(0,0, 0, 0.05)';
                this.ctx.moveTo(this.config.START_X + 0.5, this.config.START_Y + this.config.H + _currH + 0.5);
                this.ctx.lineTo(this.config.START_X + this.config.W + 0.5, this.config.START_Y + this.config.H + _currH + 0.5);
                this.ctx.stroke();   
            }
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.vals[i], this.config.START_X - 10, this.config.START_Y + this.config.H + _currH );
        }
        this.ctx.stroke();        
        this.ctx.closePath();
    }



    moveEvent() {

    }
    render() {
        return  <div className="charts">
                <canvas id="canvas" onMouseMove={e => this.moveEvent()} width="600" height="500"></canvas>
            </div>
    }
}
export default PieComponent;