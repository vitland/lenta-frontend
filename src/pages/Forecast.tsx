import styles from "./Forecast.module.css"
import Form from "../components/form/Form"
import Loader from "../components/loader/Loader"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import ForecastTable from "../components/forecastTable/ForecastTable"

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
  const skus = useAppSelector(selectedSkus)
  const date = useDate()
  // const [isLoading, setIsLoading] = useDate(false);
  // const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(fetchForecast({ skus, shops, date }))
  }

  // const getTable = () => {

  // };

  // const renderTableSection = () => {
  //   if (errorMessage.length) {
  //     return <p className='cards__search-message'>Ничего не найдено</p>;
  //   }
  //   return <section className={styles.container}>
  //     <Form handleSubmit={handleSubmit} />
  //     {forecastList && forecastList.length !== 0 && (
  //       <p>{`Прогноз спроса на ${Object.keys(forecastList[0].forecast)[0]
  //         } - ${Object.keys(forecastList[0].forecast)[
  //         Object.keys(forecastList[0].forecast).length - 1
  //         ]
  //         }`}</p>
  //     )}
  //     {forecastList && forecastList.length !== 0 && (
  //       <Table data={forecastList} />
  //     )}
  //   </section>;
  // };

  return (
    <>
      <Header title="Прогноз спроса на 14 дней" />
      <section className={styles.container}>
        <Form handleSubmit={handleSubmit} text={"Сделать прогноз"} />
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
          <ForecastTable data={forecastList} />
        )}
      </section>
      {/* {isLoading ? <Loader /> : renderTableSection()} */}
      <Loader/>
    </>
  )
}

export default Forecast
