
import * as React from 'react';
import { Props } from 'react';
import "./charts-view.scss";
import PieComponent from '../../charts/shape/pie/pie'
import RouteBackComponent from '../../components/route-back/route-back';

class ChartsView extends React.Component<{}, object>  {
    render() {
        
        return  <div className="charts">
                    <RouteBackComponent/>
                    <PieComponent/>
                </div>
        }
    }

export default ChartsView;