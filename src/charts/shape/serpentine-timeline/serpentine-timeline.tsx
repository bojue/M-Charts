
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import { serpentineTimeLineData } from './../../mock/index';
import { CONFIG } from './../../config/color_def';
import "./serpentine-timeline.scss";

class SerpentineTimelineComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    times =  {
        start:0,
        end:0,
        days:0,
    }
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.draw();
    }

    initData() {
        this.config = {
            W:400,
            H:300,
            START_X:70, // x
            START_Y:50, // y
            R: 50, // 半径
            PER_DAY_WIDTH: 0 , // 每一天对应的长度
        }
        this.getData();
    }

    getData() {
        this.data = serpentineTimeLineData;
        let len = this.data.length;
        for(let i=0;i<len;i++) {
            let item = this.data[i];
            if(!this.times.start || this.times.start > item.start) {
                this.times.start = item.start;
            }
            if(!this.times.end || this.times.end < item.end) {
                this.times.end = item.end;
            }
        }

        let sDate = new Date(this.times.start);
        let sTime = sDate.getMonth();
        let eTime = new Date(this.times.end).getMonth();
        for(let i=sTime; i <= eTime;i++) {
            let day = new Date(sDate.getFullYear(), i+1, 0).getDate();
            this.times.days += day;
        }

        this.calculationConfig();
    }

    calculationConfig() {
        let line = this.config.W * 3;
        let corner = this.config.R * Math.PI * 3;
        this.config.PER_DAY_WIDTH = (line + corner)/ this.times.days;
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
        this.ctx.fillStyle = '#333';
        this.ctx.font = "12px serif";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign  = 'center';
    }


    draw() {
       console.log(this.data)
       console.log(this.config)
       this.drawContour();
    }

    // 绘制轮廓线
    drawContour() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#555"
        this.ctx.beginPath();
        this.ctx.setLineDash([1,5]);
        for(let i=0;i<4;i++) {
            let y = 2 * this.config.R * i + this.config.START_Y;
            this.ctx.moveTo(this.config.START_X,  y );
            this.ctx.lineTo(this.config.START_X + this.config.W, y);
            this.ctx.stroke();
        }
        for(let i = 0;i<2;i++) {
            this.ctx.beginPath();
            this.ctx.arc(this.config.START_X + this.config.W, this.config.START_Y + this.config.R + this.config.R * 4* i , this.config.R , -  Math.PI/2 , Math.PI / 2);
            this.ctx.stroke();
        }
        this.ctx.beginPath();
        this.ctx.arc(this.config.START_X, this.config.START_Y + this.config.R * 3 , this.config.R ,  Math.PI/2 , Math.PI / 2 * 3);
        this.ctx.stroke();
    }

    render() {
        return  <><CanvasComponent/></>
    }
}
export default SerpentineTimelineComponent;