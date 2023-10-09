import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"
import { BASE_URL } from "../../utils/consts"
import { StatisticState } from "../../types/types"

const initialState: StatisticState = {
  statisticList: null,
  status: "",
  error: "",
}

export const fetchStatistic = createAsyncThunk(
  "statistic/fetchStatistic",
  async ({ shops, skus, group }: any) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/forecast/forecast_quality/`, {
        params: {
          store: shops,
          sku: skus,
          group: 0
        },
        paramsSerializer: {
          indexes: null,
        },
      })
      return response.data
    } catch (error: any) {
      return error.message
    }

  },
)

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStatistic.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchStatistic.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.statisticList = action.payload.data
      })
      .addCase(fetchStatistic.rejected, (state, action) => {
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
export const selectStatistic = (state: RootState) =>
  state.statistic.statisticList

export default statisticSlice.reducer
