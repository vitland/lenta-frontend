import { createSlice } from "@reduxjs/toolkit"
import { FiltersState, selectedValues } from "../../types/types"
import { RootState } from "../../app/store"


const initialState: FiltersState = {
  shopsSelected: [],
  groupsSelected: [],
  categoriesSelected: [],
  subcategoriesSelected: [],
  skusSelected: [],
  grouping: false,
  status: "",
  error: "",
}

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
    changeGrouping: (state, action) => {
      state.grouping = action.payload
    },
  },

})

export default filterSlice.reducer
export const {
  changeShops,
  changeCategories,
  changeSubcategories,
  changeGroups,
  changeSkus,
  changeGrouping
} = filterSlice.actions

export const selectedShops = (state: RootState) => state.filters.shopsSelected

export const selectedGroups = (state: RootState) => state.filters.groupsSelected

export const selectedCategories = (state: RootState) =>
  state.filters.categoriesSelected

export const selectedSubcategories = (state: RootState) =>
  state.filters.subcategoriesSelected

export const selectedSkus = (state: RootState) => state.filters.skusSelected
export const selectGrouping = (state: RootState) => state.filters.grouping

