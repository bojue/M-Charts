
import * as React from 'react';
import CanvasComponent from '../../comps/canvas';
import "./ring.scss";
import { CONFIG } from './../../config/color_def';
import { ringData } from './../../mock/index';

class RingComponent extends React.Component {
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
            RADIUS_INNER: 130, // 内部圆形
            COORDINATE_X:300, // x坐标
            COORDINATE_Y:250, // y坐标
            START_ANGLE:0 ,// 起始角度
        }
        this.data = ringData;
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

        for(let i=0;i<len;i++) {
            let item = this.data[i];
            let _currAngle = item.val / _count * Math.PI * 2;
            let _eAngle = _sAngle + _currAngle;
            ctx.fillStyle = this.cols[i];
            ctx.beginPath();
            ctx.moveTo(this.config.COORDINATE_X, this.config.COORDINATE_Y );
            ctx.arc(this.config.COORDINATE_X, this.config.COORDINATE_Y ,this.config.RADIUS,_sAngle,  _eAngle);
            _sAngle = _eAngle;
            ctx.stroke();
            ctx.fill();
        }

        this.clearArea();
    }

    clearArea() {
        let ctx = this.ctx;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(this.config.COORDINATE_X, this.config.COORDINATE_Y );
        ctx.arc(this.config.COORDINATE_X, this.config.COORDINATE_Y ,this.config.RADIUS_INNER,0, Math.PI * 2);
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
export default RingComponent;