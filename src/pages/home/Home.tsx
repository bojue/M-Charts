
import * as React from 'react';
import icon_github from './../../assets/imgs/icon_github.svg'
import icon_example from './../../assets/imgs/icon_example.svg'
import { Link} from 'react-router-dom';

import './Home.scss'

function Home() {
    const toGithub = () => {
        const url = 'https://github.com/bojue/M-Charts'
        window.open(url)
    }

    const toShapeList = () => {
        const routeUrl ="/charts" 
        
    }

    return (
        <div className='home'>
            <div className="title">
                M-Chart
            </div>
            <div className="title-sub">
                基于Canvas实现的可视化图表库
            </div>
            <div className="panel">
                <div className="btn active" onClick={toGithub} title="跳转到github仓库地址">
                    <img className="icon" src={icon_github} alt="" /> <span className="lab">代码仓库</span>     
                </div>
                <Link to="charts">
                    <div className="btn" onClick={toShapeList}>
                        <img className="icon" src={icon_example} alt="" /> <span className="lab">所有示例</span>
                    </div>
                </Link>
            </div>
        </div>)

}

export default Home;