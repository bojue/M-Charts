
import * as React from 'react';
import { init, getEventCoordinates } from '../../provider/canvas';
import "./parallel.scss";

class ParallelComponent extends React.Component {
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
        this.drawInit();
    }

    initData() {
        this.colsArr =  [
            '#4988FE',
            '#22D3AA',
            '#00b33c',
            '#99cc00',
            '#4944FE'
        ]
        this.config = {
            startX: 30.5,
            startY: 470.5,
            count_h:5,
            count_w:8,
            lines: [
                {
                    reverse: true,
                    min:0,
                    max:30,
                    datas: [
                        30, 25, 20, 25, 20, 15, 10, 5, 0
                    ]
                },{
                    reverse: false,
                    min:0,
                    max:300,
                    datas: [
                        0, 50, 100, 150, 200, 250, 300
                    ]
                },{
                    reverse: false,
                    min:0,
                    max:250,
                    datas: [
                        0, 50, 100, 150, 200, 250
                    ]
                },{
                    reverse: false,
                    min:0,
                    max:300,
                    datas: [
                        0, 50, 100, 150, 200, 250, 300
                    ]
                },{
                    reverse: false,
                    min:0,
                    max:5,
                    datas: [
                        0, 1, 2, 3, 4, 5
                    ]
                },{
                    reverse: false,
                    min:0,
                    max:140,
                    datas: [
                        0, 20, 40, 50, 80, 100, 120, 140
                    ]
                },{
                    reverse: false,
                    min:0,
                    max:80,
                    datas: [
                        0, 20, 40, 50, 80
                    ]
                },{
                    reverse: false,
                    min:0,
                    max:100,
                    type: 'txt',
                    baseLine:'middle',
                    datas: [
                        "优",
                        "良",
                        "轻度污染",
                        "中度污染",
                        "重度污染",
                        "严重污染"
                    ]
                },
            ]
        }
        this.data = [
            [1,55,9,56,0.46,18,6,"良"],
            [22,25,11,21,0.65,34,9,"优"],
            [24,56,7,63,0.3,14,5,"良"],
            [4,33,7,29,0.33,16,6,"优"],
            [10,185,127,216,2.52,61,27,"中度污染"],
        ]

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

    drawInit() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.2)';
        this.ctx.fillStyle = '#4988FE';
        let sX = this.config.startX;
        let sY = this.config.startY;
        let h = 420;
        let width = 70;
        let eY = this.config.startY - h ;
        let len = this.config.count_w;

        for(let i=0;i<len;i++) {
            let x = sX + width * i;
            this.ctx.moveTo(x , sY);
            this.ctx.lineTo(x , eY);
            this.drwaLinesLab(this.config.lines[i], x , sY );
        }
        this.ctx.stroke();
        this.drawLine();
    }

    drawLine() {

        let len = this.data.length;
        this.ctx.beginPath();
        let sX = this.config.startX;
        let sY = this.config.startY;
        let h = 420;
        let width = 70;

        for(let i=0;i<len;i++) {
            let line = this.data[i];
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.colsArr[i] || '#4988FE';
            let config = this.config.lines[i];
            let vals = config.max - config.min;
            let subLen = line.length;

            for(let j = 0;j< subLen;j++) {
                let config = this.config.lines[j];
                let vals = config.max - config.min;
                let x = sX + width * j;
                let _len =  line[j] / vals * h ;
                let y = config.type === 'txt' ? 
                this.getPointYByString(line[j], config.datas) : config.reverse ? sY - 420 +  _len : sY - _len || sY;
                if(j === 0) {
                    this.ctx.moveTo(x ,y );
                }else {
                    this.ctx.lineTo(x, y );
                }
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.fillStyle = this.colsArr[i] || '#4988FE';
                this.ctx.arc(x, y ,4,0,2 * Math.PI);
                this.ctx.fill();
                this.ctx.stroke();
            }
           
        }

    }

    getPointYByString(txt:string, datas:any[]) {
        let index = datas.indexOf(txt);
        let h = this.config.startY;
        if(index > -1) {
            let height = 420 / datas.length;
            h = h - (index * height + height /2) ;
        }

        return h;
    }

    drwaLinesLab(config:any, x:number, sY:number) {
        let obj = config || {
            reverse: true,
            min:0,
            max:30,
            datas: [
                30, 25, 20, 25, 20, 15, 10, 5
            ]
        }

        let len = obj.datas.length || 1;
        let baseLine = obj.baseLine;
        let height = len > 1 && baseLine !== 'middle' ? 420 / (len-1) : 420 / len;
        let datas = obj.datas;

        for(let i=0; i < len;i++){
            let y = i * height + 0.5;
            this.ctx.moveTo(x , sY - y );
            this.ctx.lineTo(x + 5 , sY  - y );
            this.ctx.font = "12px serif";    
            this.ctx.textBaseline = 'middle';
    
            if(baseLine === 'middle') {
                this.ctx.fillText(datas[i], x + 10, sY-y - height /2 );
            } else {
                this.ctx.fillText(datas[i], x + 10, sY-y );
            }
        }

        if(baseLine === 'middle') {
            this.ctx.moveTo(x , sY - 420);
            this.ctx.lineTo(x + 5 , sY  - 420);
        }
    }

    render() {
        return  <div className="charts">
                <canvas id="canvas" width="600" height="500"></canvas>
            </div>
    }
}
export default ParallelComponent;