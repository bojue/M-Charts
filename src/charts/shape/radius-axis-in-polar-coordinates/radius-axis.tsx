
import * as React from 'react';
import CanvasComponent from '../../comps/canvas/canvas';
import { CONFIG } from './../../config/color_def';
import { radiusAxisData } from './../../mock/mock-model';

interface CountType {
    _count: number
    _max: number
}

class RadiusAxisComponent extends React.Component {
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
        this.cols = CONFIG.APP_COLS
        this.config = {
            RADIUS: 200, // 最大半径
            RADIUS_INNER: 60, // 内部圆形
            COORDINATE_X:300, // x坐标
            COORDINATE_Y:250, // y坐标
            START_ANGLE:0 ,// 起始角度
            EXTENSION_ANGELE: Math.PI / 50
        }
        this.data = radiusAxisData;
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
        const { _count , _max } = this.getCount()
        const {
            START_ANGLE,
            RADIUS,
            RADIUS_INNER,
            EXTENSION_ANGELE
        } = this.config
        const pre_r =  (RADIUS - RADIUS_INNER) / _max
        let  _sAngle = START_ANGLE
        let len = this.data.length;
        let ctx = this.ctx;
        this.ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';

        for(let i=0;i<len;i++) {
            let item = this.data[i];
            const _currAngle = item.val / _count * Math.PI * 2;
            let _eAngle = _sAngle + _currAngle;
            ctx.fillStyle = this.cols[i];
            ctx.beginPath();
            ctx.moveTo(this.config.COORDINATE_X, this.config.COORDINATE_Y );
            const curr_r = RADIUS_INNER + item.val * pre_r 
            ctx.arc(this.config.COORDINATE_X, this.config.COORDINATE_Y ,curr_r , _sAngle - EXTENSION_ANGELE,  _eAngle +  EXTENSION_ANGELE);
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

    getCount():CountType {
        const list = this.data;
        if(!list.length) return { _max:0, _count: 0}
        let count = 0;
        let maxCount:number = list[0].val;
        list.forEach(item => {
            const curr = item?.val
            count+= curr
            maxCount = Math.max(maxCount, curr)
        })
        return {
            _count: count,
            _max: maxCount
        };
    }
   
    render() {
        return <><CanvasComponent/></>
    }
}
export default RadiusAxisComponent;