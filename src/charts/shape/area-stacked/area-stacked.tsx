
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
        this.data = [{
            name: '亚洲',
            data: [502, 635, 809, 947, 1402, 3634, 5268]
        }, {
            name: '非洲',
            data: [106, 107, 111, 133, 221, 767, 1766]
        }, {
            name: '欧洲',
            data: [163, 203, 276, 408, 547, 729, 628]
        }, {
            name: '美洲',
            data: [18, 31, 54, 156, 339, 818, 1201]
        }, {
            name: '大洋洲',
            data: [2, 2, 2, 6, 13, 30, 46]
        }]

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

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.2)';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = "right";
        this.ctx.font = "14px serif";    
        this.ctx.fillStyle = '#4988FE';

        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = "center";

        // 绘制竖轴
        for(let i=0;i<xLen -1;i++)  {
            let _w = beginX + (i+1) * w;

            // 竖轴
            this.ctx.moveTo(_w,  beginY);
            this.ctx.lineTo(_w, beginY + this.config.labWidth / 2);

            // 竖轴Lab
            this.ctx.fillText(this.config.xAxis.categories[i], _w, beginY + this.config.labWidth  );
        }


        // 绘制横轴
        for(let i=0;i<yLen;i++) {
            let _h = beginY - h * i;
            
            // 横轴
            this.ctx.moveTo(beginX,  _h);
            this.ctx.lineTo(endX, _h);

            // 横轴Lab
            this.ctx.fillText(this.config.yAxis.categories[i], beginX - this.config.labWidth, _h);
        }

        this.ctx.stroke();
       
    }

    render() {
        return  <div className="charts">
                <canvas id="canvas" width="600" height="500"></canvas>
            </div>
    }
}
export default  AreaStackedComponent;