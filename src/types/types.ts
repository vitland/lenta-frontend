type ForecastItem = {
  [date: string]: number
}

export type TForecast = {
  store: string
  sku: string
  forecast_date: string
  forecast: ForecastItem[]
}

export type ForecastState = {
  forecastList: TForecast[] | null
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
  value: string
  label: string
}

export type ShopsData = {
  store: string
  city: string
  division: string
  typeFormat: string
  loc: string
  size: string
  isActive: number
}
