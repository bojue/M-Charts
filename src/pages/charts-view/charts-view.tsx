
import * as React from 'react';
import { Props } from 'react';
import "./charts-view.scss";
import PieComponent from './../../components/shape/pie/pie'
const icon = require('./../../assets/imgs/return.png');

class ChartsView extends React.Component<{}, object>  {
    render() {
        
        return  <div className="charts">
                    <div className="back">
                        <a href="#/"><img className="img" src={icon && icon.default} alt="返回"/></a>
                    </div>
                    <PieComponent/>
                </div>
        }
    }

export default ChartsView;