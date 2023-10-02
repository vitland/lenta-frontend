import { Link } from "react-router-dom"
import styles from "./logo.module.css"

function Logo() {
  return (
    <Link to="#" className={styles.logo__header}>
      Лента
    </Link>
  )
}

export default Logo
