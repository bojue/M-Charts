
import * as React from 'react';
import CanvasComponent from '../../comps/canvas';
import { streamgraphData } from '../../mock';
import "./streamgraph.scss";

class GridLightComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    xAxisArray:any[];
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
    }

    initData() {
        this.xAxisArray = [];
        this.data = streamgraphData.data;
        let categories =  streamgraphData.categories;
        this.config = {
            startX: 50.5,
            startY: 420.5,
            H:440,
            W: 450,
            labWidth: 10,
            xAxis: {
                categories: categories
            }
        }

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
        this.drawXAxis();
    }

    drawXAxis() {
        let categories = this.config.xAxis.categories;
        let len = categories.length;
        let _w_per = this.config.W  / len;

        this.ctx.beginPath();
        this.ctx.strokeStyle = '#555555';
        this.ctx.moveTo(this.config.startX - this.config.labWidth , this.config.startY);
        this.ctx.lineTo(this.config.startX + this.config.W, this.config.startY);
        this.ctx.stroke();    
        for(let i=0;i<len;i++) {
            let _x = _w_per * i + this.config.startX;
            this.xAxisArray.push(_x);
            this.ctx.beginPath();
            this.ctx.moveTo(_x , this.config.startY);
            this.ctx.lineTo(_x , this.config.startY + this.config.labWidth);
            this.ctx.stroke();    
        }

    }

    render() {
        return  <><CanvasComponent/></>
    }
}
export default GridLightComponent;