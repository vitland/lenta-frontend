import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"
import { BASE_URL } from "../../utils/consts"

const initialState = {
  salesList: null,
  status: "",
  error: "",
}

export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async ({ shops, skus, date }: any) => {
    // const storeParam = stores.reducer(
    //   (acc: any, cur: any) => ({ ...acc, store: cur }),
    //   {},
    // )
    // console.log(storeParam)
    const response = await axios.get(`${BASE_URL}/api/v1/salest/`, {
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

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setFakeSalesData: (state, action) => {
      state.salesList = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSales.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.salesList = action.payload.data
      })
      .addCase(fetchSales.rejected, (state, action) => {
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
export const { setFakeSalesData } = salesSlice.actions
export const selectAllForecasts = (state: RootState) =>
  state.forecast.forecastList

export default salesSlice.reducer
