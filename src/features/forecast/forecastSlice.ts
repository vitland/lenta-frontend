import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Forecast, ForecastState } from "../../types"
import { RootState } from "../../app/store"
import axios from "axios"
import { BASE_URL } from "../../utils/consts"

const initialState: ForecastState = {
  forecastList: [],
  status: "",
  error: "",
}

export const fetchForecast = createAsyncThunk(
  "forecats/fetchForecast",
  async ({ shops, skus }) => {
    const response = await axios.get(`${BASE_URL}/api/v1/forecast/`, {
      params: {
        store: shops.toString(),
        product: skus.toString(),
      },
    })
    return [...response.data]
  },
)
// export const exportForecast = createAsyncThunk(
//   "forecats/fetchForecast",
//   async (query) => {
//     const response = await axios.get("URL DOBAVIT/exportforecats")
//     return [...response.data]
//   },
// )

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchForecast.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "succeeded"
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })

    // .addCase(exportForecast.pending, (state, action) => {
    //   state.status = "loading"
    // })
    // .addCase(exportForecast.fulfilled, (state, action) => {
    //   state.status = "succeeded"
    // })
    // .addCase(exportForecast.rejected, (state, action) => {
    //   state.status = "failed"
    //   state.error = action.error.message
    // })
  },
})

export const selectAllFilters = (state: RootState) => state.filters
export default forecastSlice.reducer
