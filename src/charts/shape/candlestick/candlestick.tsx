
import * as React from 'react';
import { init } from '../../provider/canvas';
import "./candlestick.scss";

class CandlestickComponent extends React.Component {
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
        this.drawInit();
    }

    initData() {
        this.config = {
            startX:50.5,
            startY:470.5,
            H: 420, // 高度
            W:500, // 宽度
            count:5, // Height分段数
            min:2100, // 最小值
            max:2350, // 最大值
            labPadding:12 // 文字间距
        }
        this.data = [
            ['2013/3/25', 2334.74,2326.72,2319.91,2344.89],
            ['2013/3/26', 2318.58,2297.67,2281.12,2319.99],
            ['2013/3/27', 2299.38,2301.26,2289,2323.48],
            ['2013/3/28', 2273.55,2236.3,2232.91,2273.55],
            ['2013/4/10', 2224.93,2226.13,2212.56,2233.04],
            ['2013/4/11', 2236.98,2219.55,2217.26,2242.48],
            ['2013/4/12', 2218.09,2206.78,2204.44,2226.26],
            ['2013/4/15', 2199.91,2181.94,2177.39,2204.99],
            ['2013/4/16', 2169.63,2194.85,2165.78,2196.43],
            ['2013/4/17', 2195.03,2193.8,2178.47,2197.51],
            ['2013/4/18', 2181.82,2197.6,2175.44,2206.03],
            ['2013/4/19', 2201.12,2244.64,2200.58,2250.11],
            ['2013/4/22', 2236.4,2242.17,2232.26,2245.12],
            ['2013/4/23', 2242.62,2184.54,2182.81,2242.62],
            ['2013/4/24', 2187.35,2218.32,2184.11,2226.12],
            ['2013/4/25', 2213.19,2199.31,2191.85,2224.63],
            ['2013/4/26', 2203.89,2177.91,2173.86,2210.58],
            ['2013/5/2', 2170.78,2174.12,2161.14,2179.65],
            ['2013/5/3', 2179.05,2205.5,2179.05,2222.81],
            ['2013/5/6', 2212.5,2231.17,2212.5,2236.07],
            ['2013/5/7', 2227.86,2235.57,2219.44,2240.26],
            ['2013/5/8', 2242.39,2246.3,2235.42,2255.21],
            ['2013/5/9', 2246.96,2232.97,2221.38,2247.86],
            ['2013/5/10', 2228.82,2246.83,2225.81,2247.67],
            ['2013/5/13', 2247.68,2241.92,2231.36,2250.85],
            ['2013/5/14', 2238.9,2217.01,2205.87,2239.93],
            ['2013/5/15', 2217.09,2224.8,2213.58,2225.19],
            ['2013/5/16', 2221.34,2251.81,2210.77,2252.87],
            ['2013/5/17', 2249.81,2282.87,2248.41,2288.09],
            ['2013/5/20', 2286.33,2299.99,2281.9,2309.39],
            ['2013/5/21', 2297.11,2305.11,2290.12,2305.3],
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
        let len = this.data.length;
        let vals = this.config.max - this.config.min;
        let h = Number((this.config.H / this.config.count).toFixed(2));
        let w = Number((this.config.W / len).toFixed(2));
        let val = Number( (vals / this.config.count).toFixed(2));
        let x = this.config.startX;
        let y = this.config.startY;
        this.ctx.font = "12px serif";    
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = 'middle';

        for(let i=0;i<=this.config.count;i++) {
            this.ctx.beginPath();

            // 行横线
            this.ctx.fillStyle = 'rgba(0,0, 0, 0.03)';
            this.ctx.strokeStyle = !i ? 'rgba(0,0, 0, 0.4)' :'rgba(0,0, 0, 0.1)';
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(x, y - i * h);
            this.ctx.lineTo(x + this.config.W,  y - i * h);
            
            // 竖线
            if(!i) {
                this.ctx.moveTo(x, y - i * h);
                this.ctx.lineTo(x, y - this.config.H -  this.config.labPadding);    
            }

            // 行Lab线
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.moveTo(x, y - i * h);
            this.ctx.lineTo(x - this.config.labPadding / 2,  y - i * h);

            // 文字
            this.ctx.fillStyle = '#4988FE';
            this.ctx.fillText(this.config.min + val * i ,x - this.config.labPadding, y - i * h)
            this.ctx.stroke();
        }

        let spaceValue = Number((vals / this.config.H).toFixed(2));
        let _rectWidth = Number((w / 1.5).toFixed(2));
        let _startX = this.config.startX;

        this.ctx.textBaseline = 'top';
        for(let i=0;i<len;i++) {
            this.ctx.beginPath();
            let item = this.data[i];
            let y1 =  Number(((item[1] - this.config.min) / spaceValue).toFixed(2));
            let y2 =  Number(((item[2] - this.config.min)  / spaceValue ).toFixed(2));
            let y3 =  Number(((item[3] - this.config.min) / spaceValue).toFixed(2));
            let y4 =  Number(((item[4] - this.config.min)  / spaceValue ).toFixed(2));
           
            // 绘制矩形
            this.ctx.fillStyle = y1 < y2 ? '#EC0000' : '#00DA3C';
            this.ctx.strokeStyle =  y1 < y2 ? '#900808' : '#008F28';
            let _y = y1 > y2 ? y1 : y2;
            let _h = y1 > y2 ? y1 - y2 : y2- y1;
            let _x  = _startX + w * i ;
            this.ctx.fillRect(_x - _rectWidth / 2, this.config.startY - _y, _rectWidth, _h);

            // 绘制边框
            this.ctx.strokeRect(_x - _rectWidth / 2, this.config.startY - _y, _rectWidth, _h);

            // 绘制线条
            this.ctx.beginPath();
            this.ctx.moveTo(_x, this.config.startY - _y);
            this.ctx.lineTo(_x, this.config.startY  - y4);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(_x, this.config.startY - _y + _h);
            this.ctx.lineTo(_x, this.config.startY  - y3);
            this.ctx.stroke();
            // 文字
            if(i % 5 === 0) {
                this.ctx.beginPath();
                // 列Lab线
                this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
                this.ctx.moveTo(_x, this.config.startY );
                this.ctx.lineTo(_x , this.config.startY + this.config.labPadding / 2 );

                // 文字
                this.ctx.fillStyle = '#4988FE';
                this.ctx.textAlign = "center";
                this.ctx.fillText(item[0] ,_x, this.config.startY + this.config.labPadding )
                this.ctx.stroke();
            }
        }
    }

    render() {
        return  <div className="charts">
                <canvas id="canvas" width="600" height="500"></canvas>
            </div>
    }
}
export default CandlestickComponent;