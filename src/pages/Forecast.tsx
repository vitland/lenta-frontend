import styles from "./Forecast.module.css"
import Form from "../components/form/Form"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import Table from "../Table"

import Header from "../components/header/Header"
import { data } from "../utils/data"

import {
  fetchForecast,
  selectAllForecasts,
  setFakeData,
} from "../features/forecast/forecastSlice"

import { FormEvent } from "react"
import { selectedShops, selectedSkus } from "../features/filters/fitltersSlice"
import useDate from "../hooks/useDate"
function Forecast() {
  const dispatch = useAppDispatch()
  const forecastList = useAppSelector(selectAllForecasts)
  const shops = useAppSelector(selectedShops)
  const skus = useAppSelector(selectedShops)
  const date = useDate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('ddd')
    // dispatch(setFakeData(data))
    dispatch(fetchForecast({ skus, shops, date }))
  }

  return (
    <>
      <Header title="Прогноз спроса на 14 дней" />
      <section className={styles.container}>
        <Form handleSubmit={handleSubmit} />
        {forecastList && (
          <p>{`Прогноз спроса на ${
            Object.keys(data[0].forecast.sales_units)[0]
          } - ${
            Object.keys(data[0].forecast.sales_units)[
              Object.keys(data[0].forecast.sales_units).length - 1
            ]
          }`}</p>
        )}
        {forecastList && <Table data={forecastList} />}
      </section>
    </>
  )
}

export default Forecast
