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
  "forecats/fetchForecast",
  async ({ shops, skus, date }: any) => {
    // const storeParam = stores.reducer(
    //   (acc: any, cur: any) => ({ ...acc, store: cur }),
    //   {},
    // )
    // console.log(storeParam)
    const response = await axios.get(`${BASE_URL}/api/v1/forecast/`, {
      // params: {
      //   store: "c81e728d9d4c2f636f067f89cc14862c",
      //   product: "f9ee6d53edebe412feb1118b618900c8",
      //   // date,
      // },
      params: {
        store: shops.toString(),
        // product: skus.toString(),
      },
    })
    return response.data
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
