import * as React from 'react'
import {connect} from 'react-redux'
import { updateChartDataCreater } from './actions' 
import { RoseRangeComponent  } from '../charts/shape'   


export default connect(
    state => ({
        // data:state
    }),
    { updateChartDataCreater }
)(RoseRangeComponent)