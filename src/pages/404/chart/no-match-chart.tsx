
import * as React from 'react';
import './no-match-chart.scss';
const noMath = require('./../../../assets/imgs/404_chart.png');

class NoMatchChart  extends React.Component<{}, object>  {
    render() {
    return  <div className="error-chart">
            <img src={noMath && noMath.default} alt="没有匹配到相关组件" title="没有匹配到相关组件"/>
        </div>
    }
}

export default NoMatchChart;