
import * as React from 'react'
import CanvasComponent from '../../comps/canvas/canvas'
import { getMockJsonUrlByType } from '../../provider/getMockJsonService'
import { CONFIG } from './../../config/color_def'
import store from '../../../redux/store';

class HeatmapComponent extends React.Component {
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
            START_X:50.5,
            START_Y:470.5,
            H: 400, // 高度
            W:500, // 宽度
            count: 7, // Height分段数
            labPadding:6, // 文字间距
            prices_min:0,
            prices_per:1, // prices单位值
            prices_len:4,
            carat_min:0,
            carat_per:5000, // carat单位值
            carat_len:4
        }
        this.data =  getMockJsonUrlByType('heatmap')
  
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
        this.drawCoordinateSystem()
        this.drawData()
    }

    drawData(){
        let len = this.data.length
        const {W, H,START_X:X, START_Y:Y,carat_len, prices_per, carat_per, prices_min,prices_len } = this.config
        const w_per = W / ( prices_len * prices_per)
        const h_per = H / ( carat_per  *  carat_len)
        this.ctx.strokeStyle = '#4988FE'    
        for(let i=0;i<len;i++) {
            let {
                price,
                carat
            } = this.data[i]
            this.ctx.beginPath()
            const _x = w_per * carat + X
            const _y = Y - h_per * price
            this.drawNode(_x , _y)
            this.ctx.stroke()
        }
    } 

    drawNode(x:number, y:number) {
        this.ctx.arc(x,y,3,0,2*Math.PI)
    }

    // 绘制坐标系统
    drawCoordinateSystem() {    
        const {W, H,START_X:X, START_Y:Y,carat_len,labPadding, carat_per, prices_min,prices_len } = this.config
        const h_per = H / carat_len
        const w_per = W / prices_len
        this.ctx.lineWidth = 1;
        this.ctx.font = "12px serif"   
        this.ctx.textAlign = "right"
        this.ctx.textBaseline = 'middle'
        this.ctx.fillStyle = 'rgba(0,0, 0, 0.5)'
        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.1)'
        for(let i = 0;i <= carat_len;i++) {
            this.ctx.beginPath();
            const curr_y = Y - i * h_per
            this.ctx.strokeStyle = !i ? 'rgba(0,0, 0, 0.3)' : 'rgba(0,0, 0, 0.1)'
            this.ctx.moveTo(X, curr_y + 0.5)
            this.ctx.lineTo(X + W, curr_y + 0.5)
            this.ctx.fillText(carat_per * i, X - labPadding,  curr_y + 0.5)
            this.ctx.stroke()
        }

        this.ctx.strokeStyle = 'rgba(0,0, 0, 0.3)'
        this.ctx.textAlign = "center"
        for(let i=0;i <= prices_len;i++) {
            this.ctx.beginPath();
            const curr_y = Y + 0.5
            const curr_x = X +  w_per * i 
            this.ctx.moveTo(curr_x, curr_y)
            this.ctx.lineTo(curr_x, curr_y + labPadding)
            this.ctx.fillText(i , curr_x, curr_y + 3 * labPadding)
            this.ctx.stroke()
        }
    }

    getCols() {
        return CONFIG.APP_COLS
    }

    render() {
        return <> 
                <CanvasComponent/>
            </>
    }
}
export default HeatmapComponent