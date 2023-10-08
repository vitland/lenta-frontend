import React from "react"
import { BiExport } from "react-icons/bi"
import styles from "./ExportBtn.module.css"
import { useAppDispatch } from "../../app/hooks"
import { exportForecast } from "../../features/forecast/forecastSlice"

function ExportBtn() {
  const dispatch = useAppDispatch()
  return (
    <button onClick={() => dispatch(exportForecast)} className={styles.button}>
      <BiExport /> Экспоритровать
    </button>
  )
}

export default ExportBtn
