import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlice';

const store = configureStore({
  reducer: {
    user: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
