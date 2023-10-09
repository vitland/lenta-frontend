import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ForecastState } from "../../types/types"
import { RootState } from "../../app/store"
import axios from "axios"
import { BASE_URL } from "../../utils/consts"

const initialState: ForecastState = {
  forecastList: null,
  status: "idel",
  error: "",
}

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async ({ shops, skus, date }: any) => {
    console.log(skus)
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/forecast/`, {
        params: {
          store: shops,
          sku: skus,
          // forecast_date: "2023-07-19",
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
export const exportForecast = createAsyncThunk(
  "forecast/exportForecast",
  async ({ shops, skus, date }: any) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/forecast/download_file/`,
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

      .addCase(exportForecast.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(exportForecast.fulfilled, (state, action) => {
        state.status = "succeeded"
      })
      .addCase(exportForecast.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})
export const { setFakeData } = forecastSlice.actions
export const selectAllForecasts = (state: RootState) => state.forecast.forecastList
export const forecastStatus = (state: RootState) => state.forecast.status


export default forecastSlice.reducer
