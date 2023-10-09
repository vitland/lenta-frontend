/* eslint-disable linebreak-style */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"
import { BASE_URL } from "../../utils/consts"
import { StatisticState } from "../../types/types"

const initialState: StatisticState = {
  statisticList: null,
  status: "idle",
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

export const exportStatistic = createAsyncThunk(
  "statistic/exportStatistic",
  async ({ shops, skus, date }: any) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/forecast/download_forecast_quality/`,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/vnd.ms-excel",
          },
          params: {
            store: shops,
            sku: skus,
            // forecast_date: "2023-07-19",
          },
          paramsSerializer: {
            indexes: null,
          },
        })
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "report.xlsx");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);
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

    .addCase(exportStatistic.pending, (state, action) => {
    })
    .addCase(exportStatistic.fulfilled, (state, action) => {
      state.status = "succeeded"
    })
    .addCase(exportStatistic.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.error.message
    })
  },
})

export const selectStatistic = (state: RootState) =>
  state.statistic.statisticList
export const statististicStatus = (state: RootState) => state.statistic.status

export default statisticSlice.reducer
