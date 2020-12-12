
import * as React from 'react';
import { init, getEventCoordinates } from '../provider/canvas';
import "./canvas.scss";


class CanvasComponent extends React.Component {
    canvas:any;
    ctx:any;
    clientRect:any;

    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
        this.initCanvas();
    }

    initCanvas() {
        this.canvas = document.getElementById('canvas');
        init(this.canvas);
    }

    render() {
        return  <div className="charts">
                <canvas id="canvas"  width="600" height="500"></canvas>
            </div>
    }
}
export default CanvasComponent;