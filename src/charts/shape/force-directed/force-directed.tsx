
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import { forceDirectedData } from './../../mock/mock-model';;
import { CONFIG } from './../../config/color_def';
const groupBy = require('loadsh/groupBy');
const find = require('loadsh/find');
const cloneDeep = require('loadsh/cloneDeep');
import "./force-directed.scss";
class ForceDirectedComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    dataLines:any[];
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.drawInit();
    }

    initData() {
        this.data = forceDirectedData;
        this.config = {
            W: 500, //长度
            H: 400, //高度
            START_X: 50, // 起点X
            START_Y: 50, // 起点Y
            PER_W: 0.2
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
        console.log(' this.data',  this.data)
        let len = this.data.length;
        let count = this.getCount(this.data);
        console.log(count)
        // PER_W
        for(let i=0;i<len;i++) {
            let item = this.data[i];
            console.log(item);
            this.drawArc(item);
        }
    }

    drawArc(item:any) {
        this.ctx.fillStyle= 'red';
        this.ctx.beginPath();
        this.ctx.arc(100, 100, item.value * this.config.PER_W, 0 , Math.PI * 2);
        this.ctx.fill();
    }

    getCount(list:any[]) {
        let count = 0;
        let len = list.length;
        for(let i=0;i<len;i++) {
            let item = list[i];
            count += item.value;
        }
        return count;
    }

    getPonit() {
        
    }

    render() {
        return  <><CanvasComponent/></>
    }
}
export default ForceDirectedComponent;