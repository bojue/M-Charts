
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import "./hexagon.scss";

class HexagonComponent extends React.Component {
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
            RADIUS:50 //半径
        }
    }

    drawInit() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle ='#4988FE';
        this.ctx.lineWidth = 4;
        this.drawHeagon(100, 100);
        this.ctx.fill();
    }


    drawHeagon(x:number,y:number) {
        let angle = Math.PI / 3;
        let angle_begin = Math.PI / 6;
        let beginPoint_x:number = 0; 
        let beginPoint_y:number = 0;
        this.ctx.beginPath();
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
    }




    render() {
        return <> 
            <CanvasComponent/>
        </>
    }
}
export default HexagonComponent;