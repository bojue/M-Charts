
import * as React from 'react';
import { Props } from 'react';

import "./pie.scss";

class PieComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    colsArr:string[];
    argleArr:number[];
    argleCurrentArr:number[];
    activeIndex:number;
    option = {}

    constructor(props:any) {
        super(props);
    }

    initData() {
        this.colsArr =  [
            '#4988FE',
            '#22D3AA',
            '#00b33c',
            '#99cc00',
            '#4944FE'
        ]
        this.argleArr =  [
            Math.PI /4,
            Math.PI /4 * 3,
            Math.PI /6,
            Math.PI /2,
            Math.PI /3
        ];
        this.option = {
            title: {
                text: "广告收益百分比",
                textAlign: "center"
            },
            series: [
                {
                    name:"广告收益百分比",
                    data:[{
                        name:"百度",
                        value:800,
                    },{
                        name:"谷歌",
                        value:2000,
                    },{
                        name:"FaceBook",
                        value:1600,
                    },{
                        name:"Alibaba",
                        value:1900,
                    },{
                        name:"Tencet",
                        value:1200
                    }]
                }
            ]
        }
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
        this.addLister();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    drawInit() {
    this.argleCurrentArr = [];
    let len = this.argleArr.length;
    let currArgle = 0;
    for(let i=0;i<len;i++) {
        let color = this.colsArr[i];
        let midArgs = this.argleArr[i] / 2+ currArgle;
        let endArgs:number = this.argleArr[i] + currArgle;
           
        let _sy = Math.sin(midArgs) * 200;
        let _sx = Math.cos(midArgs) * 200;
        let _ey = Math.sin(midArgs) * 220;
        let _ex = Math.cos(midArgs) * 220;
    
        this.ctx.beginPath();
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(_sx + 300, _sy + 300);
        this.ctx.lineTo(_ex + 300, _ey + 300);
        let str = "当前下标 " + i;
        this.ctx.fillStyle= color;
        this.ctx.font = "100 20px";
        if(midArgs > Math.PI * 3 /2 || midArgs < Math.PI /2) {
            this.ctx.textAlign = 'left';
        }else {
            this.ctx.textAlign = 'right';
        }
        if(_sx >= 0) {
            this.ctx.lineTo(_ex + 315, _ey + 300);
            this.ctx.fillText(str, _ex + 320 , _ey + 300);
        }else {
            this.ctx.lineTo(_ex + 285, _ey + 300);
            this.ctx.fillText(str, _ex + 280, _ey + 300);
        }
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(300, 300);
        this.ctx.arc(300, 300, 200, currArgle, endArgs, false);
        this.ctx.fill();
        currArgle = endArgs;
        this.argleCurrentArr[i] = endArgs;
    }
    }

    addLister() {
        window.addEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    getFun() {
        if(!event) return;
        event.preventDefault();
        this.throttle(this.updateCont(event), 16)
    }
 
    throttle(fn:any, time:number) {
        let _lastTime:number = 0;
        return function () {
        let _nowTime = + new Date()
        if (_nowTime - _lastTime > time || !_lastTime) {
            fn();
            _lastTime = _nowTime
        }
        }
    };

    updateCont(event:MouseEvent|any) {
        let x = event.clientX - this.clientRect.x;
        let y = event.clientY - this.clientRect.y;
        let res = (Math.pow(x-300, 2) + Math.pow(y-300, 2)) < Math.pow(200, 2);
        if(res) {
            if( this.canvas.style.cursor !== 'pointer') {
                this.canvas.style.cursor = 'pointer'
            }
            let angle = Math.atan2(y - 300, x - 300);
            angle = angle >= 0 ? angle : angle + Math.PI * 2;
            let currIndex = this.getCurrentItemIndex(angle);
            // 优化方案:TODO
            // if(activeIndex !== currIndex || !activeIndex) {
            //     activeIndex = currIndex;
            //     updateDraw(activeIndex);
            //     drawText(event);
            // }
            this.activeIndex = currIndex;
            this.updateDraw(this.activeIndex);
            this.drawText(event);
        }else {
            if( this.canvas.style.cursor === 'pointer') {
                this.canvas.style.cursor = 'default';
            }
            if(this.activeIndex >= 0) {
                this.updateDraw(this.activeIndex);
                this.activeIndex = -1;
            }
    
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawText(event:MouseEvent) {
        let x = event.clientX - this.clientRect.x;
        let y = event.clientY - this.clientRect.y;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.fillRect(x + 10, y + 10, 90, 30);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.colsArr[this.activeIndex];
        this.ctx.strokeRect(x + 9.5, y + 9.5, 90, 30);
        this.ctx.fillStyle = this.colsArr[this.activeIndex];
        this.ctx.font = "30px";
        this.ctx.fillText("区域下标  "+ this.activeIndex, x + 20, y + 28);

    }

    updateDraw(currIndex:number, state?:string) {
        this.clearCanvas();
        this.drawInit();
        this.ctx.beginPath();
        this.ctx.moveTo(300, 300);
        this.ctx.fillStyle = this.colsArr[currIndex];
        this.ctx.arc(300, 300, 210, this.argleCurrentArr[currIndex -1] || 0, this.argleCurrentArr[currIndex], false);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(300, 300);
        this.ctx.strokeStyle = this.colsArr[currIndex];;
        this.ctx.arc(300, 300, 212, this.argleCurrentArr[currIndex -1] || 0, this.argleCurrentArr[currIndex], false);
        this.ctx.stroke();
    }

    getCurrentItemIndex(args:number) {
        let len = this.argleCurrentArr.length;
        for(let i=0;i<len-1;i++) {
            let curr = this.argleCurrentArr[i];
            if(curr >= args && args < this.argleCurrentArr[i+1]) {
                return i;
            }
        }
        return len-1;
    }



    render() {
        return  <div className="charts">
                <canvas id="canvas" onMouseMove={e => this.getFun()} width="650" height="600"></canvas>
            </div>
    }
}
export default PieComponent;