import * as FaIcons from "react-icons/fa"
import { Link } from "react-router-dom"
import { SidebarData } from "../SidebarData"
import styles from "./Navbar.module.css"
import { IconContext } from "react-icons"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import Logo from "../logo/Logo"
import * as CgIcons from "react-icons/cg"

interface NavbarProps {
  children: React.ReactNode
}

function Navbar(props: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={styles.navbar}>
          <Link to="#" className={styles.bars}>
            <FaIcons.FaBars onClick={toggle} />
          </Link>
          <Logo />
          {/* To do!!! */}
          <h1 className={styles.navbar__title}>Главная</h1>
          <button className={styles.navbar__profile}>
            <h2 className={styles.navbar__profileName}>Войти</h2>
            <CgIcons.CgProfile className={styles.navbar__icon} />
          </button>
        </div>
        <div className={styles.container}>
          <div
            style={{ width: isOpen ? "200px" : "50px" }}
            className={styles.sidebar}
          >
            <div className={styles.topSection}></div>
            {SidebarData.map((item, index) => (
              <NavLink to={item.path} key={index} className={styles.link}>
                <div className={styles.icon}>{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles.linkText}
                >
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
          <main>{props.children}</main>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
