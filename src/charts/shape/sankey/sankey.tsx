
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import { getColByRandom } from './../../provider/getColorByRandom';
import { sankeyData } from './../../mock';
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
            H: 405, //高度
            START_X: 50, // 起点X
            START_Y: 40, // 起点Y
            Label_line: 5,
            Label_X_PADDING: 15, 
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
    }

    drawInit( ) {
        let lines = this.dataLines;
        let group2 = groupBy(this.data, 'source');
        let group2Data = [];
        let group1Data = []; // 第二层
        let group0Data = []; // 第一层
        for(let key in group2) {
            group2Data.push(find(this.data, {source: key}))
        }
        console.log(group2Data)
        

        let len_group2 = group2Data.length;
        for(let i=0;i<len_group2;i++) {
            let item = group2Data[i];
            console.log(item);
            let findBool = find(group2Data, {'source': item.target});
            if(findBool) {
                group1Data.push(item)
            }else {
                group0Data.push(item);
            }
        }

        console.log(group0Data)
        console.log(group1Data)
    }

    getColor() {
        return getColByRandom();
    }


    render() {
        return  <><CanvasComponent/></>
    }
}
export default SankeyComponent;