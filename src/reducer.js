import {combineReducers}  from 'redux'
import Data from './Data'

const allReducers = combineReducers({
    serviceData: Data
});

export default allReducers;