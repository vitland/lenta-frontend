import React from "react"
import img from "../../images/404x4.png"
function NotFound() {
  return (
    <section>
      <img src={img} alt="Страница не найдена" />
      <article>
        <h2>Непредвиденная</h2>
        <p>
          Наш кот заигрался в проводах и отключил сайт. Уже всё чиним,
          попробуйте зайти через 5 минут.
        </p>
        <button></button>
      </article>
    </section>
  )
}

export default NotFound
