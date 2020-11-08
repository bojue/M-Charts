
import * as React from 'react';
import "./charts-list.scss";
import { Link } from 'react-router-dom'
let imgPie = require('./../../assets/imgs/shape/pie.png');
let imgLine = require('./../../assets/imgs/shape/line.png');
let imgScatter = require('./../../assets/imgs/shape/scatter.png');
let imgGauge = require('./../../assets/imgs/shape/gauge.png');

class ChartsList extends React.Component<{}, object>  {
    charts:any[] = [
        {
            name:"饼图",
            type:'pie',
            thumbnail: imgPie
        },
        {
            name:"折线",
            type:'line',
            thumbnail: imgLine
        },
        {
            name:"散点图",
            type:'scatter',
            thumbnail: imgScatter
        },
        {
            name:"仪表盘",
            type:'guage',
            thumbnail: imgGauge
        }
    ]
    render() {
        const items = this.charts.map((item:any) => {
           return  <div className="charts-item">
               <Link to={`/detail/${item.type}`}><div className="name">{item.name}</div>
               <img src={item.thumbnail && item.thumbnail.default} alt=""/> </Link>
           </div>

        })
        return  <div className="list">
                {items}
            </div>
        }
    }

export default ChartsList;