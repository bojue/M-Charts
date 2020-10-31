
import * as React from 'react';
import { Props } from 'react';
import "./charts-list.scss";
let imgPie = require('./../../assets/imgs/shape/pie.png');

class ChartsList extends React.Component<{}, object>  {
    charts:any[] = [
        {
            name:"饼图",
            type:'pie',
            thumbnail: imgPie && imgPie.default,
        },
    ]
    render() {
        const items = this.charts.map((item) => {
           return  <a href="#/detail" key={item.key}>
            <div className="charts-item">
                <div className="name">饼图</div>
                <img src={imgPie && imgPie.default} alt=""/>
            </div>
        </a>
        })
        return  <div className="list">
                {items}
            </div>
        }
    }

export default ChartsList;