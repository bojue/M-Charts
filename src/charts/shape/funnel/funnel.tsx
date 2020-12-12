
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import "./funnel.scss";

class FunnelComponent extends React.Component {
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
        this.initDraw();
    }

    initData() {
        this.data = [
            {value: 20, name: 'VIP'},
            {value: 40, name: '大客户'},
            {value: 60, name: '中客户'},
            {value: 80, name: '小客户'},
            {value: 100, name: '疑似客户'}
        ]
        this.colsArr =  [
            '#4988FE',
            '#22D3AA',
            '#00b33c',
            '#99cc00',
            '#4944FE'
        ]
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
        this.ctx.lineWidth = 1;
        let startX = 300;
        let startY = 20;
        let _H = 90;
        let tanRatio =  Math.tan(Math.PI / 6);
        let len = this.data.length;
        for(let i=0;i<len;i++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.colsArr[i];
            if(i === 0) {
                this.ctx.moveTo(startX, startY);
                this.ctx.lineTo(startX + tanRatio * _H, startY + _H);
                this.ctx.lineTo(startX - tanRatio * _H, startY + _H);
            }else {
                this.ctx.moveTo(startX  + tanRatio * _H * i, startY + _H * i);
                this.ctx.lineTo(startX + tanRatio * _H * (i + 1), startY + _H  * (i + 1));
                this.ctx.lineTo(startX - tanRatio * _H * (i + 1), startY + _H  * (i + 1));
                this.ctx.lineTo(startX - tanRatio * _H * i, startY + _H  * i);
            }
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.fillStyle = 'white';
            this.ctx.font = "18px serif";
            this.ctx.textBaseline = 'middle';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.data[i].name, startX, startY + _H  *  i + _H / 2 );
         

        }

    }
   

    render() {
        return <><CanvasComponent/></>
    }
}
export default FunnelComponent;