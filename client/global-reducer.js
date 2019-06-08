import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import loginReducer from "./src/containers/Login/reducer"

const containersReducer = {
	containers: combineReducers({
		loginReducer,
		// NOTE: put other app reducers here
	}),
}

const createGlobalReducer = () => (
	combineReducers({
		containersReducer,
		route: routerReducer,
	})
)

export default createGlobalReducer
