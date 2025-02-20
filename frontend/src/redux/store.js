import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './userSlice';
import orderReducer from './orderSlice';

const userPersistConfig = {
    key: 'user',
    storage,
};

const orderPersistConfig = {
    key: 'order',
    storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedOrderReducer = persistReducer(orderPersistConfig, orderReducer);

// Configure store
const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        order: persistedOrderReducer,
    },
});

export const persistor = persistStore(store);

export default store;
