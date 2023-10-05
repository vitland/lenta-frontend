import styles from "./Header.module.css"

interface HeaderProps {
  title: string
}

function Header(props: HeaderProps) {
  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>{props.title}</h1>
      <h2 className={styles.user__name}>Кириллов&thinsp;Н.</h2>
      <a href="/sign-in" className={styles.exitIcon}></a>
    </div>
  )
}

export default Header
