import {createStore,applyMiddleware} from 'redux'
import {
    updateChartReducer
} from './reducer'
import thunk from 'redux-thunk'

const store = createStore(updateChartReducer, applyMiddleware(thunk))

export default store