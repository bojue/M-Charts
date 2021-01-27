
import * as React from 'react';
import CanvasComponent from './../../comps/canvas';
import { mapData } from './../../mock';
import { getColByRandom } from './../../provider/getColorByRandom';
import "./map.scss";

class MapComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;
    config: any;
    data:any[];
    colsArr:any[];
    mapObj = {
        xOffset:0, 
        yOffset:0,
        scale:0,
        xMin:0,
        xMax:0,
        yMin:0,
        yMax:0
    }
    coordinatesByDrawGeomery:any[];
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initData();
        this.initCanvas();
        this.getMapConfig();
        this.drawInit();
    }

    
    initData() {
        this.data = mapData.features;
        this.config = {
            WIDTH:800,
            HEIGHT: 600
        }
    }

    getMapConfig() {
        let feature_len = this.data.length;
        let bounds = {
            xMax:0,
            xMin:0,
            yMax:0,
            yMin:0,
        }
        for(let i=0;i<feature_len;i++) {
            let feature_item = this.data[i];
            let coordinates = feature_item!.geometry!.coordinates;
            let coordinates_len = coordinates.length;
            for(let i=0;i<coordinates_len;i++) {
                let cordinate = coordinates[i];
                let len = cordinate!.length;
                for(let j=0;j<len;j++) {
                    let point:any[] =cordinate[j];
                    bounds.xMax = Math.max(bounds.xMax, point[0]) || point[0];
                    bounds.xMin = Math.min(bounds.xMin, point[0])  || point[0];
                    bounds.yMax = Math.max(bounds.yMax, point[1]) || point[1];
                    bounds.yMin = Math.min(bounds.yMin, point[1])  || point[1];
                }
    
            }
        }    
        let _x = Math.abs(bounds.xMax - bounds.xMin);
        let _y = Math.abs(bounds.yMax - bounds.yMin);
        let _xScale = this.config.WIDTH / _x;
        let _yScale = this.config.HEIGHT / _y;
        let _scale = Math.abs(Math.min(_xScale, _yScale)) || 1;
        let _xOffset = this.config.WIDTH / 2 - _x;
        let _yOffset = this.config.HEIGHT /2 - _y;
        this.mapObj = {
            scale:_scale,
            xOffset:_xOffset,
            yOffset:_yOffset,
            xMin:bounds.xMin,
            xMax:bounds.xMax,
            yMin:bounds.yMin,
            yMax:bounds.yMax
        }
    }

    getPoint(p:any[]) {
        let x = p[0];
        let y = p[1];
        let scale = 8 ||  this.mapObj.scale;
        let point = [
            (x - this.mapObj.xMin) * scale + this.mapObj.xOffset,
            (this.mapObj.yMax - y) * scale + this.mapObj.yOffset
        ];

        return point;
    }

    getCol() {
        return getColByRandom();
    }
    drawInit() {
        let feature_len = this.data.length;
        for(let i=0;i<feature_len;i++) {
            let feature_item = this.data[i];
            this.drawGeomery(feature_item)
        }
    }

    drawGeomery(obj:any) {
        let coordinates = obj!.geometry!.coordinates;
        let coordinates_len = coordinates.length;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.getCol();
        for(let i=0;i<coordinates_len;i++) {
            let cordinate = coordinates[i];
            let len = cordinate!.length;
            for(let j=0;j<len;j++) {
                let point:any[] =cordinate[j];
                if(j===0) {
                    let p = this.getPoint(point)
                    this.ctx.moveTo(p[0], p[1]);
                }else {
                    let p = this.getPoint(point)
                    this.ctx.lineTo(p[0], p[1]);
                }
            }
            this.ctx.stroke();
        }
        this.ctx.fill();
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.clientRect = this.canvas.getBoundingClientRect();
    }

    render() {
        return  <><CanvasComponent/></>
    }
}
export default MapComponent;