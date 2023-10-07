import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FiltersState, selectedValues } from "../../types/types"
import { RootState } from "../../app/store"
import axios from "axios"
import { BASE_URL } from "../../utils/consts"
const initialState: FiltersState = {
  shopsSelected: [],
  groupsSelected: [],
  categoriesSelected: [],
  subcategoriesSelected: [],
  skusSelected: [],
  status: "",
  error: "",
}

// export const fetchCategories = createAsyncThunk(
//   "forecats/fetchCategories",
//   async () => {
//     const response = await axios.get(`${BASE_URL}/api/v1/categories/`)
//     return [...response.data]
//   },
// )

export const fetchShops = createAsyncThunk("forecats/fetchShops", async () => {
  const response = await axios.get(BASE_URL)
  return [...response.data]
})

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeShops: (state, action) => {
      const shops: string[] = action.payload.map((i: selectedValues) => i.value)
      state.shopsSelected = shops
    },
    changeGroups: (state, action) => {
      const groups: string[] = action.payload.map(
        (i: selectedValues) => i.value,
      )
      state.groupsSelected = groups
    },
    changeCategories: (state, action) => {
      const categories: string[] = action.payload.map(
        (i: selectedValues) => i.value,
      )
      state.categoriesSelected = categories
    },
    changeSubcategories: (state, action) => {
      const subcategories: string[] = action.payload.map(
        (i: selectedValues) => i.value,
      )
      state.subcategoriesSelected = subcategories
    },
    changeSkus: (state, action) => {
      state.skusSelected = action.payload
    },
  },
  extraReducers(builder) {
    // builder
    //   .addCase(fetchCategories.pending, (state, action) => {
    //     state.status = "loading"
    //   })
    //   .addCase(fetchCategories.fulfilled, (state, action) => {
    //     state.status = "succeeded"
    //   })
    //   .addCase(fetchCategories.rejected, (state, action) => {
    //     state.status = "failed"
    //     state.error = action.error.message
    //   })
    //   .addCase(fetchShops.pending, (state, action) => {
    //     state.status = "loading"
    //   })
    //   .addCase(fetchShops.fulfilled, (state, action) => {
    //     state.status = "succeeded"
    //   })
    //   .addCase(fetchShops.rejected, (state, action) => {
    //     state.status = "failed"
    //     state.error = action.error.message
    //   })
  },
})

export default filterSlice.reducer
export const {
  changeShops,
  changeCategories,
  changeSubcategories,
  changeGroups,
  changeSkus,
} = filterSlice.actions

export const selectedShops = (state: RootState) => state.filters.shopsSelected

export const selectedGroups = (state: RootState) => state.filters.groupsSelected

export const selectedCategories = (state: RootState) =>
  state.filters.categoriesSelected

export const selectedSubcategories = (state: RootState) =>
  state.filters.subcategoriesSelected

export const selectedSkus = (state: RootState) => state.filters.skusSelected
