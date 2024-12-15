import {configureStore} from '@reduxjs/toolkit';
import RootReducer from '../reducers/RootReducer';
import createSagaMiddleware from 'redux-saga';
import Saga from '../saga/Saga';

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: RootReducer,
  middleware: ()=> [sagaMiddleware]
});

sagaMiddleware.run(Saga)
export default store;