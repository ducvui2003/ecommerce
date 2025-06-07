import { addressApi } from '@/features/address/address.api';
import authReducer from '@/features/auth/auth.slice';
import { productManagerApi } from '@/features/manager/product/product.api';
import { userApi } from '@/features/manager/user/user.api';
import { mediaApi } from '@/features/media/media.api';
import mediaReducer from '@/features/media/media.slice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cartApi } from '@/features/cart/cart.api';
import { promotionApi } from '@/features/promotion/promotion.api';
import addressReducer from '@/features/address/address.slice';
import { contactApi } from '@/features/contact/contact.api';
import { orderApi } from '@/features/order/order.api';
import orderReducer from '@/features/order/order.slice';
import { orderManagerApi } from '@/features/manager/order/order.api';
import orderManagerReducer from '@/features/manager/order/order.slice';
import { productApi } from '@/features/product/product.api';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      authSlice: authReducer,
      mediaSlice: mediaReducer,
      addressSlice: addressReducer,
      orderSlice: orderReducer,
      orderManagerSlice: orderManagerReducer,
      [addressApi.reducerPath]: addressApi.reducer,
      [mediaApi.reducerPath]: mediaApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [productManagerApi.reducerPath]: productManagerApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      [promotionApi.reducerPath]: promotionApi.reducer,
      [contactApi.reducerPath]: contactApi.reducer,
      [orderApi.reducerPath]: orderApi.reducer,
      [orderManagerApi.reducerPath]: orderManagerApi.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware()
        .concat(addressApi.middleware)
        .concat(mediaApi.middleware)
        .concat(userApi.middleware)
        .concat(productManagerApi.middleware)
        .concat(productApi.middleware)
        .concat(cartApi.middleware)
        .concat(promotionApi.middleware)
        .concat(contactApi.middleware)
        .concat(orderApi.middleware)
        .concat(orderManagerApi.middleware);
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
