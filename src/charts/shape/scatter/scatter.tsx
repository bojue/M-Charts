
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import "./scatter.scss";
class ScatterComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    xLen:number; //x单元格数目
    xCellVal:number; //x每个单元格像素长度
    xCellWidth: number; //x单元格宽度
    yLen:number;
    yCellVal:number;
    yCellWidth:number;
    symbolSize:number;
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
        this.config = {
            W: 500, //长度
            H: 405, //高度
            START_X: 50, // 起点X
            START_Y: 40, // 起点Y
            Label_line: 5,
            Label_X_PADDING: 15, 
            R:4 //半径
        }
        this.data = [
            [10.0, 8.04],
            [1.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [3.1, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [21.0, 9.96],
            [6.0, 11.24],
        ],
        this.xLen = 7;
        this.xCellVal=65;
        this.xCellWidth = 3;
        this.yLen = 7;
        this.yCellVal=65;
        this.yCellWidth = 2;
        this.symbolSize = 5;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    addLister() {
        window.addEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    drawInit() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
        this.ctx.lineWidth = 1;
        // X轴
        this.ctx.moveTo(this.config.START_X, this.config.H + this.config.START_Y + 0.5);
        this.ctx.lineTo(this.config.START_X + this.config.W + 0.5, this.config.H + this.config.START_Y + 0.5);
        let xLen = this.xLen;
        let x =this.xCellVal;
        this.ctx.stroke();  

        for(let i=0;i<xLen;i++) {
            this.ctx.beginPath();
            this.ctx.font = "14px serif";    
            this.ctx.fillStyle = '#4988FE';
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            let _currW = x * (i+1);
            this.ctx.textAlign = "center";
            this.ctx.moveTo(this.config.START_X + _currW + 0.5, this.config.H + this.config.START_Y + 0.5);
            this.ctx.lineTo(this.config.START_X + _currW + 0.5, this.config.H + this.config.START_Y + this.config.Label_line + 0.5);
            this.ctx.fillText((i+1) * this.xCellWidth, this.config.START_X + _currW + 0.5 , this.config.H + this.config.START_Y + this.config.Label_line + this.config.Label_X_PADDING + 0.5);
            this.ctx.stroke();  
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.05)';
            this.ctx.moveTo(this.config.START_X + _currW + 0.5, this.config.H + this.config.START_Y + 0.5);
            this.ctx.lineTo(this.config.START_X + _currW + 0.5, this.config.START_Y + this.config.Label_line + 0.5);
            this.ctx.stroke();  
        }

        // Y轴
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
        this.ctx.moveTo(this.config.START_X + 0.5, this.config.START_Y);
        this.ctx.lineTo(this.config.START_X +  0.5, this.config.START_Y + this.config.H);
        this.ctx.stroke();    

        let yLen =  this.yLen;
        let y = this.yCellVal;
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = "right";
        this.ctx.font = "14px serif";    
        for(let i=0;i<yLen;i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            let _currH = i > 0 ? - y * i : 0;
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
            this.ctx.fillText(i * this.yCellWidth, this.config.START_X - 10, this.config.START_Y + this.config.H + _currH );
        
        }

        let len = this.data.length;
        for(let i=0;i<len;i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#4988fe';
            this.ctx.fillStyle = '#4988FE';

            let item = this.data[i];
            if(!Array.isArray(item)) return;
            let _currW = item[0] / this.xCellWidth * this.xCellVal;
            let _currH = item[1] / this.yCellWidth * this.yCellVal;
            this.ctx.arc(this.config.START_X + _currW + 0.5,this.config.START_Y + this.config.H - _currH + 0.5,this.symbolSize,0,2*Math.PI);
            this.ctx.fill(); 
            this.ctx.stroke();    
        }

        this.ctx.stroke();        
        this.ctx.closePath();
    }

    render() {
        return  <><CanvasComponent/></>
    }
}
export default ScatterComponent;