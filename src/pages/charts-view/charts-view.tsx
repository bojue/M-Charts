
import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import "./charts-view.scss";
import RouteBackComponent from '../../components/route-back/route-back';
import NoMatch  from './../../pages/error/404';

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
    RingComponent 
} from './../../charts/shape/index';

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
        let type = this.parms  && this.parms.type;
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
            default:
                chartComp = <NoMatch/>
                break;
        }
        return  <div className="charts">
                    <RouteBackComponent/>
                    {chartComp}
                </div>
        }
    }

export default ChartsView;