import * as React from 'react';
import { init } from '../../provider/canvas';
import "./bar-negative.scss";

class BarNagativeComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    datas:any[];
    data:any[];
    colors = [];

    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
    }

    initData() {
        this.config = {
            startX:40.5,
            startY:55.5,
            H: 400, // 高度
            W:490, // 宽度
            labelWidth: 8,
            labelCount:5,
            vals:[-0.4,-0.2, 0, 0.2, 0.4, 0.6]
        }
        this.datas = ['ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one']
        this.data = [
            -0.17,
            -0.29,
            0.2, 
            0.44,
            -0.23,
            0.13,
            -0.17,
            0.47,
            -0.36,
            0.18
        ]
    }

    componentWillUnmount() {

    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        init(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }


    drawInit() {
        this.drawTitle();
        this.drawData(); // 绘制数据
    }

    drawData() {   

        // 绘制虚线
        let len = this.config.labelCount;
        let w = this.config.W / len ;
        this.ctx.setLineDash([5,15]);
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.3)';
        this.ctx.lineWidth = 1;
        for(let i=0;i<=len;i++) {
            this.ctx.beginPath();
            let x = this.config.startX + w * i;
            this.ctx.moveTo( x , this.config.startY);
            this.ctx.lineTo( x , this.config.startY + this.config.H);
            this.ctx.stroke();  
        }

        // 绘制data
        this.ctx.font = "16px serif";   
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = 'middle';
        let dataLen = this.datas.length;
        let h = this.config.H  / dataLen;
        let ZeroX = this.config.startX + w * 2;
        for(let i=0;i<dataLen;i++) {
            let lab = this.datas[this.datas.length -1 -i];
            let val = this.data[i];
            this.ctx.fillStyle = i % 2 === 0 ? '#99cc00' : '#4988fe';
            let _sY =  h * i + 0.1 * h+ this.config.startY ;
            let _h = h * 0.8;
            if(val < 0) {
                let _sX = w / 0.2 * (0 - val);
                this.ctx.fillRect(ZeroX - _sX, _sY, _sX, _h);
                this.ctx.fillStyle = '#ffffff'
                this.ctx.fillText( lab,  ZeroX -  _sX /2 ,  h * i + 0.5 * h + this.config.startY );
            }else {
                let _sX = w / 0.2 * val;
                this.ctx.fillRect(ZeroX, _sY, _sX, _h);
                this.ctx.fillStyle = '#ffffff'
                this.ctx.fillText( lab,  ZeroX +  _sX /2 ,  h * i + 0.5 * h + this.config.startY );
            }
            
        }
    }

    drawTitle() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.8)';
        this.ctx.lineWidth = 1;

        // 绘制横轴
        this.ctx.moveTo(this.config.startX, this.config.startY );
        this.ctx.lineTo(this.config.startX + this.config.W , this.config.startY);
        this.ctx.stroke();  

        // 绘制Label 
        let len = this.config.labelCount;
        let w = this.config.W / len ;
        this.ctx.font = "14px serif";    
        this.ctx.fillStyle = 'rgba(0,0, 0, 0.8)';
        this.ctx.textAlign = "center";
        for(let i=0;i<=len;i++) {
            this.ctx.beginPath();
            let x = this.config.startX + w * i;
            this.ctx.moveTo( x , this.config.startY - this.config.labelWidth );
            this.ctx.lineTo( x , this.config.startY);
            this.ctx.fillText( this.config.vals[i], x , this.config.startY - 2 * this.config.labelWidth  );
            this.ctx.stroke();  
        }

    }


    render() {
        return  <div className="charts">
                <canvas id="canvas" width="600" height="500"></canvas>
            </div>
    }
}
export default BarNagativeComponent;