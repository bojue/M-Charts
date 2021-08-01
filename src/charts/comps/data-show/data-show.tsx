
import * as React from 'react';
import store from '../../../redux/store';
import "./data-show.scss";


class DataShow extends React.Component {
    data = {}
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return   <div className="dataShow">
            <div className="title">
                示例数据
            </div>
            <div className="content">
           {
              JSON.stringify(this.data)
           }
             </div>
        </div>
    }

}


export default DataShow