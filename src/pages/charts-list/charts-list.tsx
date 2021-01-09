
import * as React from 'react';
import "./charts-list.scss";
import { Link } from 'react-router-dom'

let imgEventIcon = require('./../../assets/imgs/event.svg');
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
let imgBarNegative = require('./../../assets/imgs/shape/bar-negative.png');
let imgHexagon = require('./../../assets/imgs/shape/hexagon.png');
let imgSunburst = require('./../../assets/imgs/shape/sunburst.png');
let imgBoxPlot = require('./../../assets/imgs/shape/boxplot.png');
let imgPolarArea = require('./../../assets/imgs/shape/polar-area.png');
interface Charts {
    name: string, // 组件名称
    type: string, // 组件类型
    thumbnail: any, // 缩略图
    eventBool?:boolean // 支持鼠标事件
}
class ChartsList extends React.Component<{}, object>  {
    charts:Charts[] = [
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
            name:'24色环',
            type:'ring',
            thumbnail: imgRingCharts          
        },
        {
            name:'交错正负轴标签',
            type:'barNegative',
            thumbnail: imgBarNegative          
        }, 
        {
            name:"雷达图",
            type:'radar',
            thumbnail: imgRadar
        }, 
        {
            name:"饼图",
            type:'pie',
            thumbnail: imgPie,
            eventBool:true // 支持事件
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
            name:'六边形矩阵',
            type:'hexagon',
            thumbnail: imgHexagon
        },
        {            
            name:'盒须图',
            type:'boxplot',
            thumbnail: imgBoxPlot
        },
        {            
            name:'旭日图',
            type:'sunburse',
            thumbnail: imgSunburst
        },
        {            
            name:'极地图',
            type:'polarArea',
            thumbnail: imgPolarArea
        }
    ]
    render() {
        const items = this.charts.map((item:any) => {
           return  <div className="charts-item">
               <Link to={`/detail/${item.type}`}>
                <div className="name">{item.name}</div>
                {
                    item.eventBool
                    && <img className="icon" src={imgEventIcon!.default} alt="支持事件" title="支持事件"/>
                }

                <img className="thumbnail" 
                    src={item.thumbnail!.default} 
                    alt={item.name} title={item.name}/> </Link>
           </div>

        })
        return  <div className="list">
                {items}
            </div>
        }
    }

export default ChartsList;