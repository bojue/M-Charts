
import * as React from 'react';
import { init } from '../../provider/canvas';
import "./bar.scss";

class BarComponent extends React.Component {
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
            START_Y:490.5,
            H:85,
            START_X:50,
            WIDTH:500,
            COUNT:5
        }
        this.data = [
            {
                city:"成都",
                value:328
            },
            {
                city:"重庆",
                value:390
            },
            {
                city:"西安",
                value:349
            },
            {
                city:"北京",
                value:413
            },
            {
                city:"上海",
                value:407
            },
            {
                city:"青岛",
                value:329
            },
            {
                city:"南京",
                value:221
            },
            {
                city:"大理",
                value:130
            },
            {
                city:"贵州",
                value:279
            },
            {
                city:"广州",
                value:376
            }
        ]

    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        init(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    componentWillUnmount() {

    }
    
    initDraw() {
        let len = this.data.length;
        let h = this.config.COUNT * this.config.H;
        let w = this.config.WIDTH / len;
        let _w = w / 3 * 2;
        let _startX = 5  + this.config.START_X;
        
        for(let i=0;i<len;i++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(0,0, 0, 0.03)';
            this.ctx.fillRect(_startX + w * i, this.config.START_Y - h, _w, h);  
            let currentH = h * this.data[i].value / 500;
            let _y =  h * (500 -this.data[i].value  )/ 500
            this.ctx.fillStyle = '#4988FE';
            this.ctx.fillRect(_startX + w * i, this.config.START_Y - h + _y, _w, currentH);

            // 文字
            this.ctx.font = "12px serif";    
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.data[i].city , _startX + w * i + _w / 2, this.config.START_Y - h + _y - 15)
        }

        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.1)';
        this.ctx.lineWidth = 1;
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = "right";
        this.ctx.font = "14px serif";    
        this.ctx.fillStyle = '#999';
        for(let i=0;i<= this.config.COUNT;i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.config.START_X, this.config.START_Y - this.config.H * i);
            this.ctx.lineTo(this.config.START_X + this.config.WIDTH, this.config.START_Y - this.config.H * i);
            this.ctx.stroke();  
            this.ctx.fillText(100 * i,this.config.START_X - 20, this.config.START_Y - this.config.H * i)
        }

    }
   

    render() {
        return  <div className="charts">
                <canvas id="canvas" width="600" height="500"></canvas>
            </div>
    }
}
export default BarComponent;