import * as React from 'react';
import { init } from '../../provider/canvas';
import { sunburstData } from './../../mock/mock-model';
import "./sunburst.scss";
class SunburstComponent extends React.Component {
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
        this.initDraw();
    }

    initData() {
        this.config = {
            RADIUS: 60, // 圆饼半径
            WIDTH: 60, // 内部圆的半径
            RADIUS_VAL: 20, // 小圆半径
            COORDINATE_X:250, // x坐标
            COORDINATE_Y:250, // y坐标
            NUMS:75,
            START_ANGLE: 0 ,// 起始角度
        }
        this.data = [
            {
                val:10,
                level:1,
                child:[
                    {
                        val:7,
                        child:[]
                    },{
                        val:3,
                        child:[],
                    }
                ]
            },{
                level:1,
                val:6,
                child:[],
            }, {
                level:1,
                val:15,
                child:[{
                    level:2,
                    val:7,
                    child:[]
                },{
                    level:2,
                    val:3,
                    child:[],
                }]
            }
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

    initDraw() {
        this.ctx.fillStyle = 'red';
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.drawData();

        // 空心圆
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.arc(this.config.COORDINATE_X,this.config.COORDINATE_Y,this.config.RADIUS , 0 , Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
   
    drawData(list : any[] =  this.data,level:number  = 0, sAngle:number = this.config.START_ANGLE, angle:number = Math.PI * 2) {
        let data = list;
        let count = 0;
        let len = data.length;
        let curr_angle =  sAngle;
        for(let i=0;i<len;i++) {
            count += data[i]['val'];
        }

        for(let i=0;i<len;i++) {
            this.ctx.fillStyle = level ? [        
                '#4988FE',
                '#22D3AA',
                '#00b33c',
                '#99cc00',
                '#4944FE'][i] : [        
                    '#00b33c',
                    '#99cc00',
                    '#4944FE'][i]
            let item = data[i];
         
            let _currAngle = angle * (item.val / count) ;
            if(Array.isArray(item['child']) && item['child'].length) {
                this.drawData(item['child'],1, curr_angle, _currAngle);
            }
            this.ctx.beginPath();
            this.ctx.moveTo(this.config.COORDINATE_X, this.config.COORDINATE_Y);
            this.ctx.arc(this.config.COORDINATE_X,this.config.COORDINATE_Y,this.config.RADIUS + this.config.WIDTH * (level + 1) ,curr_angle,curr_angle + _currAngle);
            this.ctx.lineTo(this.config.COORDINATE_X, this.config.COORDINATE_Y);
            curr_angle += _currAngle ;
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
export default SunburstComponent;