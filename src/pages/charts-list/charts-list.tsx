
import * as React from 'react';
import { Props } from 'react';
import "./charts-list.scss";
import { Link } from 'react-router-dom'
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
        const items = this.charts.map((item:any) => {
           return  <div className="charts-item">
               <Link to={{
                   pathname:'/detail',
                   search: `?type=${item.type}`
               }}><div className="name">饼图</div>
               <img src={imgPie && imgPie.default} alt=""/> </Link>
           </div>

        })
        return  <div className="list">
                {items}
            </div>
        }
    }

export default ChartsList;