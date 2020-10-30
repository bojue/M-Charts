import * as React from 'react';
import * as ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch, StaticRouter, Link} from 'react-router-dom'
import './style.scss';
const icon = require('./assets/imgs/icon.png');

import ChartsList from './pages/charts-list/charts-list';
import ChartsView from './pages/charts-view/charts-view';
import NoMatch  from './pages/error/404';
const github = require('./assets/imgs/github.png');

let App = function() {
    return <Router>
    <div className="nav">
        <StaticRouter basename="/">
            <a href="/" className="item">
                <img src={icon && icon.default} alt=""/>
                
            </a>
            <a href="/" className="item tit">
                <span>M-Charts</span>
            </a>
        </StaticRouter>
        <a href="https://bojue.github.io/M-Charts/" className="item github">
            <img src={github && github.default} alt=""/>
        </a>
    </div>
    <Switch>
        <Route exact path="/">
            <ChartsList/>
        </Route>
        <Route path="/detail">
            <ChartsView/>
        </Route>
        <Route>
            <NoMatch/>
        </Route>
    </Switch>
</Router>
}
ReactDOM.render(
    <App/>,
document.getElementById('charts'));