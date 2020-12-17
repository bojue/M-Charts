
import * as React from 'react';
import "./charts-list.scss";
import { Link } from 'react-router-dom'
let imgPie = require('./../../assets/imgs/shape/pie.png');
let imgLine = require('./../../assets/imgs/shape/line.png');
let imgScatter = require('./../../assets/imgs/shape/scatter.png');
let imgGauge = require('./../../assets/imgs/shape/gauge.png');
let imgFunnel = require('./../../assets/imgs/shape/funnel.png');
let imgBar = require('./../../assets/imgs/shape/bar.png');
let imgRadar = require('./../../assets/imgs/shape/radar.png');
let imgParallel = require('./../../assets/imgs/shape/parallel.png');
let imgTree = require('./../../assets/imgs/shape/tree.png');
let imgCandlestick = require('./../../assets/imgs/shape/candlestick.png');
let imgAreaStartk = require('./../../assets/imgs/shape/area-stacked.png');
let imgHeatmapCartesian = require('./../../assets/imgs/shape/heatmap-cartesian.png');
let imgCalendarCharts = require('./../../assets/imgs/shape/calendarCharts.png');
let imgRingCharts = require('./../../assets/imgs/shape/ring.png');

class ChartsList extends React.Component<{}, object>  {
    charts:any[] = [
        {
            name:"折线",
            type:'line',
            thumbnail: imgLine
        },
        {
            name:"散点图",
            type:'scatter',
            thumbnail: imgScatter
        },
        {
            name:"树图",
            type:'tree',
            thumbnail: imgTree
        },

        {
            name:"漏斗图",
            type:'funnel',
            thumbnail: imgFunnel
        },    
        {
            name:"面积折叠图",
            type:'areaStartk',
            thumbnail: imgAreaStartk
        }, 
        {
            name:"柱状图",
            type:'bar',
            thumbnail: imgBar
        }, 
        {
            name:"仪表盘",
            type:'guage',
            thumbnail: imgGauge
        }, 
        {
            name:"雷达图",
            type:'radar',
            thumbnail: imgRadar
        }, 
        {
            name:"饼图",
            type:'pie',
            thumbnail: imgPie
        },
        {
            name:"平行坐标系",
            type:'parallel',
            thumbnail: imgParallel
        },  
        {
            name:"K线图",
            type:'candlestick',
            thumbnail: imgCandlestick
        },
        {
            name:'热力图',
            type:'heatmapCartesian',
            thumbnail: imgHeatmapCartesian
        },
        {
            name:'日历坐标系',
            type:'calendarCharts',
            thumbnail: imgCalendarCharts
        },
        {
            name:'24色环',
            type:'ring',
            thumbnail: imgRingCharts          
        }
       
    ]
    render() {
        const items = this.charts.map((item:any) => {
           return  <div className="charts-item">
               <Link to={`/detail/${item.type}`}><div className="name">{item.name}</div>
               <img src={item.thumbnail && item.thumbnail.default} alt=""/> </Link>
           </div>

        })
        return  <div className="list">
                {items}
            </div>
        }
    }

export default ChartsList;