
import * as React from 'react';
import CanvasComponent from '../../comps/canvas';
import "./ring.scss";

class RingComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    colsArr:any[];
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
            RADIUS: 180, // 圆饼半径
            INNTER_RADIUS: 60, // 内部圆的半径
            RADIUS_VAL: 20, // 小圆半径
            COORDINATE_X:250, // x坐标
            COORDINATE_Y:250, // y坐标
            NUMS:75,
            START_ANGLE:0 ,// 起始角度
        }
        this.data = [
            '#00A099',
            '#00A0C3',
            '#00A2EA',
            '#008AD2',
            '#0067B7',
            '#00479F',
            '#141B8C',

            '#611087',
            '#960185',
            '#C00082',
            '#E70080',
            '#E7006A',
            '#E90050',
            '#E90034',
            
            '#E6000a',
            '#EC6000',
            '#F29800',
            '#FDC900',
            '#FFEF00',
            
            '#D1DD00',
            '#8EC614',
            '#1DAE37',
            '#009A44',
            '#009A44'
        ]
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    componentWillUnmount() {

    }
    
    initDraw() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.config.COORDINATE_X,this.config.COORDINATE_Y);
        let len = this.data.length;
        let _angle = 2*Math.PI / len;

        for(let i=0;i<len;i++) {
            let cols = this.data[i];
            ctx.beginPath();
            ctx.fillStyle = cols;
            ctx.strokeStyle = cols;
            let angle = _angle * i;
            let _x =  (this.config.RADIUS )* Math.cos(angle);
            let _y = (this.config.RADIUS )* Math.sin(angle);
            ctx.arc(_x, _y,this.config.RADIUS_VAL,0,2*Math.PI);
            ctx.stroke();
            ctx.fill();
        }

        // 绘制指针
        for(let i=0;i<4;i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.data[i * 6];
            ctx.moveTo(this.config.INNTER_RADIUS + this.config.RADIUS_VAL * 0.2 ,0);
            ctx.lineTo(this.config.RADIUS - this.config.RADIUS_VAL * 1.2, 0);
            ctx.rotate(2 / 4 * Math.PI);
            ctx.stroke();    
        }

        // 绘制文字
        ctx.beginPath();
        ctx.fillStyle = '#979797';
        ctx.strokeStyle = '#979797';
        ctx.arc(0,0,this.config.INNTER_RADIUS,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        this.ctx.fillStyle = 'white';
        this.ctx.font = "36px serif";
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('24色', 0,0 );
    }
   
    render() {
        return <><CanvasComponent/></>
    }
}
export default RingComponent;