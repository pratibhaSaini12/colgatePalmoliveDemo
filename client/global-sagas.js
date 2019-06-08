
import { fork, all } from "redux-saga/effects"

import loginSagas from "./src/containers/Login/sagas"

const sagas = [
	loginSagas,
	// NOTE: put other app sagas here
]

function* globalSagas() {
	const globalSagasForks = sagas.map((saga) => fork(saga))

	yield all([...globalSagasForks])
}

export default globalSagas
