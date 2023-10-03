type ForecastItem = {
  [date: string]: number
}

export type Forecast = {
  store: string
  sku: string
  group: string
  cat: string
  subcat: string
  forecast_date: string
  forecast: ForecastItem
}

export type ForecastState = {
  forecastList: Forecast[]
  status: string
  error: string | undefined
}

export type FiltersState = {
  shopsSelected: string[]
  groupsSelected: string[]
  categoriesSelected: string[]
  subcategoriesSelected: string[]
  skusSelected: string[]
  status: string
  error: string | undefined
}

export type caterogiesResponse = {
  category: string
  group: string
  subcategory: string
  sku: string
  uom: number
}

export type selectedValues = {
  value: string[]
  label: string[]
}
