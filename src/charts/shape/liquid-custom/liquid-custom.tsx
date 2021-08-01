import * as React from 'react';
import CanvasComponent from '../../comps/canvas/canvas';
import { CONFIG} from '../../config/color_def';
import "./liquid-custom.scss";

class LiquidCustomComponent extends React.Component {
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
            RADIUS: 80, // 圆饼半径
            RADIUS_INNER:40,
            COORDINATE_X:305, // x坐标
            COORDINATE_Y:159, // y坐标
            START_X:280,
            START_Y:235,
            WIDTH: 500,
            LINE_SUN_WIDHT:50,
            LINE_SUN_WIDHT_MIN:50,
            LINE_SUN_WIDHT_MAX:79,
            
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
        this.drawBorder();
        this.drawWave();
        this.animation();
    }

    drawBorder() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.moveTo(this.config.START_X, this.config.START_Y);
        this.ctx.lineTo(this.config.START_X, this.config.START_Y + this.config.LINE_SUN_WIDHT);
        this.ctx.lineTo(this.config.START_X - this.config.LINE_SUN_WIDHT_MIN, this.config.START_Y + this.config.LINE_SUN_WIDHT);
        this.ctx.lineTo(this.config.START_X - this.config.LINE_SUN_WIDHT_MIN, this.config.START_Y + this.config.LINE_SUN_WIDHT + this.config.LINE_SUN_WIDHT_MIN);
        this.ctx.lineTo(this.config.START_X, this.config.START_Y + this.config.LINE_SUN_WIDHT + this.config.LINE_SUN_WIDHT_MIN);
        this.ctx.lineTo(this.config.START_X, this.config.START_Y + this.config.LINE_SUN_WIDHT + this.config.LINE_SUN_WIDHT_MIN * 2);
        this.ctx.lineTo(this.config.START_X + this.config.LINE_SUN_WIDHT_MIN, this.config.START_Y + this.config.LINE_SUN_WIDHT + this.config.LINE_SUN_WIDHT_MIN * 2);
        this.ctx.lineTo(this.config.START_X + this.config.LINE_SUN_WIDHT_MIN, this.config.START_Y + this.config.LINE_SUN_WIDHT + this.config.LINE_SUN_WIDHT_MIN );
        this.ctx.lineTo(this.config.START_X + this.config.LINE_SUN_WIDHT_MIN * 2, this.config.START_Y + this.config.LINE_SUN_WIDHT + this.config.LINE_SUN_WIDHT_MIN );
        this.ctx.lineTo(this.config.START_X + this.config.LINE_SUN_WIDHT_MIN * 2, this.config.START_Y + this.config.LINE_SUN_WIDHT );
        this.ctx.lineTo(this.config.START_X + this.config.LINE_SUN_WIDHT_MIN , this.config.START_Y + this.config.LINE_SUN_WIDHT );
        this.ctx.lineTo(this.config.START_X + this.config.LINE_SUN_WIDHT_MIN , this.config.START_Y  );
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.clip();
    }

    drawArc() {
        this.ctx.strokeStyle = CONFIG.DEF_COLS[0];
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(this.config.COORDINATE_X,  this.config.COORDINATE_Y, this.config.RADIUS , 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(this.config.COORDINATE_X,  this.config.COORDINATE_Y, this.config.RADIUS_INNER , 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawWave() {
        this.ctx.fillStyle = CONFIG.DEF_COLS[0];
        let _s_x = this.config.COORDINATE_X - this.config.RADIUS;
        let _w = this.config.RADIUS * 2;
        let _h = this.config.START_Y  + this.config.LINE_SUN_WIDHT_MAX * 5;
        let _per_width = 10 / _w;
        let _wave_width = 0.15;
        let _wave_height = 10;
        let _offset_x = this.OFFSET_X_START;
        this.clearArc();
        let _startPoit = {
            x:0,
            y:0
        }
        this.ctx.beginPath();
        for (let x = _s_x ; x <  _s_x  + _w; x += _per_width) {
          const y = _wave_height * Math.sin((_wave_width + x ) * 0.07 + _offset_x );
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
        this.ctx.fill();
    }

    clearArc() {
        this.ctx.beginPath();
        this.ctx.arc(this.config.COORDINATE_X,  this.config.COORDINATE_Y, this.config.RADIUS_INNER , 0, Math.PI * 2, false);
        this.ctx.save();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        this.ctx.fillRect(this.config.START_X + 1 , this.config.START_Y, this.config.LINE_SUN_WIDHT_MIN - 2, this.config.LINE_SUN_WIDHT_MIN  * 2 + this.config.LINE_SUN_WIDHT);
        this.ctx.fillRect(this.config.START_X + 0 - this.config.LINE_SUN_WIDHT_MIN , this.config.START_Y + this.config.LINE_SUN_WIDHT, this.config.LINE_SUN_WIDHT_MIN * 3 , this.config.LINE_SUN_WIDHT_MIN  * 2 + this.config.LINE_SUN_WIDHT);
        this.ctx.restore();
    }

    animation() {
        this.OFFSET_X_START += 0.05;
        if(this.OFFSET_X_START > 10 * this.config.RADIUS) {
            this.OFFSET_X_START -= 10 * this.config.RADIUS
        }
        this.drawWave();
        requestAnimationFrame(this.animation.bind(this))
    }

    render() {
        return <><CanvasComponent/></>
    }
}
export default LiquidCustomComponent;