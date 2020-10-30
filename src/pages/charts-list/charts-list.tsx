
import * as React from 'react';
import { Props } from 'react';
import "./charts-list.scss";
let imgPie = require('./../../assets/imgs/shape/pie.png');

class ChartsList extends React.Component<{}, object>  {
    render() {
        return  <div className="list">
             <a href="#/detail">
                <div className="charts-item">
                            <div className="name">饼图</div>
                            <img src={imgPie && imgPie.default} alt=""/>
                        </div>
                </a>
            </div>
        }
    }

export default ChartsList;