import Form from "../components/form/Form"
import Header from "../components/header/Header"
import styles from "./Statistics.module.css"
import { data } from "../utils/data"
import Table from "../Table"
import { FormEvent } from "react"

function Statistics() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // dispatch(setFakeData(data))
    // dispatch(fetchForecast({ skus, shops, date }))
  }

  return (
    <>
      <Header title="Статистика" />
      <section className={styles.container}>
        <Form handleSubmit={handleSubmit} />

        {data && (
          <p>{`Прогноз спроса на ${
            Object.keys(data[0].forecast.sales_units)[0]
          } - ${
            Object.keys(data[0].forecast.sales_units)[
              Object.keys(data[0].forecast.sales_units).length - 1
            ]
          }`}</p>
        )}
        {data && <Table data={data} />}
      </section>
    </>
  )
}

export default Statistics
