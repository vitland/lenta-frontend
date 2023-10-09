import styles from "./Header.module.css"
import { logout } from "../../service"
import { useNavigate } from "react-router-dom"
import { Routes } from "../../types/apiRoutes"
import {getCurrentUser} from "../../features/user/userSlice";
import {useAppSelector} from "../../app/hooks";

interface HeaderProps {
  title: string
}

function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const user = useAppSelector(getCurrentUser)

  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>{props.title}</h1>
      <h2 className={styles.user__name}>{user?.first_name + user?.last_name}</h2>
      <button
        className={styles.exitIcon}
        onClick={() =>
          logout().then(() => {
            navigate(Routes.signIn)
          })
        }
      ></button>
    </div>
  )
}

export default Header
