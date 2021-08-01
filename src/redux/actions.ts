import { UPDATE_CHART_DATA } from "./action-type";

export const updateChartDataCreater = (newData:any) => ({
    type:UPDATE_CHART_DATA,
    data:newData
})