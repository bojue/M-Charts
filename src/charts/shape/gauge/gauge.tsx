
import * as React from 'react';
import { init } from '../../provider/canvas';
import "./gauge.scss";

class GuageComponent extends React.Component {
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
        this.addLister();
    }

    initData() {
        this.config = {
            INTERNAL_RADIUS: 150, // 圆饼半径
            IN_WIDHT: 2,
            MIDDLE_RADIUS: 160, // middle半径
            OUBLINE_RADIUS: 200, // 外部半径
            COORDINATE_X:250, // x坐标
            COORDINATE_Y:250, // y坐标
            NUMS:60
        }
        this.data = [

        ]
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        init(this.canvas);
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
        this.ctx.save();
        this.ctx.translate(this.config.COORDINATE_X,this.config.COORDINATE_Y);
        let cell = 2 * Math.PI / this.config.NUMS;
        let len = this.config.NUMS;

        // 短刻度
        for(let i=0;i<len;i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.moveTo(this.config.INTERNAL_RADIUS,0);
            this.ctx.lineTo(this.config.INTERNAL_RADIUS -this.config.IN_WIDHT, 0);
            this.ctx.stroke();    
            this.ctx.rotate(cell);
            this.ctx.closePath();
        }
        this.ctx.rotate( Math.PI / 6 * 5);
        let Labcell = 4/ 15 * Math.PI;
        for(let i=0;i<=5;i++) {
            // 长刻度
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.moveTo(this.config.INTERNAL_RADIUS,0);
            this.ctx.lineTo(this.config.INTERNAL_RADIUS -10, 0);
            this.ctx.stroke();    
            // 文本
            this.ctx.font = '12px Microsoft'; 
            this.ctx.textAlign = 'right';
            this.ctx.fillText(20 * i, this.config.INTERNAL_RADIUS - 25, 0);
            this.ctx.rotate(Labcell);
            this.ctx.closePath();
        }

        // MIDDLE_RADIUS
        this.ctx.rotate(  2/ 5 * Math.PI);
        let Middlecell =  2 * Math.PI / this.config.NUMS;
        // middle
        for(let i=0;i<=40;i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#4988FE';
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(this.config.MIDDLE_RADIUS,0);
            this.ctx.lineTo(this.config.MIDDLE_RADIUS + 30, 0);
            this.ctx.stroke();    
            this.ctx.rotate(Middlecell);
            this.ctx.closePath();
        }

        // outline
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        var gradient = this.ctx.createLinearGradient(0, 0, 360, 0);
        gradient.addColorStop("0", "#4988FE");
        gradient.addColorStop("0.8", "#4944FE");
        this.ctx.strokeStyle = gradient;
        this.ctx.arc(0, 0, this.config.OUBLINE_RADIUS,  3/ 5 * Math.PI  +  2 * Math.PI / this.config.NUMS,  9 / 5 * Math.PI, false);
        this.ctx.stroke();
        this.ctx.restore();


        this.ctx.closePath();
    }

    render() {
        return  <div className="charts">
                <canvas id="canvas" width="600" height="500"></canvas>
            </div>
    }
}
export default GuageComponent;