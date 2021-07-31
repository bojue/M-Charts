
import {  maxBy, sumBy } from 'lodash';
import * as React from 'react';
import { roseRangedData } from '../../mock/mock-model';
import CanvasComponent from './../../comps/canvas';

import { CONFIG } from './../../config/color_def';

import "./rose-range.scss";

interface dataType {
    type: string 
    value: number
}
class RoseRangeComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:dataType[];
    dataLines:any[];
    text_fillStyle  = 'rgba(0,0,0,0.8)'
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData()
        this.initCanvas()
        this.initDraw()
    }

    initData() {
        this.config = {
            W: 500, //长度
            H: 450, //高度
            SOURCE_H:100, // source的高度
            COORDINATE_X: 450, // 起点X
            COORDINATE_Y: 400, // 起点Y
            PER_W: 60, // 分段间距   
            PER_NUMBER: 5 // 间距
        }
        this.data = roseRangedData as dataType[]
    }

    componentWillUnmount() {
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = "middle";
        this.ctx.font = '12px Arial';
    }

    initDraw() {
        this.drawCoorainate() // 绘制坐标
        this.drawData() // 绘制数据
    }

    drawData() {
        const {
            COORDINATE_X,
            COORDINATE_Y,
            PER_NUMBER,
            PER_W
        } = this.config
        const PI = Math.PI
        const maxData = maxBy(this.data,'value')?.value || 0
        const segment_number = Math.ceil(maxData / PER_NUMBER) // 分段数
        const MAX_R = PER_W * segment_number
        const sumData= sumBy(this.data, 'value')
        const PER_ANGLE = PI / 2 / sumData  // 单位data对应的角度

        const len = this.data.length
        let curr_angeles = PI
        // 绘制分割线和文本
        for(let i=0;i<len;i++) {
            const {
                value:val,
                type
            } = this.data[i]

            const angle = val * PER_ANGLE
            const currR = val / PER_NUMBER * PER_W 
            const currFillStyle =  CONFIG.APP_COLS[i]
            this.ctx.beginPath(); 

            // 计算起点和终点坐标
            const _mx = Math.cos(curr_angeles + angle / 2) * MAX_R
            const _my = Math.sin(curr_angeles + angle /2) * MAX_R
            const _mx_lab = Math.cos(curr_angeles + angle / 2) * (MAX_R + 5)
            const _my_lab = Math.sin(curr_angeles + angle /2) * (MAX_R + 5)
            const _mx_lab_append = Math.cos(curr_angeles + angle / 2) * (MAX_R + 15)
            const _my_lab_append = Math.sin(curr_angeles + angle /2) * (MAX_R + 15)
            const _ex = Math.cos(curr_angeles + angle ) * currR
            const _ey = Math.sin(curr_angeles + angle) * currR

            // 绘制分割线
            this.ctx.beginPath();
            this.ctx.setLineDash([5, 5])
            this.ctx.strokeStyle =  'rgba(0,0, 0, 0.1)'
            this.ctx.moveTo( this.config.COORDINATE_X,  this.config.COORDINATE_Y)
            this.ctx.lineTo( this.config.COORDINATE_X + _mx, this.config.COORDINATE_Y + _my)
            this.ctx.stroke();

            // 绘制圆坐标
            this.ctx.beginPath();
            this.ctx.strokeStyle =  'rgba(0,0, 0, 0.2)'
            this.ctx.setLineDash([])
            this.ctx.moveTo( this.config.COORDINATE_X + _mx, this.config.COORDINATE_Y + _my)
            this.ctx.lineTo( this.config.COORDINATE_X + _mx_lab, this.config.COORDINATE_Y + _my_lab)
            this.ctx.stroke();

            // 绘制label
            this.ctx.textAlign = 'right';
            this.ctx.fillStyle = this.text_fillStyle  
            this.ctx.fillText(type, this.config.COORDINATE_X +  _mx_lab_append , this.config.COORDINATE_Y +  _my_lab_append )
            this.ctx.fill()

            // 绘制data
            this.ctx.beginPath();
            this.ctx.setLineDash([])
            this.ctx.moveTo( this.config.COORDINATE_X,  this.config.COORDINATE_Y)
            this.ctx.fillStyle = CONFIG.APP_COLS[i]
   
            this.ctx.strokeStyle = currFillStyle 
            this.ctx.arc(COORDINATE_X, COORDINATE_Y, currR, curr_angeles , curr_angeles + angle)
            this.ctx.lineTo( this.config.COORDINATE_X + _ex, this.config.COORDINATE_Y + _ey)

            this.ctx.stroke()
            this.ctx.fill()
            curr_angeles += angle
        }
    }

    drawCoorainate() {
        const {
            COORDINATE_X,
            COORDINATE_Y,
            PER_W,
            PER_NUMBER
        } = this.config
        const PI = Math.PI 
        const maxData = maxBy(this.data,'value')?.value || 0
        const segment_number = Math.ceil(maxData / PER_NUMBER) // 分段数
        const MAX_R = PER_W * segment_number

        // 绘制圆轮廓
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.1)';
        
        for(let i=1;i <= segment_number ; i++) {
            const r = i * PER_W
            const maxBool =  i === segment_number 
            this.ctx.strokeStyle =  maxBool  ? 'rgba(0,0, 0, 0.2)' : 'rgba(0,0, 0, 0.1)'
            this.ctx.setLineDash(maxBool ? [] :[5, 5])
            this.ctx.beginPath();
            this.ctx.arc(COORDINATE_X, COORDINATE_Y, r, 1 * PI,1.5*Math.PI); 
            this.ctx.stroke();
        }

        // 绘制Y轴
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.2)'
        this.ctx.setLineDash([5,5])
        this.ctx.beginPath();
        this.ctx.moveTo(COORDINATE_X, COORDINATE_Y - MAX_R);
        this.ctx.lineTo(COORDINATE_X , COORDINATE_Y);

        // 绘制X轴
        this.ctx.lineTo(COORDINATE_X - MAX_R, COORDINATE_Y);
        this.ctx.stroke();

        // 绘制X轴坐标
        for(let i=0;i<=segment_number;i++) {
            this.ctx.beginPath();
            let curr = i * PER_W
            this.ctx.moveTo(COORDINATE_X - curr, COORDINATE_Y );
            this.ctx.lineTo(COORDINATE_X - curr , COORDINATE_Y + 5);
            this.ctx.stroke();
            this.ctx.fillStyle = this.text_fillStyle  
            this.ctx.fillText(i * PER_NUMBER ,COORDINATE_X - curr, COORDINATE_Y + 15)
            this.ctx.fill()
        }

    }


    render() {
        return  <><CanvasComponent/></>
    }
}
export default RoseRangeComponent;