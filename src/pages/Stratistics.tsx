import { useAppDispatch, useAppSelector } from "../app/hooks"
import Form from "../components/form/Form"
import Header from "../components/header/Header"
import StatisticTable from "../components/statisticTable/StatisticTable"
import {
  changeGrouping,
  selectGrouping,
  selectedShops,
  selectedSkus,
} from "../features/filters/fitltersSlice"
import {
  fetchStatistic,
  selectStatistic,
} from "../features/statistic/statisticSlice"
import styles from "./Statistics.module.css"

import { FormEvent } from "react"
function Statistics() {
  const dispatch = useAppDispatch()
  const skus = useAppSelector(selectedSkus)
  const shops = useAppSelector(selectedShops)
  const stastisicList = useAppSelector(selectStatistic)
  const grouping = useAppSelector(selectGrouping)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(fetchStatistic({ shops, skus }))
  }

  const data = [
    {
      store_id: "42a0e188f5033bc65bf8d78622277c4e",
      product_id: "5aa2f6e00873f8c90b00cd15d670daa1",
      target: 19,
      fact: 57,
      group_id: "c74d97b01eae257e44aa9d5bade97baf",
      category_id: "c559da2ba967eb820766939a658022c8",
      subcategory_id: "34d2777e78ccf007523e2dd1fcea6b2d",
      delta: 38,
      WAPE: 66.6666666667,
      date_range: ["2023-07-05", "2023-07-18"],
    },
    {
      store_id: "42a0e188f5033bc65bf8d78622277c4e",
      product_id: "ef02788ce258ed628acecda974bb42da",
      target: 17,
      fact: 0,
      group_id: "c74d97b01eae257e44aa9d5bade97baf",
      category_id: "c559da2ba967eb820766939a658022c8",
      subcategory_id: "41b1d51c9e3ba9a263361f9cfa0eb434",
      delta: -17,
      WAPE: null,
      date_range: ["2023-07-05", "2023-07-18"],
    },
  ]

  return (
    <>
      <Header title="Статистика" />
      <section className={styles.container}>
        <Form handleSubmit={handleSubmit} text={"Рассчитать качество"} />
        {/* <div className={styles.filterContainer}>
          {data && data.length !== 0 && (
            <p
              className={styles.period}
            >{`Прогноз спроса на ${data[0].date_range[0]} - ${data[0].date_range[1]}`}</p>
          )}
          <label htmlFor="groupBy" className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="groupBy"
              className={styles.checkbox}
              checked={grouping}
              onChange={() => dispatch(changeGrouping(!grouping))}
            />{" "}
            Сортировать по ТК
          </label>
        </div>
        {data && data.length !== 0 && <StatisticTable data={data} />} */}

        {stastisicList && stastisicList.length !== 0 && (
          <div className={styles.filterContainer}>
            <p
              className={styles.period}
            >{`Прогноз спроса на ${stastisicList[0].date_range[0]} - ${stastisicList[0].date_range[1]}`}</p>
            <label htmlFor="groupBy" className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="groupBy"
                className={styles.checkbox}
                checked={grouping}
                onChange={() => dispatch(changeGrouping(!grouping))}
              />{" "}
              Сортировать по ТК
            </label>
          </div>
        )}
        {stastisicList && stastisicList.length !== 0 && (
          <StatisticTable data={stastisicList} />
        )}
      </section>
    </>
  )
}

export default Statistics
