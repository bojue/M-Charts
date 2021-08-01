import { UPDATE_CHART_DATA } from './action-type';
import {combineReducers} from 'redux'

function updateData (state:any,action:any) {
    const { type } = action || []
    switch (type) {
        case UPDATE_CHART_DATA :
            return {
                data:action?.data 
            }
        default:
            return null
    }
}

function initData() {
    return []
}

export const updateChartReducer = combineReducers({
    updateData,
    initData
})