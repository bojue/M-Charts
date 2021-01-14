
import * as React from 'react';
import CanvasComponent from '../../comps/canvas';
import { CONFIG } from './../../config/color_def';
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
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.initDraw();
    }

    initData() {
        this.cols = CONFIG.DEF_COLS;
        this.config = {
            START_X: 10,
            START_Y: 340,
            WIDTH:500,
            PADDING_TXT: 5
        }
        this.data = arcDiagramData;
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
        this.drawNodes();
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
        this.ctx.font="10px microsoft yahei";
        
        for(let i=0;i<len;i++) {
            let item = nodes[i];
            let x = _current_x;
            let y = this.config.START_Y;
            let r = item.value * _w_per_val;
            this.ctx.fillStyle = this.getCols();
            if(i === len -1) {
                _current_x = _current_x + _space_per_arc + r ;
            }else {
                _current_x = _current_x + _space_per_arc + r  + ( (nodes[i+1]!.value || 2 )* _w_per_val);
            }

            this.ctx.beginPath();
            this.ctx.arc(_current_x, y, r, 0,  Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            if(i < 4) {
                this.drawText(item, _current_x, y + this.config.PADDING_TXT * 3);
                // this.ctx.rotate(-Math.PI / 180 * 10);
            }

        }
    }

    drawText(item:any, x:number, y:number) {
        // this.ctx.beginPath();
        // this.ctx.rotate(Math.PI / 180 * 10);
        console.log(item.name, x, y)
        this.ctx.fillText(item.name, x, y );
        this.ctx.fill();
        this.ctx.stroke();
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