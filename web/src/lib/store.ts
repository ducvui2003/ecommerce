import { addressApi } from '@/features/address/address.api';
import authReducer from '@/features/auth/auth.slice';
import { userApi } from '@/features/manager/user/user.api';
import { mediaApi } from '@/features/media/media.api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cartApi } from '@/features/cart/cart.api';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      authSlice: authReducer,
      [addressApi.reducerPath]: addressApi.reducer,
      [mediaApi.reducerPath]: mediaApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware()
        .concat(addressApi.middleware)
        .concat(mediaApi.middleware)
        .concat(userApi.middleware)
        .concat(cartApi.middleware);
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
