import React from "react"
import img from "../../images/404x4.png"
import styles from "./NotFound.module.css"
import { Link } from "react-router-dom"
function NotFound() {
  return (
    <section className={styles.container}>
      <img src={img} alt="Страница не найдена" className={styles.img} />
      <article className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h2 className={styles.header}>Непредвиденная ошибка</h2>
          <p>
            Наш кот заигрался в проводах и отключил сайт.
            Уже всё чиним, попробуйте зайти через 5 минут.
          </p>
        </div>
        <Link to="/" className={styles.btn}>На главную</Link>
      </article>
    </section>
  )
}

export default NotFound
