import {
    lineJson,
    heatmapJson
} from './../mock/mock-json'

const getMockJsonUrlByType = function(type:string) {
    return  _getMockJsonURL(type);

    // let fetchObj = fetch(dataUrl)
    //     .then(res => res.json())
    // return fetchObj;
}

const _getMockJsonURL = function(type:string):any {
    let url = ''
    switch(type) {
        case 'line':
            url = lineJson
            break
        case 'heatmap':
            url = heatmapJson
            break
        default:
            break
    }
    return url
}

export {
    getMockJsonUrlByType
}