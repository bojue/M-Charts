
import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import "./charts-view.scss";
import RouteBackComponent from '../../components/route-back/route-back';
import NoMatchChart  from '../404/chart/no-match-chart';

import { 
    LineComponent, 
    PieComponent, 
    ScatterComponent, 
    GuageComponent,
    FunnelComponent,
    BarComponent,
    RadarComponent,
    ParallelComponent,
    TreeComponent,
    CandlestickComponent,
    AreaStackedComponent,
    HeatmapCartesianComponent,
    CalendarChartsComponent,
    RingComponent,
    BarNagativeComponent,
    HexagonComponent,
    SunburstComponent, 
    BoxPlotComponent,
    PolarAreaComponent,
    RadialBarComponent,
    ArcDiagramComponent,
    LiquidComponent,
    CurveComponent,
    MapComponent,
    LiquidCustomComponent,
    GridLightComponent,
    SankeyComponent,
    GraphCircularLayoutComponent,
    SprialBarComponent,
    ForceDirectedComponent,
    SerpentineTimelineComponent
} from './../../charts/shape';

import {
    DownLoadPicture
} from './../../plugins/index';
import RoseRangeComponent from '../../charts/shape/rose-range/rose-range';
import DataShow from '../../charts/comps/data-show/data-show';
import {observable} from 'mobx';
import { updateChartDataCreater } from '../../redux/actions';
import { Provider } from 'react-redux';
import store from '../../redux/store';

interface MProps {}
interface MState {}
type ChartsProps = MProps & RouteComponentProps;
class ChartsView extends React.Component<ChartsProps, MState> {
    parms:any;
    observableData = observable({
        data:{
            tetxt:1
        }
    })
    constructor(props:ChartsProps) {
        super(props);
        this.parms = this.props.match.params;
    }
    componentDidMount() {
     
    }
    render() {
        let chartComp ;
        let type = this.parms!.type;
        switch(type) {
            case 'pie':
                chartComp = <PieComponent/>
                break;
            case 'line':
                chartComp = <LineComponent/>
                break;
            case 'scatter':
                chartComp = <ScatterComponent/>
                break;
            case 'guage':
                chartComp = <GuageComponent/>
                break;  
            case 'funnel':
                chartComp = <FunnelComponent/>
                break;
            case 'bar':
                chartComp = <BarComponent/>
                break;   
            case 'radar':
                chartComp = <RadarComponent/>
                break;    
            case 'parallel':
                chartComp = <ParallelComponent/> 
                break;
            case 'tree':
                chartComp = <TreeComponent/> 
                break;
            case 'candlestick':
                chartComp = <CandlestickComponent/> 
                break;
            case 'areaStartk':
                chartComp = <AreaStackedComponent/>
                break;
            case 'heatmapCartesian':
                chartComp = <HeatmapCartesianComponent/>
                break;    
            case 'calendarCharts':
                chartComp = <CalendarChartsComponent/>
                break;    
            case 'ring':
                chartComp = <RingComponent/>
                break;
            case 'barNegative':
                chartComp = <BarNagativeComponent/>
                break;
            case 'hexagon':
                chartComp = <HexagonComponent/>    
                break;
            case 'sunburse':
                chartComp = <SunburstComponent/>
                break;
            case 'boxplot': 
                chartComp = <BoxPlotComponent/>
                break;
            case 'polarArea':
                chartComp = <PolarAreaComponent/>
                break;
            case 'radialBar':
                chartComp = <RadialBarComponent/>
                break;
            case 'arcDiagram':
                chartComp = <ArcDiagramComponent/>
                break;
            case 'liquid':
                chartComp = <LiquidComponent/>
                break;
            case 'liquidCustom':
                chartComp = <LiquidCustomComponent/>
                break;
            case 'curve':
                chartComp = <CurveComponent/>
                break;
            case 'map':
                chartComp = <MapComponent/>
                break;
            case 'streamgraph': 
                chartComp =<GridLightComponent/>
                break;
            case 'sankey': 
                chartComp =<SankeyComponent/>
                break;
            case 'graph-circular-layout': 
                chartComp =<GraphCircularLayoutComponent/>
                break;
            case 'sprial-bar':
                chartComp = <SprialBarComponent/>
                break;
            case 'serpentine-timeline':
                chartComp = <SerpentineTimelineComponent/>
                break;
            // case 'force-directed':
            //     chartComp = <ForceDirectedComponent/>
            //     break;
            case 'rose-range':
                chartComp = <RoseRangeComponent/>
                break;
            default:
                chartComp = <NoMatchChart/>
                break;
        }
        return  <div className="chartsView">
                    <Provider store={store}>
                        {/* 1.chart组件 */}
                        <>{chartComp}</> 
                        {/* 2.下载组件 */}
                        <span className="customEvent">
                            <DownLoadPicture/>
                            <RouteBackComponent/>
                        </span>
              
                        {/* 3.示例数据组件 */}
                        {/* <DataShow/> */}
                 
                        </Provider>
                </div>
        }
    }

export default ChartsView;