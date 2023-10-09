import React from "react"
import { BiExport } from "react-icons/bi"
import styles from "./ExportBtn.module.css"
type ExportBtnProps = {
  handleExport: () => void
}
function ExportBtn({ handleExport }: ExportBtnProps) {
  return (
    <button onClick={handleExport} className={styles.button}>
      <BiExport /> Экспоритровать
    </button>
  )
}

export default ExportBtn
