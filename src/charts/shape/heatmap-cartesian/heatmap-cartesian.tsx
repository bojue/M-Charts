
import * as React from 'react';
import CanvasComponent from '../../comps/canvas/canvas';;
import { heatmapCartesianData } from './../../mock/mock-model';
import { getColByIndex } from './../../provider/getColorByRandom';
import "./heatmap-cartesian.scss";

class HeatmapCartesianComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    hours:any[];
    days:any[];
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
    }

    initData() {
        this.config = {
            startX:50.5,
            startY:470.5,
            H: 420, // 高度
            W:500, // 宽度
            count: 7, // Height分段数
            labPadding:12 // 文字间距
        }
        this.data = heatmapCartesianData;
        this.hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a','10a','11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
        this.days = ['Sat', 'Fri', 'Thu','Wed', 'Tue', 'Mon', 'Sun'];
    }

    componentWillUnmount() {

    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }


    drawInit() {
        let hoyrsLen = this.hours.length;
        let h = Number((this.config.H / this.config.count).toFixed(2));
        let w = Number((this.config.W / hoyrsLen).toFixed(2));
        let x = this.config.startX;
        let y = this.config.startY;
        this.ctx.font = "12px serif";    
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = 'middle';
        this.drawXAxis(x, y, h);  //绘制纵坐标
        this.drawYAxis(x, y, h, w); // 绘制横坐标
        this.drawData(x, y, h, w);
        this.ctx.textBaseline = 'top';
    }

    drawXAxis(x:number, y:number, h:number) {
        for(let i=0;i<=this.config.count;i++) {
            this.ctx.beginPath();
            if(!i) {
                this.ctx.moveTo(x, y - i * h);
                this.ctx.lineTo(x, y - this.config.H -  this.config.labPadding);    
            }

            // 行Lab线
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.moveTo(x, y - i * h);
            this.ctx.lineTo(x - this.config.labPadding / 2,  y - i * h);

            // 文字
            if(i < this.days.length ) {
                this.ctx.fillStyle = '#4988FE';
                this.ctx.fillText(this.days[i] ,x - this.config.labPadding , y - i * h - h / 2)
            }
            this.ctx.stroke();
        }
    }

    drawYAxis(x:number, y:number, h:number, w:number) {
        this.ctx.textAlign = "center";
        for(let i=0;i<=this.hours.length;i++) {
            this.ctx.beginPath();
            if(!i) {
                this.ctx.fillStyle = 'rgba(0,0, 0, 0.03)';
                this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x + this.config.W,  y);
            }

            // 行Lab线
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.moveTo(x + w * i, y);
            this.ctx.lineTo(x + w * i,  y +  this.config.labPadding / 2);

            // 文字
            if(i < this.hours.length && i % 2 === 0) {
                this.ctx.fillStyle = '#4988FE';
                this.ctx.fillText(this.hours[i] ,x + w * i + w / 2,  y +  this.config.labPadding)
            }
            this.ctx.stroke();
        }
    }

    drawData(x:number, y:number, h:number, w:number){
        let len = this.data.length;

        let yLen = this.days.length;
        let xLen = this.hours.length;
        for(let i=0;i<len;i++) {
            let data = this.data[i];
            if(!data) return;
            let val = data[2];
            let xNumber = i % xLen;
            let yNumber = parseInt((i / xLen) +'')
            this.ctx.beginPath();
            this.ctx.fillStyle = this.getCols(val);
            this.ctx.fillRect(x + w * xNumber + 0.25,  y - h - h * yNumber + 0.25,  w -0.5, h- 0.5);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillText(val,x + w * xNumber + w /2, y - h /2 - h * yNumber)
            this.ctx.fill();
        }
    }

    getCols(value:number) {
        let cols = getColByIndex(parseInt(Math.min(value, 11) / 3 + ""));
        return cols || '#ffffff';
    }

    render() {
        return <> 
                <CanvasComponent/>
            </>
    }
}
export default HeatmapCartesianComponent;