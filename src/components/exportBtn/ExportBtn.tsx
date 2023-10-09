import React from "react"
import { BiExport } from "react-icons/bi"
import styles from "./ExportBtn.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { exportForecast } from "../../features/forecast/forecastSlice"
import { selectedShops } from "../../features/filters/fitltersSlice"

function ExportBtn() {
  const dispatch = useAppDispatch()
  const shops = useAppSelector(selectedShops)
  return (
    <button
      onClick={() => dispatch(exportForecast({ shops }))}
      className={styles.button}
    >
      <BiExport /> Экспоритровать
    </button>
  )
}

export default ExportBtn
