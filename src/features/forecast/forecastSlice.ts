import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ForecastState } from "../../types/types"
import { RootState } from "../../app/store"
import axios from "axios"
import { BASE_URL } from "../../utils/consts"

const initialState: ForecastState = {
  forecastList: null,
  status: "",
  error: "",
}

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async ({ shops, skus, date }: any) => {
    // const storeParam = stores.reducer(
    //   (acc: any, cur: any) => ({ ...acc, store: cur }),
    //   {},
    // )
    // console.log(storeParam)
    const response = await axios.get(`${BASE_URL}/api/v1/forecast/`, {
      params: {
        store: "16a5cdae362b8d27a1d8f8c7b78b4330c",
        sku: "0f152427918d29bb1081834c1d375a48",
        forecast_date: "2023-07-19",
      },
      // params: {
      //   store: shops.toString(),
      //   // product: skus.toString(),
      // },
    })
    return response.data
  },
)
export const exportForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async (query) => {
    const response = await axios.get(`${BASE_URL}/api/v1/forecast/download_file/`,
      {
        params: {}
      })
    return [...response.data]
  },
)

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setFakeData: (state, action) => {
      state.forecastList = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchForecast.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.forecastList = action.payload.data
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
export const { setFakeData } = forecastSlice.actions
export const selectAllForecasts = (state: RootState) =>
  state.forecast.forecastList

export default forecastSlice.reducer
