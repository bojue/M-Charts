
import * as React from 'react';
import { init, getEventCoordinates } from '../../provider/canvas';
import "./area-stacked.scss";

class AreaStackedComponent extends React.Component {
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
        this.data = [502, 635, 809, 947, 1402, 3634, 5268]

        this.config = {
            startX: 50.5,
            startY: 420.5,
            H:440,
            W: 450,
            labWidth: 10,
            xAxis: {
                categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
            },
            yAxis: {
                categories: [0,2.5,5,7.5,10],
                title: {
                    text: '十亿'
                },
            },
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



    drawInit() {
        let xLen =  this.config.xAxis.categories.length + 1 || 1;
        let yLen = this.config.yAxis.categories.length || 1; 
        let w = Number((this.config.W / xLen).toFixed(2));
        let h = Number((this.config.H / yLen).toFixed(2));
        let beginX = this.config.startX;
        let endX = this.config.startX + this.config.W;
        let beginY = this.config.startY;

        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.1)';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = "right";
        this.ctx.font = "14px serif";    
        this.ctx.fillStyle = '#4988FE';
        this.ctx.textAlign = "center";

        this.ctx.beginPath();
        this.ctx.textBaseline = 'top';
        // 绘制竖轴
        for(let i=0;i<xLen -1;i++)  {
            let _w = beginX + (i+1) * w;
            // 竖轴
            this.ctx.moveTo(_w,  beginY);
            this.ctx.lineTo(_w, beginY + this.config.labWidth / 2);
            // 竖轴Lab
            this.ctx.fillText(this.config.xAxis.categories[i], _w, beginY + this.config.labWidth  );
        }
        this.ctx.textBaseline = 'middle';
        // 绘制横轴
        for(let i=0;i<yLen;i++) {
            let _h = beginY - h * i;
            // 横轴
            this.ctx.moveTo(beginX,  _h);
            this.ctx.lineTo(endX, _h);
            // 横轴Lab

            this.ctx.fillText(this.config.yAxis.categories[i], beginX - 2 * this.config.labWidth, _h);
        }
        this.ctx.stroke();

        // 绘制数据
        let len = this.data.length;
        let vals = [];

        for(let i=0;i<len;i++) {
            vals[i] = this.data[i]  / 1000;
        }
      
        this.ctx.fillStyle = '#4988FE';
        let points = [];
        for(let i=0;i<len;i++) {
            let _h = beginY - vals[i] * this.config.H / 10;
            let _w = beginX + (i+1) * w;
            if(!i) {
                this.ctx.moveTo(_w,  beginY);
            }
            this.ctx.lineTo(_w , _h);
            points.push([_w, _h])
            if(i === len -1) {
                this.ctx.lineTo(_w,  beginY);
                this.ctx.lineTo(beginX + w,  beginY);
            }

        }
        this.ctx.fill();
        this.ctx.stroke();

        
        for(let i=0;i<points.length;i++) {
            let point = points[i];
            let _w = point[0];
            let _h = point[1];
            this.ctx.beginPath(); 
            this.ctx.arc(_w , _h, 4, 0, 2 * Math.PI);
            this.ctx.fillStyle="#fff"; 
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "#4944FE";
            this.ctx.closePath(); 
            this.ctx.fill();
            this.ctx.stroke();  
        }
    }

    render() {
        return  <div className="charts">
                <canvas id="canvas" width="600" height="500"></canvas>
            </div>
    }
}
export default  AreaStackedComponent;