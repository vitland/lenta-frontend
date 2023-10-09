import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import filtersReducer from "../features/filters/fitltersSlice"
import forecastReducer from "../features/forecast/forecastSlice"
import staticticReducer from "../features/statistic/statisticSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    forecast: forecastReducer,
    statistic: staticticReducer,
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
