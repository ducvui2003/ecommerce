import { addressApi } from '@/features/address/address.api';
import authReducer from '@/features/auth/auth.slice';
import { productManagerApi } from '@/features/manager/product/product.api';
import { userApi } from '@/features/manager/user/user.api';
import { mediaApi } from '@/features/media/media.api';
import mediaReducer from '@/features/media/media.slice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      authSlice: authReducer,
      mediaSlice: mediaReducer,
      [addressApi.reducerPath]: addressApi.reducer,
      [mediaApi.reducerPath]: mediaApi.reducer,
      [userApi.reducerPath]: userApi.reducer,

      [productManagerApi.reducerPath]: productManagerApi.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware()
        .concat(addressApi.middleware)
        .concat(mediaApi.middleware)
        .concat(userApi.middleware)
        .concat(productManagerApi.middleware);
    },
  });

  setupListeners(store.dispatch);

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
