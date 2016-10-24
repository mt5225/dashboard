import { combineReducers } from 'redux'
import dashboardReducer from './dashboardReducer'
import uiReducer from './uiReducer'
import { routerReducer as routing } from 'react-router-redux'

const dashboardApp = combineReducers({
    dashboardReducer,
    uiReducer,
    routing,
})

export default dashboardApp