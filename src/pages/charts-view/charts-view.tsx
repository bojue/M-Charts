
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
    CurveComponent
} from './../../charts/shape/index';

import {
    DownLoadPicture
} from './../../plugins/index';


interface MProps {}
interface MState {}
type ChartsProps = MProps & RouteComponentProps;
class ChartsView extends React.Component<ChartsProps, MState> {
    parms:any;
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
            case 'curve':
                chartComp = <CurveComponent/>
                break;
            default:
                chartComp = <NoMatchChart/>
                break;
        }
        return  <div className="charts">
                    <RouteBackComponent/>
                    <DownLoadPicture/>
                    {chartComp}
                </div>
        }
    }

export default ChartsView;