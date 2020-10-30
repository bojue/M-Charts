
import * as React from 'react';
import { Props } from 'react';
import "./charts-view.scss";

class ChartsView extends React.Component<{}, object>  {
    render() {
        return  <div className="charts">
                    <div className="name">效果:</div>
                    <canvas id="canvas" width="650" height="600"></canvas>
                </div>
        }
    }

export default ChartsView;