
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import "./polar-area.scss";

class PolarAreaComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    cols:any[];
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
            R:20,
            COORDINATE_X:300, // x坐标
            COORDINATE_Y:250, // y坐标
            ANGULAR: Math.PI /3, //转角角度
            COUNT:10, // 维度个数
            MAX_VAL:100, // 最大值
            TEXT_PEDDING: 10 // 文本间距
         
        }
        this.cols = [
            // 'rgba(255, 99, 132, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(201, 203, 207,1)',
            // 'rgba(255, 205, 86,1)',
            // 'rgba(54, 162, 235,1)'
            '#4988FE',
            '#22D3AA',
            '#00b33c',
            '#99cc00',
            '#4944FE'
        ]
        this.data = [52, 72, 54, 58, 74]
    }

    componentWillUnmount() {
 
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }


    drawInit() {
        this.ctx.lineWidth = 1;
        let len = this.config.COUNT;
        let val = this.config.MAX_VAL / 10;
        for(let i=0;i<len;i++) {
            let _r = (i+1) * this.config.R;
            this.drawArc(_r);
            this.drawFillText(_r, val * (i + 1));
        }
        
        let count = 0;
        let startAngle = 0;
        let dataLen = this.data.length;
        for(let i=0;i<dataLen;i++) {
            count += this.data[i];
        }
        for(let i=0;i<dataLen;i++) {
            let item = this.data[i];
            let currAngle = item / count * Math.PI * 2;
            let r = item / 10 * this.config.R;
            this.drawArea(startAngle , currAngle, r, this.cols[i]);
            startAngle = startAngle + currAngle;
        }
    }

    drawArea(sAngle:number, cAngle:number, r:number, col:string) {
        this.ctx.beginPath();
        this.ctx.fillStyle = col || "#434553";
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(this.config.COORDINATE_X, this.config.COORDINATE_Y );
        this.ctx.arc(this.config.COORDINATE_X, this.config.COORDINATE_Y, r, sAngle, sAngle + cAngle, false);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawArc(r:number = this.config.R_DEF) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#d3d3d3';
        this.ctx.arc(this.config.COORDINATE_X, this.config.COORDINATE_Y, r, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    drawFillText(r:number, text:any) {
        this.ctx.beginPath();
        this.ctx.font = "10px";
        this.ctx.fillStyle = '#ffffff';
        let _textWidth = this.ctx.measureText(text).width + 4;
        this.ctx.fillRect(this.config.COORDINATE_X  - _textWidth / 2, this.config.COORDINATE_Y - r - 6, _textWidth , 10);
        this.ctx.fill();
        this.ctx.fillStyle = '#666666';
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, this.config.COORDINATE_X, this.config.COORDINATE_Y - r);
        this.ctx.fill();
    }

    render() {
        return  <><CanvasComponent/></>
    }
}
export default PolarAreaComponent;