
import * as React from 'react';
import { Props } from 'react';
import { RouteProps } from 'react-router';
import { RouteComponentProps } from "react-router-dom";
import "./charts-view.scss";
import { LineComponent, PieComponent } from './../../charts/shape/index';
import RouteBackComponent from '../../components/route-back/route-back';
import NoMatch  from './../../pages/error/404';
import ScatterComponent from '../../charts/shape/scatter/scatter';
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