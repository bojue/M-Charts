import * as React from 'react';
import * as ReactDOM from "react-dom";
import {HashRouter  as Router, Route, Switch, StaticRouter, Link} from 'react-router-dom'
import './style.scss';
const icon = require('./assets/imgs/icon.png');
import Home from './pages/home/Home';
import ChartsList from './pages/charts-list/charts-list';
import ChartsView from './pages/charts-view/charts-view';
import NoMatch  from './pages/error/404';
import GitHubComponent from './components/github/github';


let App = function() {
    return <Router >
        <div className="nav">
            <a href="#/" className="item">
                <img src={icon && icon.default} alt=""/>
                
            </a>
            <a href="#/charts" className="item tit">
                <span>M-Charts</span>
            </a>
            <GitHubComponent/>

        </div>
        <Switch>
            <Route exact path="/" component={ChartsList}/>
            <Route path="/charts" component={ChartsList}/>
            <Route path="/detail/:type" component={ChartsView}/>
            <Route>
                <NoMatch/>
            </Route>
        </Switch>
    </Router>
}
ReactDOM.render(
    <App/>,
document.getElementById('charts'));