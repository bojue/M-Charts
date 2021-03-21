import {
    lineJson
} from './../mock/mock-json'

const getMockJsonUrlByType = function(type:string) {
    return  _getMockJsonURL(type);

    // let fetchObj = fetch(dataUrl)
    //     .then(res => res.json())
    // return fetchObj;
}

const _getMockJsonURL = function(type:string):any {
    let url = '';
    switch(type) {
        case 'line':
            url = lineJson
            break;
        default:
            break;
    }
    return url;
}

export {
    getMockJsonUrlByType
}