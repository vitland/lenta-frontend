import { Link } from "react-router-dom"
import styles from "./Logo.module.css"
import logo from "../../images/logo.svg"

function Logo() {
  return (
    <div className={styles.logo__container}>
      <img src={logo} alt="logo" className={styles.logo__header} />
    </div>
  )
}

export default Logo
