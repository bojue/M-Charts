
import * as React from 'react';
import CanvasComponent from '../../comps/canvas';
import { arcDiagramData } from './../../mock/index';
import { getColByRandom } from './../../provider/getColorByRandom';
import './arc-diagram.scss'

class ArcDiagramComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any;
    cols:any[];
    points:any[];
    edges:any[];
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.initDraw();
    }

    initData() {
        this.points = [];
        this.cols = [
            'rgb(91, 143, 249)',
            'rgb(90, 216, 166)',
            'rgb(93, 112, 146)',
            'rgb(246, 189, 22)',
            'rgb(232, 104, 74)',
            'rgb(109, 200, 236)',
            'rgb(146, 112, 202)',
            'rgb(255, 157, 77)',
            'rgb(38, 154, 153)',
            'rgb(227, 137, 163)',
        ];
        this.config = {
            START_X: 10,
            START_Y: 250,
            WIDTH:500,
            PADDING_TXT: 5
        }
        this.data = arcDiagramData;
        this.edges = arcDiagramData.edges;
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    componentWillUnmount() {

    }
    
    initDraw() {
        this.defSetting();
        this.drawNodes();
        this.drawEdges();
    }

    defSetting() {
        this.ctx.font="10px microsoft yahei";
        this.ctx.textAlign = 'center';
    }

    drawNodes() {
        let nodes = arcDiagramData.nodes;
        let vals = this.drawNodesVal(nodes);
        let len = nodes.length;
        if(len <= 1) return;
        let width = this.config.WIDTH - this.config.START_X;
        let _w_per_val = width / 4 / vals / 2;
        let _space_per_arc = width / 4 * 3 / (len -1);
        let _current_x = this.config.START_X;
        
        for(let i=0;i<len;i++) {
            let item = nodes[i];
            let x = _current_x;
            let y = this.config.START_Y;
            let r = item.value * _w_per_val;
            if(i === len -1) {
                _current_x = _current_x + _space_per_arc + r ;
            }else {
                _current_x = _current_x + _space_per_arc + r  + ( (nodes[i+1]!.value || 2 )* _w_per_val);
            }

            this.ctx.beginPath();
            this.ctx.fillStyle = this.getCols();
            this.ctx.arc(_current_x, y, r, 0,  Math.PI * 2);
            this.ctx.fill();
            // 绘制下标
            this.drawText(i + 1, _current_x, y + this.config.PADDING_TXT * 4);

            // catch  point info
            let point = {
                val:item.value,
                name:item.name,
                x:_current_x,
                y:y, 
                r:r,
                id:i,
                data:item,
            }
            this.points.push(point)
        }
    }

    drawEdges() {
        let list = this.edges;
        let len = list.length;
        for(let i =0;i<len;i++) {
            let edge = list[i];
            if(edge && edge.source !== edge.target) {
                let s = Math.min(edge.source, edge.target);
                let e = Math.max(edge.source, edge.target);
                let sPoint = this.points[s];
                let ePoint = this.points[e];
                let _x = ePoint.x - sPoint.x;
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.getCols();
                this.ctx.moveTo(sPoint.x ,sPoint.y);
                this.ctx.quadraticCurveTo(sPoint.x + _x/2 , sPoint.y - _x /2, ePoint.x , ePoint.y);
                this.ctx.stroke();
            }
        }
    }

    drawText(item:any, x:number, y:number) {
        this.ctx.beginPath();
        this.ctx.fillText(item, x, y );
        this.ctx.fill();
    }


    getCols() {
        return getColByRandom();
    }

    drawNodesVal(nodes:any[]) {
        let vals = 0;
        let len = nodes.length;
        for(let i=0;i<len;i++) {
            let item = nodes[i];
            vals += item.value
        }
        return vals;
    }

    render() {
        return <><CanvasComponent/></>
    }
}
export default ArcDiagramComponent;