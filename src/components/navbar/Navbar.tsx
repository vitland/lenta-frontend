import * as FaIcons from "react-icons/fa"
import { Link } from "react-router-dom"
import { SidebarData } from "../SidebarData"
import "./Navbar.css"
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
        <div className="navbar">
          <Link to="#" className="bars">
            <FaIcons.FaBars onClick={toggle} />
          </Link>
          <Logo />
          {/* To do!!! */}
          <h1 className="navbar__title">Главная</h1>
          <button className="navbar__profile">
            <h2 className="navbar__profile-name">Войти</h2>
            <CgIcons.CgProfile className="navbar__icon" />
          </button>
        </div>
        <div className="container">
          <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
            <div className="top-section"></div>
            {SidebarData.map((item, index) => (
              <NavLink to={item.path} key={index} className="link">
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link-text"
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
