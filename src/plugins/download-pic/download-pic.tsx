
import * as React from 'react';
let imgDownloadPng = require('./../../assets/imgs/download.svg');
import "./download-pic.scss";

class DownLoadPicture extends React.Component<{}, object>  {
    MIME = 'image/png';

    savePic() {
        let picDom:any = document.getElementById('canvas');
        if(!picDom) {
            console.info("无法下载，设置对应的DOM id");
            return;
        }
        let imgUrl = picDom.toDataURL(this.MIME);
        let _link = document.createElement('a');
        _link.style.display = 'none';
        _link.download = 'download';
        _link.href = imgUrl;
        _link.dataset.downloadurl = `${this.MIME}:${_link.download}:${_link.href}`;
        document.body.appendChild(_link);
        _link.click();
        document.body.removeChild(_link);
    }

    render() {
        return  <div className="download-png">
                <img className="icon" src={imgDownloadPng!.default} onClick={e => this.savePic()} alt="下载图片" title="下载"/>
            </div>
        }
    }

export default DownLoadPicture;