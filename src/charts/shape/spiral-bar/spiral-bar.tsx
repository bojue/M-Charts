
import * as React from 'react';
import CanvasComponent from '../../comps/canvas/canvas';;
import { sprialBarData } from './../../mock/mock-model';
import { CONFIG } from './../../config/color_def';
import "./spiral-bar.scss";
import { max } from 'lodash';

class SprialBarComponent extends React.Component {
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
        this.draw();
    }

    initData() {
        this.config = {
            COORDINATE_X:300, // x坐标
            COORDINATE_Y:250, // y坐标
            RADIUS: 150, // 半径
            ANGLE_START:0 ,// 起始角度
            COUNT: 5,
            PENDING: 30,
            ANGLE_PER: Math.PI,
            MAX_VALUE: 120
        }
        this.getData();
    }

    getData() {
        this.data = sprialBarData;
        let len = this.data.length;
        let maxVal:number = 0;
        for(let i=0;i<len;i++) {
            let item = this.data[i];
            maxVal = item.value > maxVal ? item.value : maxVal;
        }

        let perVal = this.config.COUNT * Math.PI / maxVal;
        for(let i=0;i<len;i++) {
            let item = this.data[i];
            item.angle = perVal * item.value;
        }
        console.log(this.data)
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
      let len = this.config.COUNT;
      let _pending = this.config.PENDING;
      let perAngle = Math.PI;
      let sAngle = -perAngle
      let eAngle = perAngle + sAngle;
      let x = this.config.COORDINATE_X;
      let y = this.config.COORDINATE_Y;
      for(let i=0; i< len ;i++) {
        let r = this.config.RADIUS - _pending  * i;
        sAngle += perAngle ;
        eAngle += perAngle ;
        let _number = i % 2; // 第几圆
        if(_number === 0) {
            x = this.config.COORDINATE_X + _pending * _number;
        }else if(_number === 1) {
            x = this.config.COORDINATE_X + _pending * _number;
        }
        this.drawLinks(x, y, r, sAngle, eAngle, i);
      }
    }

    drawLinks(x:number, y:number, r:number, sAngle:number, eAngle:number, index:number) {
        let len = this.data.length;
        for(let i=0;i<len;i++) {
            let item = this.data[i];
            let _currStart = index * Math.PI;
            let _currEnd = _currStart +this.config.ANGLE_PER;
            if(!i) {
                this.ctx.lineWidth = 1;
                this.ctx.strokeStyle = "#555"
                this.ctx.beginPath();
                this.ctx.setLineDash([1,5]);
                this.ctx.arc(x, y, r + len * 7 + 5, sAngle, eAngle);
                this.drawText(index ,x, y, r + len * 7 + 5);
                this.ctx.stroke();
            }else if(item.angle >= _currStart) {
                this.ctx.lineWidth = 4;
                if(item.angle >= _currEnd) {
                    eAngle = _currEnd;
                }
                this.ctx.strokeStyle = CONFIG.APP_COLS[i];
                this.ctx.setLineDash([]);
                this.ctx.beginPath();
                this.ctx.arc(x, y, r + i * 7, sAngle, eAngle);
                this.ctx.stroke();
            }
        }
    }

    drawText(i:number, x:number, y:number, w:number) {
        let pVal = this.config.MAX_VALUE / (this.config.COUNT * 1);
        x = i % 2 === 0 ? x -w : x + w;
        this.ctx.fillText(i * pVal , x, y);
        if(this.config.COUNT === i +1) {
            this.ctx.fillText((i + 1) * pVal , x + 2 * w, y);
        }
    }

    render() {
        return  <><CanvasComponent/></>
    }
}
export default SprialBarComponent;