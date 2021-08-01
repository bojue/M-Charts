import * as React from 'react';
import CanvasComponent from '../../comps/canvas/canvas';
import { CONFIG} from './../../config/color_def';
import "./boxplot.scss";

class BoxPlotComponent extends React.Component {
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
        this.initDraw();
    }

    initData() {
        this.config = {
            START_Y:470.5,
            H:80,
            START_X:50,
            WIDTH:500,
            COUNT:6,
            PADDING:5,
        }
        this.data = [			
            { label: "Registered", y: [46360, 55320, 82490, 101650, 71000] },
			{ label: "Web", y: [83133, 91830, 115828, 128982, 101381] },
			{ label: "System", y: [51910, 60143, 115056, 135450, 85800] },	
			{ label: "Application", y: [63364, 71653, 91120, 100556, 80757] },
			{ label: "Aerospace", y: [82725, 94361, 118683, 129191, 107142] },
			{ label: "Dentist", y: [116777, 131082, 171679, 194336, 146794] }]
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    initDraw() {
        this.ctx.strokeStyle = '#555555';
        this.ctx.lineWidth = 1;
        this.ctx.textBaseline = 'middle';
        this.ctx.font = "12px serif";    
        this.ctx.fillStyle = '#555555';

        this.drawAxisLine();
        this.drawData();
    }

    drawData() {
        this.ctx.textAlign = "center";
        this.ctx.lineWidth = 2;
        let len = this.data.length;
        let w = this.config.WIDTH / len;
        let _startX = this.config.START_X;

        for(let i=0;i<len;i++) {
            // data 
            let _data = this.data[i].y.sort((a:number,b:number)=> {
                return a-b;
            });
            if(_data.length <= 4) return;
            let obj = {
                upper:0,
                Q3:0,
                midian:0,
                Q1:0,
                lower:0
            }

            // 最简单测试数据
            obj.upper = _data[0];
            obj.Q3 = _data[1];
            obj.midian = _data[2];
            obj.Q1 = _data[3];
            obj.lower = _data[4];

            this.ctx.strokeStyle = '#4944FE';
            this.ctx.lineWidth = 1;
            
            // 绘制矩形
            this._drawRectByData(obj.Q3, obj.Q1, _startX, i, w);
            
            // 绘制线条
            this._drawXLineByData(obj.lower, _startX, i, w); 
            this._drawXLineByData(obj.midian, _startX, i, w);
            this._drawXLineByData(obj.upper, _startX, i, w);
            this._drawYLineByData(obj.upper, obj.Q3, _startX, i, w);
            this._drawYLineByData(obj.Q1, obj.lower, _startX, i, w);

            // 绘制填充矩形
            this._drawFillRectByData(obj.Q1, obj.midian, _startX, i, w, 'upper');
            this._drawFillRectByData(obj.midian, obj.Q3, _startX, i, w, 'lower');
            
            // 文字
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#555555';
            this.ctx.fillStyle = '#555555';
            this.ctx.fillText(this.data[i].label , _startX + w * i + w / 2, this.config.START_Y + 3 * this.config.PADDING)

            // lab
            this.ctx.strokeStyle = '#555555';
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(_startX + w * i + w / 2, this.config.START_Y );
            this.ctx.lineTo(_startX + w * i + w / 2, this.config.START_Y + this.config.PADDING);
            this.ctx.stroke();  
        }
    }

    // X轴
    _drawXLineByData(val:number, sx:number, i:number, w:number) {
        let y =val/ 40000 * this.config.H ;
        this.ctx.beginPath();
        let _x = sx + w * i + w / 2;
        let _y = this.config.START_Y - y;
        this.ctx.moveTo(_x - this.config.PADDING * 2, _y );
        this.ctx.lineTo(_x + this.config.PADDING * 2, _y);
        this.ctx.stroke();  
    }

    // Y轴
    _drawYLineByData(sY:number, eY:number,sx:number, i:number, w:number) {
        let sy = sY/ 40000 * this.config.H ;
        let ey = eY/ 40000 * this.config.H ;
        this.ctx.beginPath();
        let _x = sx + w * i + w / 2;
        let _y = this.config.START_Y - sy;
        this.ctx.moveTo(_x, _y );
        this.ctx.lineTo(_x,  this.config.START_Y - ey);
        this.ctx.stroke();  
    }

    // 绘制矩形
    _drawRectByData(Q3:number,Q1:number, sx:number, i:number, w:number) {
        let Q3Y = Q3/ 40000 * this.config.H ;
        let Q1Y = Q1/ 40000 * this.config.H ;
        this.ctx.beginPath();
        let _x = sx + w * i + w / 2;
        let _y = this.config.START_Y - Q1Y;
        let _w = this.config.PADDING * 4;
        let _h = Q1Y - Q3Y;
        this.ctx.strokeRect(_x - this.config.PADDING * 2, _y, _w, _h);
        this.ctx.stroke();  
    }

    // 绘制填充矩形
    _drawFillRectByData(sY:number,eY:number, sx:number, i:number, w:number, state: string) {
        let sy = sY/ 40000 * this.config.H ;
        let ey = eY/ 40000 * this.config.H ;
        let _width = 1;
        let _innderWidth = 2;
        this.ctx.beginPath();
        let _x = sx + w * i + w / 2;
        let _y = this.config.START_Y - sy;
        let _w = this.config.PADDING * 4;
        let _h = sy - ey;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(_x - this.config.PADDING * 2 + _width , _y + _width, _w - 2 * _width, _h - 2 * _width);
        this.ctx.fillStyle = state === 'upper' ? CONFIG.DEF_COLS[0]: CONFIG.DEF_COLS[3];
        this.ctx.fillRect(_x - this.config.PADDING * 2 + _innderWidth , _y + _innderWidth, _w - 2 * _innderWidth, _h - 2 * _innderWidth);
        this.ctx.fill();
        this.ctx.stroke();  
    }

    drawAxisLine() {
        this.ctx.textAlign = "right";
        let len = this.config.COUNT;
        // xAxis
        for(let i=0;i<len;i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.config.START_X - this.config.PADDING, this.config.START_Y - this.config.H * i);
            this.ctx.lineTo(this.config.START_X + this.config.WIDTH, this.config.START_Y - this.config.H * i);
            this.ctx.fillText(`${40000 * i}`,this.config.START_X - this.config.PADDING * 2, this.config.START_Y - this.config.H * i)
            this.ctx.stroke();  
        }

        // yAxis
        this.ctx.beginPath();
        this.ctx.moveTo(this.config.START_X + 0.5, this.config.START_Y );
        this.ctx.lineTo(this.config.START_X + 0.5,this.config.START_Y - this.config.H *( this.config.COUNT -1));
        this.ctx.stroke();  
    }

    render() {
        return <><CanvasComponent/></>
    }
}
export default BoxPlotComponent;