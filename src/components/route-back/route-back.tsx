
import * as React from 'react';
import "./route-back.scss";
let backIcon = require('./../../assets/imgs/return.svg');

class RouteBackComponent extends React.Component {
  
    render() {
        return <div className="back">
        <a href="#/charts"><img className="img" src={backIcon!.default} alt="返回" title='返回'/></a>
    </div>
    }
}
export default RouteBackComponent;