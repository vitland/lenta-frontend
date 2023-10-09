import { SidebarData } from "../SidebarData"
import styles from "./Navbar.module.css"
import { NavLink, useLocation } from "react-router-dom"
import Logo from "../logo/Logo"

interface NavbarProps {
  children: React.ReactNode
}

function Navbar(props: NavbarProps) {
  const { pathname } = useLocation()

  return (
    <>
      <div className={styles.container}>
        <div
          style={{ display: pathname === "/sign-in" ? "none" : "" }}
          className={styles.sidebar}
        >
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
        <main style={{ padding: pathname === "/sign-in" ? "0" : "20px" }}>
          {props.children}
        </main>
      </div>
    </>
  )
}

export default Navbar
