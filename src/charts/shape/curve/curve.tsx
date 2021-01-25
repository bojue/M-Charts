import * as React from 'react';
import CanvasComponent from '../../comps/canvas';
import { CONFIG} from './../../config/color_def';
import { curveData } from './../../mock';
import "./curve.scss";

class CurveComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    OFFSET_X_START:number;

    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.initDraw();
        this.draw();
    }

    initData() {
        this.data = curveData;
        this.config = {
            START_X:40.5, // 起始点x
            START_Y:430.5, // 起始点y
            WIDTH:520,
            MAX_VAL:2500,
            MIN_VAL:0,
            PER_HEIGTH: 70,
            lab_padding:5,
            data_padding:10,
            COUNT:5, // 维度个数
        }
    }



    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    draw() {
        this.drawAxisLine();
        this.drawDate();
    }

    getCol() {
        return CONFIG.DEF_COLS[0];
    }
    
    drawDate() {
        let len = this.data.length;
        let per_w = (this.config.WIDTH - this.config.lab_padding * 2) / len;
        let h =  (this.config.PER_HEIGTH * 5);
        let perNode = {
            x:0,
            y:0
        };
        let points = [];
        for(let i=0;i<len;i++) {
            let item = this.data[i];
            let x = per_w * i + this.config.START_X + this.config.lab_padding ;
            let y =   this.config.START_Y -  item.scales / (this.config.MAX_VAL - this.config.MIN_VAL) * h;
            perNode = {
                x:x,
                y:y
            }
            points.push(perNode);
        } 
        this.drawLines(points)
    }

    drawLines(list:any[]) {
        let len = list.length;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.getCol();

        for(let i=0;i<len;i++) {
            let item = list[i];
            if(i === 0) {
                this.ctx.moveTo(item.x, item.y);
            }else if(i && i < len -3){
                let next1 = list[i+1];
                let Ax = item.x + (next1.x - item.x) / 4;
                let Ay = item.y + (next1.y - item.y) / 4;
                let Bx = next1.x - (next1.x - item.x) / 4;
                let By = next1.y - (next1.y - item.y) / 4;
                this.ctx.bezierCurveTo(item.x, item.y , Ax, Ay, Bx, By);
            }
        }
        this.ctx.stroke(); 
    }

    initDraw() {
        this.ctx.textAlign = 'right';
        this.ctx.strokeStyle = '#555555';
        this.ctx.lineWidth = 1;
        this.ctx.textBaseline = 'middle';
        this.ctx.font = "12px serif";    
        this.ctx.lineWidth = 1;
    }

    drawAxisLine() {
        let len = this.config.COUNT;
        let _sx = this.config.START_X;
        let _w = this.config.WIDTH;
        this.ctx.fillStyle = '#555555';
        let _h = (this.config.MAX_VAL - this.config.MIN_VAL) / this.config.COUNT;
        for(let i=0;i<=len;i++) {
            let y =  this.config.START_Y -  i *  this.config.PER_HEIGTH
            this.ctx.beginPath();
            this.ctx.moveTo(_sx , y);
            this.ctx.lineTo(_sx + _w, y);
            this.ctx.stroke(); 
            this.drawYLab(y, _h * i) 
        }
        let yLen = this.data.length;
        let yCount = 20;
        let per_w = (this.config.WIDTH - this.config.lab_padding * 2) / yLen;
        this.ctx.textAlign = 'center';
        for(let i=0;i<yLen;i += yCount) {
            let item = this.data[i];
            let x = per_w * i + this.config.START_X + this.config.lab_padding ;
            this.ctx.beginPath();
            this.ctx.moveTo(x , this.config.START_Y);
            this.ctx.lineTo(x , this.config.START_Y + this.config.lab_padding);
            this.ctx.stroke(); 
            this.drawXLab(x, item && item['Date'])
        } 
    }

    drawXLab(x:number, val:number) {
        this.ctx.beginPath();
        this.ctx.fillText(val, x,  this.config.START_Y + this.config.lab_padding * 3);
        this.ctx.fill();
    }

    drawYLab(y:number, val:number) {
        this.ctx.beginPath();
        this.ctx.fillText(val, this.config.START_X - this.config.lab_padding, y);
        this.ctx.fill();
    }
   
    render() {
        return <><CanvasComponent/></>
    }
}
export default CurveComponent;