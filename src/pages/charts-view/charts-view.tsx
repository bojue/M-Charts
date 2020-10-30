
import * as React from 'react';
import { Props } from 'react';
import "./charts-view.scss";
import PieComponent from '../../components/shape/pie/pie';

class ChartsView extends React.Component<{}, object>  {
    render() {
        return  <div className="charts">
                    <div className="name">效果:</div>
                    <PieComponent></PieComponent>
                </div>
        }
    }

export default ChartsView;