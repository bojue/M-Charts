
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import "./hexagon.scss";

class HexagonComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    cols:any[];
    vals:number[];
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    initData() {
        this.data = []
        this.config = {
            W: 500, //长度
            H: 405, //高度
            START_X: 100, // 起点X
            START_Y: 100, // 起点Y
            RADIUS:50, //半径
            COLUMN_MAX:5, // 列数
            ROW:5 //
        }
        this.cols = [
            '#22D3AA',
            '#00b33c',
            '#99cc00',
            '#4944FE'
        ]
    }

    drawInit() {
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle ='#ffffff';
        this.drawRow();
    }

    drawRow() {
        for(let i=0;i<this.config.ROW;i++) {
            let x = i % 2 === 1 ? this.config.START_X + this.config.RADIUS * Math.cos(Math.PI /6) : this.config.START_X;
            let y = this.config.START_Y + this.config.RADIUS * ( 1 + Math.sin(Math.PI /6)) * i ;
            this.drawColumn(x, y,i);
        }
    }

    drawColumn(startX:number, startY:number, row:number) {
        let _column = row % 2 === 0 ? this.config.COLUMN_MAX : this.config.COLUMN_MAX - 1 ;
        console.log(_column, row)
        for(let i=0;i<_column;i++) {
            let x = startX + this.config.RADIUS * Math.cos(Math.PI /6) * i * 2 ;
            let y = startY;
            this.drawHeagon(x, y);
        }
    }

    drawHeagon(x:number,y:number) {
        this.ctx.beginPath();
        let angle = Math.PI / 3;
        let angle_begin = Math.PI / 6;
        let beginPoint_x:number = 0; 
        let beginPoint_y:number = 0;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.getCols();
        for(let i=0;i<6;i++) {
            let _angle = angle * i + angle_begin;
            let _x = (this.config.RADIUS * Math.cos(_angle) + x).toFixed(2);
            let _y = (this.config.RADIUS * Math.sin(_angle) + y).toFixed(2);
            if(i=== 0) {
                beginPoint_x = Number(_x);
                beginPoint_y = Number(_y);
                this.ctx.moveTo(_x,  _y);
            }else {
                this.ctx.lineTo(_x,  _y);
                if(i === 5) {
                    this.ctx.lineTo(beginPoint_x,  beginPoint_y);
                }
            }
            this.ctx.stroke();
        }
        this.ctx.fill();
    }

    getCols() {
        let index = parseInt((Math.random()*4 ) + '', 10)
        return this.cols[index];
    }

    render() {
        return <> 
            <CanvasComponent/>
        </>
    }
}
export default HexagonComponent;