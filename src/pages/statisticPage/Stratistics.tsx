import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Form from "../../components/form/Form"
import Header from "../../components/header/Header"
import Loader from "../../components/loader/Loader"
import StatisticTable from "../../components/statisticTable/StatisticTable"
import {
  changeGrouping,
  selectGrouping,
  selectedShops,
  selectedSkus,
} from "../../features/filters/fitltersSlice"
import {
  fetchStatistic,
  selectStatistic,
  statististicStatus,
} from "../../features/statistic/statisticSlice"
import styles from "./Statistics.module.css"

import { FormEvent } from "react"
function Statistics() {
  const dispatch = useAppDispatch()
  const skus = useAppSelector(selectedSkus)
  const shops = useAppSelector(selectedShops)
  const stastisicList = useAppSelector(selectStatistic)
  const grouping = useAppSelector(selectGrouping)
  const status = useAppSelector(statististicStatus)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(fetchStatistic({ shops, skus }))
  }
  const renderTableSection = () => {
    return (
      stastisicList &&
      stastisicList.length !== 0 && (
        <>
          <div className={styles.filterContainer}>
            <p
              className={styles.period}
            >{`Качество прогноза ${stastisicList[0].date_range.split(',').join(" - ")}`}</p>
            <label htmlFor="groupBy" className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="groupBy"
                className={styles.checkbox}
                checked={grouping}
                onChange={() => dispatch(changeGrouping(!grouping))}
              />
              Сортировать по ТК
            </label>
          </div>
          <StatisticTable data={stastisicList} />
        </>
      )
    )
  }

  return (
    <>
      <Header title="Качество прогноза за 14 дней" />
      <section className={styles.container}>
        <Form handleSubmit={handleSubmit} text={"Рассчитать качество"} />
        {status === "loading" ? <Loader /> : renderTableSection()}
      </section>
    </>
  )
}

export default Statistics
