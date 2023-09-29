import React from "react"
import * as AiIcons from "react-icons/ai"
import { VscGraphLine, VscGraph } from "react-icons/vsc"

export const SidebarData = [
  {
    path: "/",
    name: "Главная",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    path: "/forecast",
    name: "Прогноз",
    icon: <VscGraphLine />,
    cName: "nav-text",
  },
  {
    path: "/statistics",
    name: "Статистика",
    icon: <VscGraph />,
    cName: "nav-text",
  },
]
