
import * as React from 'react';
import "./charts-list.scss";
import { Link } from 'react-router-dom'

let imgEventIcon = require('./../../assets/imgs/event.svg');
let imgPie = require('./../../assets/imgs/shape/pie.png');
let imgLine = require('./../../assets/imgs/shape/line.png');
let imgScatter = require('./../../assets/imgs/shape/scatter.png');
let imgGauge = require('./../../assets/imgs/shape/guage.png');
let imgFunnel = require('./../../assets/imgs/shape/funnel.png');
let imgBar = require('./../../assets/imgs/shape/bar.png');
let imgRadar = require('./../../assets/imgs/shape/radar.png');
let imgParallel = require('./../../assets/imgs/shape/parallel.png');
let imgTree = require('./../../assets/imgs/shape/tree.png');
let imgCandlestick = require('./../../assets/imgs/shape/candlestick.png');
let imgAreaStartk = require('./../../assets/imgs/shape/areaStartk.png');
let imgHeatmapCartesian = require('./../../assets/imgs/shape/heatmap-cartesian.png');
let imgCalendarCharts = require('./../../assets/imgs/shape/calendarCharts.png');
let imgRingCharts = require('./../../assets/imgs/shape/ring.png');
let imgBarNegative = require('./../../assets/imgs/shape/bar-negative.png');
let imgHexagon = require('./../../assets/imgs/shape/hexagon.png');
let imgSunburst = require('./../../assets/imgs/shape/sunburst.png');
let imgBoxPlot = require('./../../assets/imgs/shape/boxplot.png');
let imgPolarArea = require('./../../assets/imgs/shape/polar-area.png');
let imgRedialBar = require('./../../assets/imgs/shape/radialBar.png');
let imgArcDiagram = require('./../../assets/imgs/shape/arcDiagram.png');
let imgLiquid = require('./../../assets/imgs/shape/liquid.png');
let imgCurve = require('./../../assets/imgs/shape/curve.png');
let imgMap = require('./../../assets/imgs/shape/map.png');
let imgLiquidCustom = require('./../../assets/imgs/shape/liquidCustom.png');
let imgStreamgraph = require('./../../assets/imgs/shape/streamgraph.png');
let imgSankey = require('./../../assets/imgs/shape/sankey.png');
let imgGraphCircularLayout = require('./../../assets/imgs/shape/graph-circular-layout.png')
let imgSprialBar = require('./../../assets/imgs/shape/sprial-bar.png')
let imgRoseRange = require('./../../assets/imgs/shape/rose-range.png')
const imgRadiusAxis = require('./../../assets/imgs/shape/radius-axis.png')
const imgHeatmap = require('./../../assets/imgs/shape/heatmap.png')
interface Charts {
    name: string, // 组件名称
    type: string, // 组件类型
    thumbnail: any, // 缩略图
    eventBool?:boolean // 支持鼠标事件
}

interface propsType {

}
class ChartsList extends React.Component<propsType, object>  {
    constructor(props:propsType) {
        super(props)
        document.title = "M-Charts"
    }
    charts:Charts[] =  [
        {
            name:"折线",
            type:'line',
            thumbnail: imgLine
        },
        {
            name:"曲线图",
            type:'curve',
            thumbnail: imgCurve
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
            name:'环图',
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
            name:'蜂窝矩阵',
            type:'hexagon',
            thumbnail: imgHexagon
        },
        {
            name:'日历坐标系',
            type:'calendarCharts',
            thumbnail: imgCalendarCharts
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
        },
        {            
            name:'玉珏图',
            type:'radialBar',
            thumbnail: imgRedialBar
        },
        {            
            name:'基本弧线图',
            type:'arcDiagram',
            thumbnail: imgArcDiagram
        },
        {
            name:"流动图",
            type:'liquid',
            thumbnail: imgLiquid
        },
        {
            name:"自定义流动图",
            type:"liquidCustom",   
            thumbnail: imgLiquidCustom
        },
        {
            name:"地图",
            type:'map',
            thumbnail: imgMap
        },    
        {
            name:'热力图',
            type:'heatmapCartesian',
            thumbnail: imgHeatmapCartesian
        },
        {
            name:'极坐标下的半径轴',
            type:"radius-axis",
            thumbnail: imgRadiusAxis
        }, 
        {
            name: '玫瑰图-限定角度范围',
            type: 'rose-range',
            thumbnail:  imgRoseRange 
        },
        {
            name:'螺旋条状图',
            type:'sprial-bar',
            thumbnail: imgSprialBar
        },
        {
            name:'河流图',
            type:"streamgraph",
            thumbnail: imgStreamgraph
        },
        {
            name:'桑基图',
            type:"sankey",
            thumbnail: imgSankey
        },
        {
            name:'环形关系图',
            type:"graph-circular-layout",
            thumbnail: imgGraphCircularLayout
        }, 
        {
            name:'热力图',
            type:'heatmap',
            thumbnail: imgHeatmap
        }
        // {
        //     name: '时间轴',
        //     type: 'serpentine-timeline',
        //     thumbnail: imgGraphCircularLayout
        // },

    ];
    render() {
        const items = this.charts.map((item:any, index:number) => {
           return  <div className="charts-item">
               <Link to={`/detail/${item.type}/${item?.name}`}>
                <div className="lab">
                    <span className="index">{index + 1}.</span>
                    <span className="name" title={item?.name}>{item.name}</span>
                </div>
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