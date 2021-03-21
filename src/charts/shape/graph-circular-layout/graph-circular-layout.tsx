
import * as React from 'react';
import CanvasComponent from '../../comps/canvas';
import { LesMiserableData  } from './../../mock/mock-model';
import { CONFIG }  from './../../config/color_def';
import { find } from 'lodash';
import "./graph-circular-layout.scss";

class GraphCircularLayoutComponent extends React.Component {
    canvas: any;
    ctx: any;
    clientRect: any;
    config: any;
    data: any[];
    links: any[];
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
        this.draw();
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    initData() {
        this.data = LesMiserableData.nodes;
        this.links = LesMiserableData.links;
        this.config = {
            START_X: 300, // 起点X
            START_Y: 250, // 起点Y
            RADIUS:200 //半径
        }
    }

    drawInit() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle ='#ffffff';
    }

    draw() {
        this.drawArcs();
        this.drawlinks();
    }

    drawArcs() {
        let len =  this.data.length;
        let unitScale = this.getDrawUnitScaleInfo();
        let currAngle = 0;
        let offsetWidth = ( Math.PI * this.config.RADIUS ) / len;
        let offsetAngle =  this.getAngleByLength(offsetWidth);
        for(let i=0;i<len;i++) {
            let node = this.data[i];
            let angle = this.getAngleByLength(node.value * unitScale / 2);
            currAngle += angle ;
            let point = this.getCoorDinateByAngle(currAngle);
            node.x = point[0];
            node.y = point[1]
            this.drawArc(node, node.symbolSize  * unitScale);
            currAngle += angle ;
            currAngle += offsetAngle;
        }
    }

    drawlinks() {
       let len = this.links.length;
       for(let i=0;i<len;i++) {
           let link = this.links[i];
            this.drawLink(link);
       }
    }

    drawLink(link:any) {
        console.log(link)
        let sourceNode = find(this.data, {
            id:link.source
        })
        let targetNode = find(this.data, {
            id:link.target
        })
        this.ctx.strokeStyle = this.getCol(targetNode.category);;
        this.ctx.beginPath();
        this.ctx.moveTo(sourceNode.x, sourceNode.y);
        this.ctx.quadraticCurveTo(this.config.START_X, this.config.START_Y, targetNode.x, targetNode.y);
        this.ctx.stroke();
    }

    getCoorDinateByAngle(angule:number) {
        let x = this.config.START_X + Math.sin(angule) * this.config.RADIUS;
        let y = this.config.START_Y + Math.cos(angule) * this.config.RADIUS;
        return [x, y]
    }
    
    getDrawUnitScaleInfo() {
        let len =  this.data.length;
        let unitScale = 0;
        let count = 0;
        for(let i=0;i<len;i++) {
            let node = this.data[i];
            count += node.value;
        }
        unitScale = ( Math.PI * this.config.RADIUS ) / count;
        return unitScale;
    }

    getAngleByLength(len:number) {
        let angle = 0;
        angle = len / this.config.RADIUS ;
        return angle;
    }

    drawArc(node:any, r:number) {
        let x = node.x;
        let y = node.y;
        this.ctx.fillStyle= this.getCol(node.category);
        this.ctx.beginPath();
        this.ctx.arc(x, y, r,0,2*Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
    }

    getCol(index:number) {
        let cols = CONFIG.APP_COLS;
        return cols[index];
    }


    render() {
        return <><CanvasComponent /></>
    }
}
export default GraphCircularLayoutComponent;