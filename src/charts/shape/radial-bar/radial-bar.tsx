
import * as React from 'react';
import CanvasComponent from '../../comps/canvas';
import "./radial-bar.scss";
import { CONFIG } from './../../config/color_def';
import { radialBarData } from './../../mock/index';

class RadialBarComponent extends React.Component {
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
        this.initDraw();
    }

    initData() {
        this.cols = CONFIG.DEF_COLS;
        this.config = {
            RADIUS: 180, // 圆饼半径
            RADIUS_INNER: 60, // 内部圆形
            COORDINATE_X:300, // x坐标
            COORDINATE_Y:250, // y坐标
            START_ANGLE: -Math.PI / 2 ,// 起始角度
        }
        this.data = radialBarData;
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
        let _count = this.getCount();
        let _sAngle = this.config.START_ANGLE;
        let len = this.data.length;
        let ctx = this.ctx;
        this.ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        let _WIDTH = this.config.RADIUS - this.config.RADIUS_INNER;
        let _w = _WIDTH / (len -1)/ 2;
        for(let i=0;i<len;i++) {
            let item = this.data[i];
            let _currAngle = item.value / item.count * Math.PI * 2;
            let _eAngle = _sAngle + _currAngle;
            ctx.fillStyle = this.cols[i];
            ctx.beginPath();
            ctx.moveTo(this.config.COORDINATE_X, this.config.COORDINATE_Y );
            let _r = this.config.RADIUS - _w * i * 2;
            ctx.arc(this.config.COORDINATE_X, this.config.COORDINATE_Y ,_r, _sAngle,  _eAngle);
            ctx.stroke();
            ctx.fill();
            this.drawFixedPoint(_eAngle, _r, _w /2)
            this.clearArea(this.config.RADIUS - _w * (i * 2 + 1) );
        }
    }

    drawFixedPoint(endAngle:number, r:number, subr:number) {
        let x = this.config.COORDINATE_X;
        let y = this.config.COORDINATE_Y - r + subr ;
        this.ctx.beginPath();
        this.ctx.arc(x, y, subr, 0,  Math.PI * 2);
        x = this.config.COORDINATE_X  + Math.cos(endAngle) * (r - subr);
        y = this.config.COORDINATE_Y  + Math.sin(endAngle) * (r - subr);
        this.ctx.arc(x, y, subr, 0,  Math.PI * 2);
        this.ctx.fill();
    }

    clearArea(radius:number) {
        let ctx = this.ctx;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(this.config.COORDINATE_X, this.config.COORDINATE_Y );
        ctx.arc(this.config.COORDINATE_X, this.config.COORDINATE_Y ,radius || this.config.RADIUS_INNER,0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }

    getCount() {
        let list = this.data;
        let count = 0;
        let len = list.length;
        for(let i=0;i<list.length;i++) {
            count += list[i].val;
        }
        return count;
    }
   
    render() {
        return <><CanvasComponent/></>
    }
}
export default RadialBarComponent;