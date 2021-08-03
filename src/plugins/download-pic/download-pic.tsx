
import * as React from 'react';
import { useLocation } from 'react-router-dom'
let imgDownloadPng = require('./../../assets/imgs/download.svg');
import "./download-pic.scss";
class DownLoadPicture extends React.Component<any>  {
    MIME = 'image/png';
    route_param:string;

    constructor(props:any) {
        super(props);
        this.route_param  = this.props?.match?.params?.name
    }

    componentDidMount() {

    }

    getParams() {
        let routeMath = useLocation() ;
    }

    savePic() {
        let picDom:any = document.getElementById('canvas');
        if(!picDom) {
            console.info("无法下载，设置对应的DOM id");
            return;
        }
        let imgUrl = picDom.toDataURL(this.MIME);
        let _link = document.createElement('a');
        _link.style.display = 'none';
        _link.download = this.route_param || 'download';
        _link.href = imgUrl;
        _link.dataset.downloadurl = `${this.MIME}:${_link.download}:${_link.href}`;
        document.body.appendChild(_link);
        _link.click();
        document.body.removeChild(_link);
    }

    render() {
        return  <div className="download-png">
                <img className="icon" src={imgDownloadPng!.default} onClick={e => this.savePic()} alt="下载图片" title="下载示例"/>
            </div>
        }
    }

export default DownLoadPicture;