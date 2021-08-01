
import * as React from 'react';
import CanvasComponent from '../../comps/canvas/canvas';;
import { CONFIG } from './../../config/color_def';
import "./gauge.scss";

class GuageComponent extends React.Component {
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
        this.addLister();
    }

    initData() {
        this.config = {
            INTERNAL_RADIUS: 150, // 圆饼半径
            IN_WIDHT: 4,
            MIDDLE_WIDTH:10,
            MIDDLE_RADIUS: 160, // middle半径
            OUBLINE_RADIUS: 200, // 外部半径
            COORDINATE_X:300, // x坐标
            COORDINATE_Y:250, // y坐标
            NUMS:75,
            PADDING_TEXT:5
        }
        this.data = [

        ]
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    addLister() {
        window.addEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    drawInit() {
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.config.COORDINATE_X,this.config.COORDINATE_Y);
        let len = this.config.NUMS;
        let number = 73;
        let angle = ( (number / 100) * 4 / 3 + 2 / 3 )* Math.PI;

        let ShortCell = 2 * Math.PI / len;
        // text 
        this.ctx.font='30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = this.getCol()[0];
        this.ctx.fillText(`${number}%`,0,this.config.PADDING_TEXT * 12);

        // 指针
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = '#dddddd';
        let _r_inner = 10;
        let r = this.config.INTERNAL_RADIUS / 5 * 4;
        this.ctx.arc(0, 0, _r_inner,  0 , Math.PI * 2 , false);
        let _angle = Math.PI / 6 + angle;
        this.ctx.moveTo((_r_inner) * Math.cos(_angle),  (_r_inner) * Math.sin(_angle));
        this.ctx.lineTo( r* Math.cos(_angle),  r* Math.sin(_angle));
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx.closePath();



        // 短刻度
        for(let i=0;i<len;i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.moveTo(this.config.INTERNAL_RADIUS,0);
            this.ctx.lineTo(this.config.INTERNAL_RADIUS -this.config.IN_WIDHT, 0);
            this.ctx.stroke();    
            this.ctx.rotate(ShortCell);
            this.ctx.closePath();
        }

        let Labcell = 4 /  15  * Math.PI;
        for(let i=0;i<6;i++) {
            // 长刻度
            if(i === 0) {
                this.ctx.rotate(31 * ShortCell);
            }else {
                this.ctx.rotate(Labcell);
            }
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = 'rgba(0,0, 0, 0.4)';
            this.ctx.moveTo(this.config.INTERNAL_RADIUS,0);
            this.ctx.lineTo(this.config.INTERNAL_RADIUS - this.config.MIDDLE_WIDTH, 0);
            this.ctx.stroke();    
            // 文本
            this.ctx.font = '12px Microsoft'; 
            this.ctx.textAlign = 'right';
            this.ctx.fillText(20 * (i), this.config.INTERNAL_RADIUS - 25, 0);
            this.ctx.closePath();
        }

        // middle
        let Middlecell =  2 * Math.PI / this.config.NUMS;
        for(let i=0;i<=50;i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.getCol()[4]
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(this.config.MIDDLE_RADIUS,0);
            this.ctx.lineTo(this.config.MIDDLE_RADIUS + 30, 0);

            if(i === 0) {
                this.ctx.rotate(2 / 3 * Math.PI);
            }else {
                this.ctx.rotate(Middlecell);
            }
            this.ctx.stroke();    
            this.ctx.closePath();

        }

        // outline
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle =  this.getCol()[0];
   
        this.ctx.arc(0, 0, this.config.OUBLINE_RADIUS,  2 / 3 * Math.PI , angle , false);
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx.closePath();

        this.ctx.beginPath(); 
        this.ctx.strokeStyle = '#4944FE';
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle="white"; 
        this.ctx.arc( (this.config.OUBLINE_RADIUS )* Math.cos(angle),  (this.config.OUBLINE_RADIUS )* Math.sin(angle), 10,0,Math.PI*2,true); 
        this.ctx.stroke();
        this.ctx.closePath(); 
        this.ctx.fill()

        this.ctx.beginPath(); 
        this.ctx.arc( (this.config.OUBLINE_RADIUS )* Math.cos(angle),  (this.config.OUBLINE_RADIUS )* Math.sin(angle), 7,0,Math.PI*2,true); 
        this.ctx.fillStyle= this.getCol()[0]
        this.ctx.closePath(); 
        this.ctx.fill()
    }

    getCol() {
        return CONFIG.DEF_COLS;
    }

    render() {
        return  <><CanvasComponent/></>
    }
}
export default GuageComponent;