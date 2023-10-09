import styles from "./Forecast.module.css"
import Form from "../../components/form/Form"
import Loader from "../../components/loader/Loader"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import ForecastTable from "../../components/forecastTable/ForecastTable"
import Header from "../../components/header/Header"
import {
  exportForecast,
  fetchForecast,
  forecastStatus,
  selectAllForecasts,
} from "../../features/forecast/forecastSlice"

import { FormEvent } from "react"
import { selectedShops, selectedSkus } from "../../features/filters/fitltersSlice"
import useDate from "../../hooks/useDate"
function Forecast() {
  const dispatch = useAppDispatch()
  const forecastList = useAppSelector(selectAllForecasts)
  const shops = useAppSelector(selectedShops)
  const skus = useAppSelector(selectedSkus)
  const status = useAppSelector(forecastStatus)
  const date = useDate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(fetchForecast({ skus, shops, date }))
  }

  const renderTableSection = () => {
    return (
      forecastList &&
      forecastList.length !== 0 && (
        <>
          <p>{`Прогноз спроса на ${
            Object.keys(forecastList[0].forecast)[0]
          } - ${
            Object.keys(forecastList[0].forecast)[
              Object.keys(forecastList[0].forecast).length - 1
            ]
          }`}</p>
          <ForecastTable data={forecastList} />
        </>
      )
    )
  }

  return (
    <>
      <Header title="Прогноз спроса на 14 дней" />
      <section className={styles.container}>
        <Form handleSubmit={handleSubmit} text={"Сделать прогноз"} />
        {status === "loading" ? <Loader /> : renderTableSection()}
      </section>
    </>
  )
}

export default Forecast
