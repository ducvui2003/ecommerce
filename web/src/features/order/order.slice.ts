import orderService from '@/service/order.service';
import { CreateOrderReqType, CreateOrderResType } from '@/types/order.type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const createOrderThunk = createAsyncThunk<
  CreateOrderResType,
  CreateOrderReqType
>('orderSlice/create', async (req) => {
  const response = await orderService.createOrder(req);
  return response;
});

type OrderState = {
  id?: number;
  req?: CreateOrderReqType;
  res?: CreateOrderResType;
};

const initialState: OrderState = {};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialState,
  reducers: {
    setCreateOrderReq: (
      state: OrderState,
      action: PayloadAction<CreateOrderReqType>,
    ) => {
      state.req = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      state.id = action.payload.paymentId;
      state.res = action.payload;
    });
  },
});

const orderReducer = orderSlice.reducer;
export const { setCreateOrderReq } = orderSlice.actions;
export { createOrderThunk };
export default orderReducer;
export type { OrderState };
