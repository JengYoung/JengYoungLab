import { applyMiddleware, combineReducers, createStore } from 'redux';
import { tasks } from './tasks';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import session from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage: session,
  whiteList: ['tasks'] // 어떤 리듀서를 허용해줄 것인가. 이것을 지정해주지 않는다면 rootReducer에 들어가 있는 리듀서 상태들은 다 적용이 됨.
  // blackList: [''] // 이 친구만 하지 않겠다는 의미
}

const combinedReducer = combineReducers({ tasks })

const rootReducer = persistReducer(persistConfig, combinedReducer);

export const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(logger))
);

// 로컬스토리지, 세션스토리지에서 값을 빼오기 위한 저장소
export const persistor = persistStore(store as any);

export type RootState = ReturnType<typeof rootReducer>;
