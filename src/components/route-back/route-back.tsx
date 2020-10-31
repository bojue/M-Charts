
import * as React from 'react';
import { Props } from 'react';
import "./route-back.scss";
let backIcon = require('./../../assets/imgs/return.png');

class RouteBackComponent extends React.Component {
  
    render() {
        return <div className="back">
        <a href="#/"><img className="img" src={backIcon && backIcon.default} alt="返回" title='返回'/></a>
    </div>
    }
}
export default RouteBackComponent;