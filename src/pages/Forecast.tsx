import styles from "./Forecast.module.css"
import Form from "../components/form/Form"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import Table from "../components/table/Table"

import Header from "../components/header/Header"

import {
  exportForecast,
  fetchForecast,
  selectAllForecasts,
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
    dispatch(fetchForecast({ skus, shops, date }))
  }
  return (
    <>
      <Header title="Прогноз спроса на 14 дней" />
      <section className={styles.container}>
        <Form handleSubmit={handleSubmit} />
        {forecastList && forecastList.length !== 0 && (
          <p>{`Прогноз спроса на ${
            Object.keys(forecastList[0].forecast)[0]
          } - ${
            Object.keys(forecastList[0].forecast)[
              Object.keys(forecastList[0].forecast).length - 1
            ]
          }`}</p>
        )}
        {forecastList && forecastList.length !== 0 && (
          <Table data={forecastList} />
        )}
      </section>
    </>
  )
}

export default Forecast
