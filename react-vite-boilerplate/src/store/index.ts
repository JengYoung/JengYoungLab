import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

export function* rootSaga() {
  yield all([]);
}

export const rootReducer = combineReducers({});

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
