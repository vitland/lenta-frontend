import React from "react"
import { BsArrowClockwise } from "react-icons/bs"
import styles from "./ForecastBtn.module.css"
function ForecastBtn() {
  return (
    <button className={styles.button}>
      <BsArrowClockwise /> Сделать прогноз
    </button>
  )
}

export default ForecastBtn
