import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import themeReducer from './themeSlice';
import { userAPI } from './userSlice';
import { cardioAPI } from './cardioSlice';
import { strengthAPI } from './strengthSlice';
import { weightAPI } from './weightSlice';


const persistConfig = { key: 'theme', storage };

const persistedReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    theme: persistedReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [weightAPI.reducerPath]: weightAPI.reducer,
    [cardioAPI.reducerPath]: cardioAPI.reducer,
    [strengthAPI.reducerPath]: strengthAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      userAPI.middleware,
      weightAPI.middleware,
      cardioAPI.middleware,
      strengthAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);