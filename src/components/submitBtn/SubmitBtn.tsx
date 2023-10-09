import React from "react"
import { BsArrowClockwise } from "react-icons/bs"
import styles from "./SubmitBtn.module.css"
type SubmitBtnProps = {
  text: string
}
function ForecastBtn({text}:SubmitBtnProps) {
  return (
    <button className={styles.button}>
      <BsArrowClockwise />
      {text}
    </button>
  )
}

export default ForecastBtn
