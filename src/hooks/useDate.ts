import { useEffect, useState } from "react"
function getTime() {
  const date = new Date()
  return `${date.getFullYear()}-${date.toLocaleString("ru", {
    month: "2-digit",
  })}-${date.toLocaleString("ru", { day: "2-digit" })}`
}

function useDate() {
  const [date, setDate] = useState("")
  useEffect(() => {
    setDate(getTime())
  }, [])
  return date
}

export default useDate
