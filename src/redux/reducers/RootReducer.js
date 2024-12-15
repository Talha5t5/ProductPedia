import {combineReducers} from "redux"
import { reducer } from "./Reducer"
import { ProductReducers } from "./ProductReducers"
import { CompanyReducers } from "./CompanyReducers"
import { CountryReducers } from "./CountryReducers"
import {ToggleModelVisibalityReducers} from './ToggleModelVisibalityReducers'
import {UpdateProductsModelDataReducers} from './UpdateProductsModelDataReducers'
import {getTempProductReducers} from './getTempProductReducer'
import {getAllProductReducers} from './GetAllProductReducer'
import {CategoryReducers} from './CategoryReducers'

export default combineReducers({
    reducer,
    ProductReducers,
    CompanyReducers,
    CountryReducers,
    ToggleModelVisibalityReducers,
    UpdateProductsModelDataReducers,
    getTempProductReducers,
    getAllProductReducers,
    CategoryReducers
})