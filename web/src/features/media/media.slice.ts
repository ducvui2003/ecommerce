import { MediaType } from '@/types/media.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MediaState = {
  mediaPicks: MediaType[];
};

const initialState: MediaState = {
  mediaPicks: [],
};

const mediaSlice = createSlice({
  name: 'mediaSlice',
  initialState: initialState,
  reducers: {
    setMedia: (state: MediaState, action: PayloadAction<MediaType[]>) => {
      state.mediaPicks = action.payload;
    },
    pushMedia: (state: MediaState, action: PayloadAction<MediaType>) => {
      state.mediaPicks.push(action.payload);
    },
    removeMedia: (state: MediaState, action: PayloadAction<MediaType>) => {
      state.mediaPicks;
    },
  },
});

const mediaReducer = mediaSlice.reducer;
export const { setMedia } = mediaSlice.actions;
export default mediaReducer;
export type { MediaState };
