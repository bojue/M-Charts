
import * as React from 'react';
import { Props } from 'react';

import "./line.scss";

class PieComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any;
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
        // this.addLister();
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    initData() {
        this.data = [{
            name:"星期一",
            conut:  329,
        },{
            name:"星期二",
            conut:  220,
        },{
            name:"星期三",
            conut:  220,
        },{
            name:"星期四",
            conut:  315,
        },{
            name:"星期五",
            conut:  389,
        },{
            name:"星期六",
            conut:  309,
        },{
            name:"星期日",
            conut:  129,
        }]
        this.config = {
            W: 500, //长度
            H: 400, //高度
            START_X: 50, // 起点X
            START_Y: 80, // 起点Y

        }
    }

    drawInit() {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        // X轴
        this.ctx.moveTo(this.config.START_X, this.config.H + this.config.START_Y + 0.5);
        this.ctx.lineTo(this.config.START_X + this.config.W + 0.5, this.config.H + this.config.START_Y + 0.5);

        // Y轴
        this.ctx.moveTo(this.config.START_X + 0.5, this.config.START_Y + 0.5);
        this.ctx.lineTo(this.config.START_X + 0.5, this.config.START_Y + this.config.H);
        this.ctx.stroke();        
        this.ctx.closePath();
    }



    moveEvent() {

    }
    render() {
        return  <div className="charts">
                <canvas id="canvas" onMouseMove={e => this.moveEvent()} width="600" height="500"></canvas>
            </div>
    }
}
export default PieComponent;