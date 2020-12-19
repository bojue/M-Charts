
import * as React from 'react';
import "./github.scss";
let github = require('./../../assets/imgs/github.svg');

class GitHubComponent extends React.Component {
  
    render() {
        return  <a href="https://github.com/bojue/M-Charts" target="_blank" className="item github">
        <img src={github!.default} alt=""/>
    </a>
    }
}
export default GitHubComponent;