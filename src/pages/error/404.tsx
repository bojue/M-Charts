
import * as React from 'react';
import './404.scss';
const noMath = require('./../../assets/imgs/404.png');
class NoMatch  extends React.Component<{}, object>  {
    render() {
    return  <div className="error">
            <img src={noMath && noMath.default} alt=""/>
        </div>
    }
}

export default NoMatch;