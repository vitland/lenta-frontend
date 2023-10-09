import React from "react"
import img from "../../images/404x4.png"
import styles from "./NotFound.module.css"
function NotFound() {
  return (
    <section className={styles.container}>
      <img src={img} alt="Страница не найдена" className={styles.img} />
      <article className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h2>Непредвиденная</h2>
          <p>
            Наш кот заигрался в проводах и отключил сайт. Уже всё чиним, попр
            обуйте зайти через 5 минут.
          </p>
        </div>
        <button></button>
      </article>
    </section>
  )
}

export default NotFound
