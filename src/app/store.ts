import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import filtersReducer from "../features/filters/fitltersSlice"
import forecastReducer from "../features/forecast/forecastSlice"
import salesReducer from "../features/sales/salesSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    forecast: forecastReducer,
    sales: salesReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
