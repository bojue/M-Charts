import * as React from 'react';
import { init } from '../../provider/canvas';
import { sunburstData } from './../../mock';
import "./sunburst.scss";

class SunburstComponent extends React.Component {
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


    initDraw() {
        this.ctx.translate(this.config.COORDINATE_X,this.config.COORDINATE_Y);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(0,0, 0, 0.03)';
        this.ctx.arc(0, 0, 100,0, Math.PI* 2)

        this.ctx.fill();
        this.ctx.stroke();
    }
   
    render() {
        return  <div className="charts">
                <canvas id="canvas" width="600" height="500"></canvas>
            </div>
    }
}
export default SunburstComponent;