
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
        this.drawNodeData()
        this.drawImageData()
    }

    // 绘制位像素
    drawImageData() {
        const {
            START_X,
            START_Y,
            W,
            H
        } = this.config
        const imgData = this.ctx.getImageData( START_X * 2, (START_Y -H) * 2, W * 2, H * 2)
        const { data: pix } = imgData // 位数据
        const len = pix?.length
        for(let i=0;i<len;i+=4) {
          const alpha = pix[i +3 ]
           pix [i   ]  = 128  * Math. sin ((1  / 256  *  alpha - 0.5  )  * Math. PI  )  +  200 
           pix [i +1 ]  = 128  * Math. sin ((1  / 128  * alpha  - 0.5  )  * Math. PI  )  +  127 
           pix [i +2 ]  = 256  * Math. sin ((1  / 256  * alpha  + 0.5  )  * Math. PI  ) 
           pix [i +3 ]  = pix [i + 3 ]  *  0.8 ;
        }
        this.ctx.putImageData(imgData, START_X * 2, (START_Y - H) * 2)
    }

    // 绘制点数据
    drawNodeData(){
        let len = this.data.length
        const {W, H,START_X:X, START_Y:Y,carat_len, prices_per, carat_per,prices_len } = this.config
        const w_per = W / ( prices_len * prices_per)
        const h_per = H / ( carat_per  *  carat_len)
        const _R = 10
        this.ctx.fillStyle = 'rgba(73,136,254,0.15)'    
        for(let i=0;i<len;i++) {
            let {
                price,
                carat
            } = this.data[i]
            this.ctx.beginPath()
            const _x = w_per * carat + X
            const _y = Y - h_per * price
            const radgrad  =  this.ctx.createRadialGradient (_x , _y , 1 , _x , _y , 8 )
            radgrad.addColorStop (0 ,  'rgba(255,30,0,1)' )
            radgrad.addColorStop (0.2 , 'rgba(255,30,0,0.8)' )
            radgrad.addColorStop (0.9 ,  'rgba(255,30,0,0.1)' )
            radgrad.addColorStop (1 ,  'rgba(255,30,0,0.0)' )
            this.ctx.fillStyle  = radgrad ;
            this.ctx.arc(_x,_y,_R ,0,2 * Math.PI)
            this.ctx.closePath()
            this.ctx.fill()
        }
              
    } 

    // 绘制坐标系统
    drawCoordinateSystem() {    
        const {W, H,START_X:X, START_Y:Y,carat_len,labPadding, carat_per,prices_len } = this.config
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