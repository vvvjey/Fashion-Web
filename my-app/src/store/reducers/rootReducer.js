import { configureStore,applyMiddleware,getDefaultMiddleware  } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { logoutAction } from "../../store/actions/userAction";
import actionTypes from '../actions/actionsType';



const commonPersistConfig = {
  storage,
  stateReconciler: autoMergeLevel2
}
const counterPersistConfig = {
  ...commonPersistConfig,
  key: 'count',
}

const userPersistConfig = {
  ...commonPersistConfig,
  key: 'isLogin,userInfor',
}
const adminPersistConfig = {
  ...commonPersistConfig,
  key: 'isLogin,adminInfor',
}


export const store = configureStore({
  reducer: {
    counterReducer: persistReducer(counterPersistConfig, counterReducer),
    userReducer: persistReducer(userPersistConfig, userReducer),
    adminReducer: persistReducer(adminPersistConfig, adminReducer),
  }
});

export const persistor = persistStore(store);



