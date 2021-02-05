
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import { sankeyData } from './../../mock';
import { CONFIG } from './../../config/color_def';
const groupBy = require('loadsh/groupBy');
const find = require('loadsh/find');
import "./sankey.scss";
class SankeyComponent extends React.Component {
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
        this.config = {
            W: 500, //长度
            H: 490, //高度
            START_X: 50, // 起点X
            START_Y: 495, // 起点Y
            Label_X_PADDING: 2, // 间距 
            R:4 //半径
        }
        this.data = sankeyData.node;
        this.dataLines = sankeyData.link;
    }

    componentWillUnmount() {
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = "middle";
        this.ctx.font = '6px Arial';
    }

    drawInit( ) {
        let group2 = groupBy(this.data, 'source');
        let groupGroupCatch= []
        let group2Data = []; // 第三层
        let group1Data = []; // 第二层
        let group0Data = []; // 第一层
        for(let key in group2) {
            groupGroupCatch.push(find(this.data, {source: key}))
        }
        console.log(groupGroupCatch)
        let len = this.data.length;
        for(let i=0;i<len;i++) {
            let item = this.data[i];
            let bool = find(this.data , {
                name:item.name
            })
            if(!bool) {
                group2Data.push(item);
            }
        }
        let len_group2 = groupGroupCatch.length;
        for(let i=0;i<len_group2;i++) {
            let item = groupGroupCatch[i];
            console.log(item);
            let findBool = find(groupGroupCatch, {'source': item.target});
            if(findBool) {
                group0Data.push(item)
            }else {
                group1Data.push(item);
            }
        }

        this.drawData(group0Data, this.config.START_X, this.config.Label_X_PADDING * 2);
        this.drawData(group1Data, this.config.START_X + this.config.W /3, this.config.Label_X_PADDING * 2);
        this.drawData(group2Data, this.config.START_X +this.config.W /3 * 2 , this.config.Label_X_PADDING);
        console.log(group0Data, group1Data, group2Data)
        this.drawLines(group0Data, group1Data);
    }

    drawLines(source:any[], target:any[]) {
        let len = source.length;
        for(let i=0;i<len;i++) {
            let item = source[i];
            console.log(item);
        }
    }

    drawData(list:any[],_x:number, padding:number) {
        let len = list.length;
        let count = this.getListCount(list);
        let startY = this.config.START_Y;
        let _perY = this.config.H / count / 2;
        let _w = 25;
        let currY = startY ;
        for(let i=0;i<len;i++) {
            let item = list[i];
            let _h = item.value * _perY;
            let _y = currY - _h - padding;
            this.ctx.beginPath();
            this.ctx.fillStyle = this.getCurrentBg(item);
            this.ctx.lineWidth = 1;
            this.ctx.rect(_x, _y , _w, _h);
            this.drawText(item.target, _x + _w + this.config.Label_X_PADDING * 2, _y + _h /2);
            item.sx = _x + _w;
            item.sy = _y;
            item.w = _w;
            item.h = _h;

            this.ctx.fill();  
            currY = _y;
        }
    }

    drawText(name:any, x:number, y:number) {
        this.ctx.fillText(name, x, y)
    }

    getCurrentBg(item:any) {
        let obj = find(this.dataLines, {
            name:item.source
        })
        if(obj) {
            return obj!.itemStyle!.borderColor;
        }else {
            return '#cccccc';
        }
    }

    getListCount(list:any) {
        let count = 0;
        let len = list.length;
        for(let i=0;i<len;i++) {
            let item = list[i];
            count += item.value;
        }

        return count;
    }

    render() {
        return  <><CanvasComponent/></>
    }
}
export default SankeyComponent;