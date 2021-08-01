
import * as React from 'react';
import CanvasComponent from '../../comps/canvas/canvas';
import { getColByRandom } from './../../provider/getColorByRandom';
import { streamgraphData } from './../../mock/mock-model';
import { CONFIG }  from './../../config/color_def';
import "./streamgraph.scss";

class GridLightComponent extends React.Component {
    canvas: any;
    ctx: any;
    clientRect: any;
    config: any;
    data: any[];
    xAxisArray: any[];
    xDatas: any[]; // data的值
    xVals: any[]; // 单行总和
    yMiddle: any[]; // 当列中点值
    yPerVal: number; // 单位值对应的y轴大小
    yCurrentVals: any[]; // 当前值累加的位置信息
    xValsCoordinate: any[];
    dataPoints: any[];
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.getData();
        this.initCanvas();
        this.drawInit();
    }

    initData() {
        this.xDatas = []; // 保存data数组
        this.xAxisArray = [];
        this.xVals = [];
        this.yMiddle = [];
        this.yCurrentVals = []
        this.yPerVal = 0;
        this.dataPoints = [];
        this.data = streamgraphData.data;
        let categories = streamgraphData.categories;
        this.config = {
            startX: 50.5,
            startY: 420.5,
            H: 440,
            W: 450,
            labWidth: 10,
            xAxis: {
                categories: categories
            }
        }
    }

    getData() {
        let streamData = this.data;
        let len_stream = streamData.length;
        for (let i = 0; i < len_stream; i++) {
            let stream = streamData[i].data;
            this.xDatas.push(stream)
        }
        let xLen = streamData[0].data.length;
        this.yCurrentVals = JSON.parse(JSON.stringify(this.xDatas));
        this.dataPoints = JSON.parse(JSON.stringify(this.yCurrentVals));
        for (let i = 0; i < xLen; i++) {
            let count = 0;
            for (let j = 0; j < len_stream; j++) {
                let val = this.xDatas[j][i];
                count += val;
                this.yCurrentVals[j][i] = count;
            }
            this.xVals.push(count);
            this.yMiddle.push(count / 2);
        }
        this.yPerVal = (this.config.H - this.config.labWidth * 5) / Math.max(...this.xVals);
    }

    componentWillUnmount() {

    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    drawInit() {
        this.drawXAxis();
        this.drawStream();
        this.clipStreamAssist(); // 清除辅助区域
        this.drawXLabel();
    }

    drawXAxis() {
        let categories = this.config.xAxis.categories;
        let len = categories.length;
        let _w_per = this.config.W / len;
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#555555';
        this.ctx.moveTo(this.config.startX - this.config.labWidth, this.config.startY);
        this.ctx.lineTo(this.config.startX + this.config.W, this.config.startY);
        this.ctx.stroke();
        for (let i = 0; i < len; i++) {
            let _x = _w_per * i + this.config.startX;
            this.xAxisArray.push(_x);
            this.ctx.beginPath();
            this.ctx.moveTo(_x, this.config.startY);
            this.ctx.lineTo(_x, this.config.startY + this.config.labWidth);
            this.ctx.stroke();
        }
    }

    drawStream() {
        let streamData = JSON.parse(JSON.stringify(this.xDatas));
        let len_stream = streamData.length;
        let _middleY = this.config.startY - this.config.H / 2;
        for (let i = 0; i < len_stream; i++) {
            let data_stream = streamData[i];
            let len = data_stream.length;
            for (let j = 0; j < len; j++) {
                let x = this.xAxisArray[j];
                let curretY = this.yCurrentVals[i][j];
                let y = curretY > this.yMiddle[j] ? _middleY + (curretY - this.yMiddle[j]) * this.yPerVal : _middleY - (this.yMiddle[j] - curretY) * this.yPerVal
                this.dataPoints[i][j] = [x, y];
            }
        }
        this.ctx.lineWidth = 1;
        for (let i = 0; i < len_stream; i++) {
            let col = this.getCol(i);
            this.ctx.fillStyle = col;
            this.ctx.strokeStyle = col;
            let data_stream = streamData[i];
            let len = data_stream.length;
            this.ctx.beginPath();
            for (let j = 0; j < len; j++) {
                let point = this.dataPoints[i][j];
                if (j === 0) {
                    this.ctx.moveTo(point[0], point[1])
                } else if (j > 0) {
                    this.ctx.lineTo(point[0], point[1]);
                    if (len - 1 === j) {
                        this.ctx.lineTo(point[0], this.config.startY - 2);
                        this.ctx.lineTo(this.config.startX, this.config.startY - 2);
                        this.ctx.closePath();
                        this.ctx.fill();
                        this.ctx.stroke();
                    }
                }
            }

        }
    }

    clipStreamAssist() {
        let currentIndex = this.xDatas.length - 1;
        let stream = this.xDatas[currentIndex];
        let len = stream.length;
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle = '#ffffff';
        for (let j = 0; j < len; j++) {
            let point = this.dataPoints[currentIndex][j];
            if (j === 0) {
                this.ctx.moveTo(point[0], point[1] + 1)
            } else if (j > 0) {
                this.ctx.lineTo(point[0], point[1] + 1);
                if (len -1 === j) {
                    this.ctx.lineTo(point[0], this.config.startY - 2);
                    this.ctx.lineTo(this.config.startX, this.config.startY - 2);
                    this.ctx.closePath();
                    this.ctx.fill();
                    this.ctx.stroke();
                }
            }
        }
    }

    drawXLabel() {
        let categories = this.config.xAxis.categories;
        let len = categories.length;
        let x = this.config.startX;
        let y = 1|| this.config.startY;
        this.initFont();
        this.ctx.beginPath();
        for(let i=0;i<len;i++) {
            let item = categories[i];
            x = this.xAxisArray[i];
            if(!i || !((i+1) % 5)) {
                this.ctx.fillText(i+1, x, this.config.startY - this.config.labWidth);      
            }

        }
    }

    initFont() {
        this.ctx.font = "10px serif";
        this.ctx.fillStyle = '#999999';
        this.ctx.textAlign = 'center';
    }

    getCol(index: any): string {
        let cols: any[] = CONFIG.APP_COLS;
        return cols[index] || getColByRandom();
    }

    render() {
        return <><CanvasComponent /></>
    }
}
export default GridLightComponent;