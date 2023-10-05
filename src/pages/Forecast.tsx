import React, { useState, useEffect } from "react"
import styles from "./Forecast.module.css"
import FilterMultiSelect from "../features/forecast/FilterMultiSelect"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { BASE_URL } from "../utils/consts"
import axios from "axios"
import { ShopsData, caterogiesResponse, selectedValues } from "../types/types"
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
import Table from "../Table"
import useDate from "../hooks/useDate"
import Header from "../components/header/Header"

function Forecast() {
  const dispatch = useAppDispatch()
  const date = useDate()
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

  //TODO: пределать локальные selectedValues, диспатчить их значения в useeffect или также
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
      setShopOptions(() =>
        shopsData.data.data.map((shop: ShopsData) => shop.store),
      )
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

  // useEffect(() => {
  //   let filteredArr: caterogiesResponse[] = []
  //   if (groups.length !== 0) {
  //     filteredArr = allOptions.filter((opt) => groups.includes(opt.group))
  //   } else if (categories.length !== 0) {
  //     filteredArr = allOptions.filter((opt) =>
  //       categories.includes(opt.category),
  //     )
  //   } else if (subcategories.length !== 0) {
  //     filteredArr = allOptions.filter((opt) =>
  //       subcategories.includes(opt.subcategory),
  //     )
  //   }
  //   if (filteredArr.length !== 0) {
  //     setCategoryOptions([])
  //     setSkuOptions([])
  //     setSubcategoryOptions([])
  //     setFilteredOptions(filteredArr)
  //   }
  // }, [shops, groups, categories, subcategories, allOptions])

  useEffect(() => {
    let filteredArr: caterogiesResponse[] = []
    if (groups.length !== 0) {
      console.log("group")
      filteredArr = allOptions.filter((opt) => groups.includes(opt.group))
      setFilteredOptions(filteredArr)
      setCategoryOptions([])
      setSkuOptions([])
    }
  }, [allOptions, groups])

  useEffect(() => {
    let filteredArr: caterogiesResponse[] = []
    if (categories.length !== 0) {
      console.log("cat")
      filteredArr = allOptions.filter((opt) =>
        categories.includes(opt.category),
      )
      setFilteredOptions(filteredArr)
      setSubcategoryOptions([])
      setSkuOptions([])
    }
    if (categories.length === 0 && groups.length !== 0) {
      console.log("group&cat")
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
    <>
      <Header title="Прогноз" />
      <section className={styles.container}>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault()
            dispatch(fetchForecast({ skus, shops, date }))
          }}
          className={styles.form}
        >
          <fieldset className={styles.fieldset}>
            <FilterMultiSelect
              placeholder={"ТК"}
              options={shopOptions}
              onChange={(values: selectedValues[]) => {
                dispatch(changeShops(values))
                dispatch(changeSkus(skuOptions))
              }}
            />
            <FilterMultiSelect
              placeholder={"Группа"}
              values={groups}
              options={groupOptions}
              onChange={(values: selectedValues[]) => {
                dispatch(changeGroups(values))
                dispatch(changeSkus(skuOptions))
              }}
            />
            <FilterMultiSelect
              placeholder={"Категория"}
              options={categoryOptions}
              values={categories}
              onChange={(values: selectedValues[]) => {
                dispatch(changeCategories(values))
                dispatch(changeSkus(skuOptions))
              }}
            />
            <FilterMultiSelect
              placeholder={"Подкатегория"}
              options={subcategoryOptions}
              values={subcategories}
              onChange={(values: selectedValues[]) => {
                dispatch(changeSubcategories(values))
                dispatch(changeSkus(skuOptions))
              }}
            />
            <FilterMultiSelect
              placeholder={"Товар"}
              options={skuOptions}
              values={skus}
              onChange={(values: selectedValues[]) => {
                const skus = values.map((i) => i.value)
                dispatch(changeSkus(skus))
              }}
            />
          </fieldset>
          <button>Submit</button>
          <button onClick={() => dispatch(changeGroups([]))}>Clear</button>
        </form>
        <Table />
      </section>
    </>
  )
}

export default Forecast
