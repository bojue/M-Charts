import * as React from 'react';
import * as ReactDOM from "react-dom";
import {HashRouter  as Router, Route, Switch, StaticRouter, Link} from 'react-router-dom';

// img 
import ChartsList from './pages/charts-list/charts-list';
import ChartsView from './pages/charts-view/charts-view';
import NoMatch  from './pages/404/page/404';
import GitHubComponent from './components/github/github'
const icon = require('./assets/imgs/icon.png');
// css
import './style.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/home/Home';
let App = function() {
    return <Router >
        <div className="nav">
            <a href="#/" className="item">
                <img src={icon!.default} alt=""/>
                
            </a>
            <a href="#/charts" className="item tit">
                <span>M-Charts</span>
            </a>
            <GitHubComponent/>
        </div>
        <Switch>
            <Route exact path="/" component={ Home }/>
            <Route path="/charts" component={ ChartsList }/>
            <Route path="/detail/:type/:name" component={ ChartsView }/>
            <Route>
                <NoMatch/>
            </Route>
        </Switch>
    </Router>
}
ReactDOM.render(
    <App/>,
document.getElementById('charts'));