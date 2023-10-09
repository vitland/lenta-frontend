import React from "react"
import { FaXmark } from "react-icons/fa6"
import styles from "./ResetBtn.module.css"
type ResetButtonProps = {
  handleClick: () => void
}
function ResetBtn({ handleClick }: ResetButtonProps) {
  return (
    <button type="reset" className={styles.button} onClick={handleClick}>
      <FaXmark /> Очистить фильтр
    </button>
  )
}

export default ResetBtn
