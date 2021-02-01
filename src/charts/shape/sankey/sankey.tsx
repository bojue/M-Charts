
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import { getColByRandom } from './../../provider/getColorByRandom';
import { sankeyData } from './../../mock';
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
        console.log(this.dataLines, this.data);
        let lines = this.dataLines;
        let len = lines.length;

        let firstData = [
            "SuperiorCard",
            "Vista",
            "ColonialVouice",
            "Distinguish"
        ]

        let len_first = firstData.length;
        for(let i = 0;i<len_first;i++) {
            let item = firstData[i];
            console.log(item);
            let arr = find(lines, 'source', item);
            console.log(item,"item,------>",arr)
        }

    }

    getColor() {
        return getColByRandom();
    }


    render() {
        return  <><CanvasComponent/></>
    }
}
export default SankeyComponent;