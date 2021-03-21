
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import { sankeyData } from './../../mock/mock-model';
import { CONFIG } from './../../config/color_def';
const groupBy = require('loadsh/groupBy');
const find = require('loadsh/find');
const cloneDeep = require('loadsh/cloneDeep');
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
            H: 450, //高度
            PER_W: 20,
            SOURCE_H:100, // source的高度
            START_X: 50, // 起点X
            START_Y: 495, // 起点Y
            Label_PADDING: 5, // 间距 
            Label_PADDING_MIN: 1, // 间距 
            R:4 //半径
        }
        this.data = sankeyData.data;
        this.dataLines = sankeyData.links;
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
        this.ctx.font = '12px Arial';
    }

    drawInit() {
        let dataObj = this.getData();
        this.drawRect(dataObj.rootData);
        this.drawRect(dataObj.nextData);
        this.drawRect(dataObj.data);
        this.drawLines(dataObj.rootData, dataObj.nextData, dataObj.groupSource);
        this.drawLines(dataObj.nextData, dataObj.data, dataObj.groupSource, true)
    }

    drawLines(source:any[], target:any[], groupSource:any[], targetBool:boolean = false) {
        let len = source.length;
        for(let i=0;i<len;i++) {
            let item = source[i];
            let sourcekey = item.source;
            let sourceObjs = groupSource[sourcekey];
            for(let index in sourceObjs) {
                let tarObj = targetBool ?
                    find(target, {target:sourceObjs[index].target}): 
                    find(target, {source:sourceObjs[index].target});
                if(tarObj && item) {
                    let col = this.getCol();
                    this.drawLine(item.x + this.config.PER_W, item.y + item.h /2, tarObj.x , tarObj.y + tarObj.h / 2, col );
                }
            }

        }
    }

    drawLine(x1:number, y1:number, x2:number, y2:number, color:string) {
        this.ctx.beginPath();
        let mX = (x1 + x2) /2;
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(x1, y1);
        this.ctx.bezierCurveTo(mX, y1, mX ,y2, x2, y2);
        this.ctx.stroke();   
    }

    drawRect(list:any[]) {
        let len = list.length;
        for(let i=0;i<len;i++) {
            let item = list[i];
            this.ctx.beginPath();
            this.ctx.fillStyle = this.getCol();
            this.ctx.fillRect(item.x, item.y, this.config.PER_W, item.h);
            this.ctx.fill();
        }
    }

    getData() {
        let catchObj = this.getCatchKeys();
        let groupSource = catchObj.groupSource;
        let catchRootData = catchObj.catchRootData;
        let catchNextData = catchObj.catchNextData;
        let catchData = catchObj.catchData;

        let _catchRootDataCount = this.getListCount(catchRootData);
        let _catchNextDataCount = this.getListCount(catchNextData);
        let _catchDataCount = this.getListCount(catchData);
        let catchRootDataCoordinate = this.getCoordinateByData(catchRootData, _catchRootDataCount)
        let catchNextDataCoordinate = this.getCoordinateByData(catchNextData, _catchNextDataCount, this.config.START_X + (this.config.W / 6 * 2.5));
        let catchDataCoordinate = this.getCoordinateByData(catchData, _catchDataCount, this.config.START_X + this.config.W / 6 * 5, this.config.H, this.config.Label_PADDING_MIN);
        return {
            rootData:catchRootDataCoordinate,
            nextData:catchNextDataCoordinate,
            data:catchDataCoordinate,
            groupSource:groupSource
        }

    }

    getCoordinateByData(list:any[], count:number, startX:number = this.config.START_X, h:number =  this.config.SOURCE_H, padding = this.config.Label_PADDING ) {
        let len = list.length;
        let _perY = (h- padding * (len -1))/ count;
        let _y = this.config.H / 2 + (h+ padding * (len -1) )/ 2;
        for(let i=0;i<len;i++) {
            let item = list[i];
            item.h = _perY * item.value;
            item.x = startX;
            item.y = _y - item.h;
            _y = item.y - padding
        }
        return list;
    }

    getCatchKeys() {
        let data = this.dataLines;
        let len = data.length;
        let groupSource = groupBy(data, 'source'); // 根据source分类
        let _catchSourceKeys:any = new Object(); // 缓存来源数据keys
        let _catchTargetKeys:any = new Object(); // 缓存目标数据keys
        let _catchRootSourceKey:any = new Object(); // 缓存根来源数据keys
        let _catchNextSourceKey:any = new Object(); // 缓存二级来源数据keys
        let catchRootData = [];
        let catchNextData = [];
        let catchData = [];
        for(let i=0;i<len ;i++) {
            let item = data[i];
            _catchSourceKeys[item.source] = item.source;
            _catchTargetKeys[item.target] = item;
        }

        for(let key in _catchSourceKeys) {
            if(_catchTargetKeys[key]) {
                _catchNextSourceKey[key] = _catchSourceKeys[key];
            }else {
                _catchRootSourceKey[key] = _catchSourceKeys[key];
            }
        }

        for(let key in _catchRootSourceKey) {
            catchRootData.push(find(data, {'source': key}));
        }

        for(let key in _catchNextSourceKey) {
            catchNextData.push(find(data, {'source': key}));
        }
        for(let key in data) {
            let item = data[key];
            let sourceKey = item.target;
    
            if(!_catchSourceKeys[sourceKey]) {
                catchData.push(item);
            }
        }

        return {
            groupSource:groupSource,
            catchRootData:catchRootData,
            catchNextData:catchNextData,
            catchData:cloneDeep(catchData)
        }
    }

    drawData(list:any[],_x:number, padding:number, textState = 'source', font = '12px Arial') {
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
            this.ctx.font = font;
            this.ctx.rect(_x, _y , _w, _h);
            this.drawText(item[textState], _x + _w + this.config.Label_PADDING * 2, _y + _h /2);
            item.sx = _x + _w;
            item.sy = _y;
            item.w = _w;
            item.h = _h;
            this.ctx.fill();  
            currY = _y;
        }
    }

    getCol() {
        let cols: any[] = CONFIG.APP_COLS;
        let index = parseInt((Math.random() * cols.length ) + '', 10)
        return cols[index]
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