import React, { useState, useEffect } from "react"
import FilterMultiSelect from "../features/forecast/FilterMultiSelect"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { BASE_URL } from "../utils/consts"
import axios from "axios"
import { caterogiesResponse } from "../types/types"
import {
  changeCategories,
  changeGroups,
  changeShops,
  changeSkus,
  changeSubcategories,
  selectedCategories,
  selectedGroups,
  selectedShops,
  selectedSkus,
  selectedSubcategories,
} from "../features/filters/fitltersSlice"
import { fetchForecast } from "../features/forecast/forecastSlice"

function Prediction() {
  const dispatch = useAppDispatch()
  const [allOptions, setAllOptions] = useState<caterogiesResponse[]>([])
  const [filteredOptions, setFilteredOptions] = useState<caterogiesResponse[]>(
    [],
  )
  //select values
  const [shopOptions, setShopOptions] = useState<string[]>([])
  const [groupOptions, setGroupOptions] = useState<string[]>([])
  const [categoryOptions, setCategoryOptions] = useState<string[]>([])
  const [subcategoryOptions, setSubcategoryOptions] = useState<string[]>([])
  const [skuOptions, setSkuOptions] = useState<string[]>([])
  //active filters
  const shops = useAppSelector(selectedShops)
  const groups = useAppSelector(selectedGroups)
  const categories = useAppSelector(selectedCategories)
  const subcategories = useAppSelector(selectedSubcategories)
  const skus = useAppSelector(selectedSkus)

  useEffect(() => {
    Promise.all([
      axios.get(`${BASE_URL}/api/v1/categories/`),
      axios.get(`${BASE_URL}/api/v1/shops/`),
    ]).then(([categoriesData, shopsData]) => {
      setAllOptions(categoriesData.data.data)
      setShopOptions(() => shopsData.data.data.map((shop) => shop.store))
    })
  }, [])

  useEffect(() => {
    if (
      shops.length === 0 &&
      groups.length === 0 &&
      categories.length === 0 &&
      subcategories.length === 0
    ) {
      setFilteredOptions(allOptions)
    }
  }, [shops, groups, categories, subcategories, allOptions])

  useEffect(() => {
    let filteredArr: caterogiesResponse[] = []
    if (groups.length !== 0) {
      filteredArr = allOptions.filter((opt) => groups.includes(opt.group))
      setFilteredOptions(filteredArr)
      setCategoryOptions([])
      setSkuOptions([])
    }
  }, [allOptions, groups])

  useEffect(() => {
    let filteredArr: caterogiesResponse[] = []
    if (categories.length !== 0) {
      filteredArr = allOptions.filter((opt) =>
        categories.includes(opt.category),
      )
      setFilteredOptions(filteredArr)
      setSubcategoryOptions([])
      setSkuOptions([])
    }
    if (categories.length === 0 && groups.length !== 0) {
      filteredArr = allOptions.filter((opt) => groups.includes(opt.group))
      setFilteredOptions(filteredArr)
      setCategoryOptions([])
      setSkuOptions([])
    }
  }, [allOptions, categories, groups])

  useEffect(() => {
    let filteredArr: caterogiesResponse[] = []
    if (subcategories.length !== 0) {
      filteredArr = allOptions.filter((opt) =>
        subcategories.includes(opt.subcategory),
      )
      setFilteredOptions(filteredArr)
      setSkuOptions([])
    }
  }, [allOptions, subcategories])

  // Запись уникльных категорий
  useEffect(() => {
    filteredOptions.forEach((item: caterogiesResponse) => {
      setCategoryOptions((prev) =>
        prev.includes(item.category) ? prev : [...prev, item.category],
      )
      setSubcategoryOptions((prev) =>
        prev.includes(item.subcategory) ? prev : [...prev, item.subcategory],
      )
      setGroupOptions((prev) =>
        prev.includes(item.group) ? prev : [...prev, item.group],
      )
      setSkuOptions((prev) =>
        prev.includes(item.sku) ? prev : [...prev, item.sku],
      )
    })
  }, [filteredOptions])

  return (
    <section>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(fetchForecast({ shops, skus }))
        }}
      >
        <label htmlFor="shop">
          Магазины
          <FilterMultiSelect
            id={"shop"}
            options={shopOptions}
            onChange={(values) => {
              dispatch(changeShops(values))
              dispatch(changeSkus(skuOptions))
            }}
          />{" "}
        </label>
        <label htmlFor="group">
          Группа товаров
          <FilterMultiSelect
            id={"group"}
            options={groupOptions}
            onChange={(values) => {
              dispatch(changeGroups(values))
              dispatch(changeSkus(skuOptions))
            }}
          />
        </label>
        <label htmlFor="category">
          Категория товаров
          <FilterMultiSelect
            id={"category"}
            options={categoryOptions}
            onChange={(values) => {
              dispatch(changeCategories(values))
              dispatch(changeSkus(skuOptions))
            }}
          />
        </label>

        <label htmlFor="subcategory">
          Подкатегория товаров
          <FilterMultiSelect
            id={"subcategory"}
            options={subcategoryOptions}
            onChange={(values) => {
              dispatch(changeSubcategories(values))
              dispatch(changeSkus(skuOptions))
            }}
          />
        </label>

        <label htmlFor="sku">
          Товар
          <FilterMultiSelect
            id={"sku"}
            options={skuOptions}
            onChange={(values) => {
              const skus = values.map((i) => i.value)
              dispatch(changeSkus(skus))
            }}
          />
        </label>
        <button>Submit</button>
      </form>
    </section>
  )
}

export default Prediction
