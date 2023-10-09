export type UserState = {
  user: User | null
  isLogin: boolean
  error: string | undefined
}

export type User = {
  email: string
  password: string
}

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

export type StatisticData = {
  store_id: string
  product_id: string
  target: number
  fact: number
  group_id: string
  category_id: string
  subcategory_id: string
  date_range: string
  delta: number
  WAPE: string
}
export type StatisticState = {
  statisticList: StatisticData[] | null
  status: string
  error: string | undefined
}

export type FiltersState = {
  shopsSelected: string[]
  groupsSelected: string[]
  categoriesSelected: string[]
  subcategoriesSelected: string[]
  skusSelected: string[]
  grouping:boolean
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
