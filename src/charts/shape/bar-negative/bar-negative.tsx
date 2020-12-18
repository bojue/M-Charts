import * as React from 'react';
import { init } from '../../provider/canvas';
import "./bar-negative.scss";

class BarNagativeComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    datas:any[];
    colors = [];

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
            startY:40.5,
            titleHeight: 40,
            H: 400, // 高度
            W:490, // 宽度
        }
        this.datas = [
            '一',
            '二',
            '三',
            '四',
            '五',
            '六',
            '日'
        ];
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
        this.drawTitle(); // 绘制标题
        this.drawData(); // 绘制数据
    }

    drawData() {    
        let monthInfo = this.getCurrentMouthDays();
        let bigin = monthInfo.start;
        let len = monthInfo.days;
        let _w = this.config.W / this.datas.length;
        let _h = this.config.H / 5;
        let startY = this.config.startY + this.config.titleHeight;
        let startX = this.config.startX;
        this.ctx.font = "12px serif";    
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = "left";
        for(let i=0;i<len;i++) {
            let day = bigin -1 + i;
            let xIndex = day % 7;
            let yIndex = (day - day % 7)/ 7;
            let fir_time =  Math.round(Math.random() * 24);
            let fir_end_angle= fir_time / 24 * 2 * Math.PI;
            this.ctx.beginPath();
            this.ctx.fillStyle = '#00b33c';
            this.ctx.moveTo(startX + (xIndex + 0.5)* _w, startY + (yIndex + 0.5 + 0.1) * _h );
            this.ctx.arc(startX + (xIndex + 0.5)* _w, startY + (yIndex + 0.5 + 0.1) * _h ,_w / 3, 0, fir_end_angle);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.fillStyle = '#4944FE';
            this.ctx.moveTo(startX + (xIndex + 0.5)* _w, startY + (yIndex + 0.5 + 0.1) * _h );
            this.ctx.arc(startX + (xIndex + 0.5)* _w, startY + (yIndex + 0.5 + 0.1) * _h ,_w / 3,  fir_end_angle, 2* Math.PI);
            this.ctx.fill();

            this.ctx.strokeStyle = '#99cc00';
            this.ctx.rect(startX + xIndex * _w, startY + yIndex * _h,  _w, _h);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.fillStyle = '#555555';
            let txt =  i + 1 > 9 ? i + 1 : '0'+(i + 1);
            this.ctx.fillText( txt, startX + (xIndex + 0.1) * _w, startY + (yIndex + 0.1) * _h);
            this.ctx.stroke();
        }

        this.drawBorder(startX, startY, _w, _h); // 绘制边框,实际开发可以绘制在Data里面，减少计算过程
        this.ctx.stroke();
    }

    drawBorder(sX:number, sY:number, w:number, h:number) {
        let monthInfo = this.getCurrentMouthDays();
        let bigin = monthInfo.start;
        let days = monthInfo.days;
        let yIndex = (days + bigin-1) % 7; // 计算最后一天左侧整列
        let endIndex = monthInfo.end;

        this.ctx.strokeStyle = '#4944FE';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(sX + (bigin -1) * w, sY); // 绘制起点
        this.ctx.lineTo(sX + 7 * w, sY); // 绘制左上角
        this.ctx.lineTo(sX + 7 * w, sY + yIndex * h); // 绘制左上角到占据满列的左侧
        if(endIndex !== 7) {
            this.ctx.lineTo(sX + (endIndex) * w, sY + yIndex  * h); // 绘制左上角到占据满列的左侧
            this.ctx.lineTo(sX + (endIndex) * w, sY + (yIndex + 1) * h ); // 绘制左上角到占据满列的左侧
            this.ctx.lineTo(sX , sY + (yIndex +1 ) * h ); 
        }

        if(bigin !== 1) {
            this.ctx.lineTo(sX ,  sY + h); // 绘制左上角到占据满列的左侧  
            this.ctx.lineTo(sX + (bigin -1) * w, sY + h)
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }

    getCurrentMouthDays() {
        let data = new Date('2020-12-01T03:24:00');
        let currMonthDays = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate(); // 当月天数
        let currMonthStartDay = new Date(data.getFullYear(), data.getMonth() , 1).getDay(); // 当月开始星期
        let currMonthEndDay =  new Date(data.getFullYear(), data.getMonth() , currMonthDays).getDay(); // 当月结束星期
        return {
            start: currMonthStartDay,
            end: currMonthEndDay,
            days: currMonthDays
        }
    }
    
    drawTitle() {
        let len = this.datas.length;
        let _w = this.config.W / len;
        this.ctx.fillStyle = '#555555';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = "center";
        this.ctx.beginPath();
        this.ctx.font = "12px serif";    
        let tit = '2020年12月';
        this.ctx.fillText(tit, this.config.startX + (_w * 3.5) , this.config.startY - 30);
        this.ctx.font = "16px serif";    
        for(let i = 0;i<len;i++) {
            let _txt = '星期' + this.datas[i];
            this.ctx.fillText(_txt, this.config.startX + (i+0.5) * _w , this.config.startY);
        }
        this.ctx.stroke();
    }



    render() {
        return  <div className="charts">
                <canvas id="canvas" width="600" height="500"></canvas>
            </div>
    }
}
export default BarNagativeComponent;