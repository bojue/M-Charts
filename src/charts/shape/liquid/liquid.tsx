import * as React from 'react';
import CanvasComponent from '../../comps/canvas';
import { CONFIG} from './../../config/color_def';
import "./liquid.scss";

class LiquidComponent extends React.Component {
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
    }

    initData() {
        this.OFFSET_X_START = 0;
        this.config = {
            RADIUS: 180, // 圆饼半径
            RADIUS_INNER:170,
            COORDINATE_X:300, // x坐标
            COORDINATE_Y:250, // y坐标
            WIDTH: 500,
        }

    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    initDraw() {
        this.ctx.font='50px Arial';
        this.ctx.textAlign = 'center';

        this.drawArc();
        this.drawWave();
        this.animation();
    }

    drawArc() {
        this.ctx.strokeStyle = CONFIG.DEF_COLS[0];
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.arc( this.config.COORDINATE_X,  this.config.COORDINATE_Y, this.config.RADIUS , 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ffffff";
        this.ctx.arc( this.config.COORDINATE_X,  this.config.COORDINATE_Y, this.config.RADIUS_INNER , 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.clip();
    }

    drawWave() {
        let _s_x = this.config.COORDINATE_X - this.config.RADIUS;
        let _w = this.config.RADIUS * 2;
        let _h = this.config.COORDINATE_Y  + this.config.RADIUS;
        let _per_width = 10 / _w;
        let _wave_width = 0.05;
        let _wave_height = 15;
        let _offset_x = this.OFFSET_X_START;
        this.clearArc();
        let _startPoit = {
            x:0,
            y:0
        }
        this.ctx.beginPath();
        for (let x = _s_x ; x <  _s_x  + _w; x += _per_width) {
          const y = _wave_height * Math.sin((_wave_width + x ) * 0.05 + _offset_x );
          if( x === _s_x) {
            _startPoit = {
                x:x,
                y: (_h / 2) + y
            }
          }
          this.ctx.lineTo(x, (_h / 2) + y);
        }
        this.ctx.lineTo(_w + _s_x, _h);
        this.ctx.lineTo(_s_x, _h);
        this.ctx.lineTo(_startPoit.x, _startPoit.y);        
        this.ctx.fillStyle = CONFIG.DEF_COLS[0];
        this.ctx.fill();
        this.ctx.stroke();
        this.drawText();
    }

    drawText() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(`50%`, this.config.COORDINATE_X , this.config.COORDINATE_Y + this.config.RADIUS / 5);
        this.ctx.fill();
        this.ctx.stroke();
    }

    clearArc() {
        this.ctx.beginPath();
        this.ctx.arc(this.config.COORDINATE_X,  this.config.COORDINATE_Y, this.config.RADIUS_INNER , 0, Math.PI * 2, false);
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.restore();
    }

    animation() {
        this.OFFSET_X_START += 0.05;
        if(this.OFFSET_X_START > this.config.RADIUS) {
            this.OFFSET_X_START -= this.config.RADIUS
        }
        console.log(this.OFFSET_X_START);
        this.drawWave();
        requestAnimationFrame(this.animation.bind(this))
    }

    render() {
        return <><CanvasComponent/></>
    }
}
export default LiquidComponent;