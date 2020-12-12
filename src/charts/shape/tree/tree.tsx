
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import "./tree.scss";

class TreeComponent extends React.Component {
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
            startX:50,
            startY:250,
            w:200, //层级宽度
            r:8, //半径
            secondChildLen:3,
            secondChildSpaceing: 100,
            lastChildLen: 9,
            lastSpacing:30,
        }

        this.data = [
            {
                name:"前端",
                child: [
                    {
                        name:"技术",
                        child:[
                            {
                                name:"JavaScript",
                                child:null,
                            },
                            {
                                name:"TypeScript",
                                child:null,
                            },
                            {
                                name:"CSS",
                                child:null
                            },
                            {
                                name:"HTML",
                                child:null
                            }
                        ]
                    }, 
                    {
                        name:"图像",
                        child:[
                            {
                                name:"SVG",
                                child:null,
                            },
                            {
                                name:"Canvas",
                                child:null
                            },
                            {
                                name:"WebGL",
                                child:null
                            }
                        ]
                    },
                    {
                        name:"框架",
                        child:[
                            {
                                name:"Angular",
                                child:null,
                            },
                            {
                                name:"Vue",
                                child:null
                            },
                            {
                                name:"React",
                                child:null
                            }
                        ]
                    }
                ]
            }
        ]
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
        this.ctx.strokeStyle = '#4988FE';
        let webData = this.data[0];
        this.drawText(webData.name, this.config.startX, this.config.startY);
        this.drawPoints(webData, this.config.startX, this.config.startY , this.config.secondChildSpaceing);   
    }

    // 绘制节点
    drawPoints(webData:any, x:number, centerY:number, spaceing:number, reverseTextBool?:boolean) {
        let list =webData && webData['child'];
        if(!Array.isArray(list)) return;
        let len = list.length;
        let spaceConut = (len % 2) 
        let beginY = spaceConut === 1 ? (len -1) / 2 * spaceing:(  len / 2  - 0.5 ) * spaceing;
        for(let i=0;i<len;i++) {
     
            let item = list[i];
            let _x = x + this.config.w;
            let _y = (centerY - beginY) + spaceing * i;
            this.drawLine(x, centerY, _x, _y, spaceing);
            this.drawPoint(_x, _y);
            this.drawText(item.name,_x, _y, reverseTextBool);

            // 绘制上级节点
            if(i === len -1) {
                this.drawPoint(x, centerY);
            }
            if(Array.isArray(item.child)) {
                this.drawPoints(item, _x, _y, this.config.lastSpacing, true);   
            }
        }
    }

    // 绘制点
    drawPoint(_x:number, _y:number) {
        this.ctx.beginPath();
        this.ctx.linewidth = 2;
        this.ctx.fillStyle = "#fff";
        this.ctx.arc(_x,  _y, this.config.r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }

    // 绘制连线
    drawLine(sX:number, sY:number, eX:number, eY:number,space:number) {
        this.ctx.beginPath();
        this.ctx.linewidth = 1;
        this.ctx.moveTo(sX, sY);
        this.ctx.quadraticCurveTo(sX, sY, eX, eY);
        this.ctx.stroke();
    }

    // 绘制文本
    drawText(val: string, x:number, y:number, reverseTextBool?:boolean) {
        this.ctx.beginPath();
        this.ctx.font = "12px serif";    
        this.ctx.fillStyle = '#aaa';
        this.ctx.textBaseline = 'middle';
        if(reverseTextBool) {
            this.ctx.textAlign = 'left';
            this.ctx.fillText(val, x + 18, y);
        }else {
            this.ctx.textAlign = 'right';
            this.ctx.fillText(val, x - 15, y);
        }
        this.ctx.stroke();
    }



    render() {
        return  <><CanvasComponent/></>
    }
}
export default TreeComponent;