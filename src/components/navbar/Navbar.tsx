import { SidebarData } from "../SidebarData"
import styles from "./Navbar.module.css"
import { NavLink } from "react-router-dom"
import Logo from "../logo/Logo"

interface NavbarProps {
  children: React.ReactNode
}

function Navbar(props: NavbarProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Logo />
          <div className={styles.topSection}></div>
          {SidebarData.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              <div className={styles.linkText}>{item.name}</div>
            </NavLink>
          ))}
        </div>
        <main>{props.children}</main>
      </div>
    </>
  )
}

export default Navbar
