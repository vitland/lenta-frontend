import Styles from "./Login.module.css"
import { useState } from "react"
import { login } from "../../service"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"

function Login() {
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const onSubmit = (submitEmail?: string, submitPass?: string) => {
    if (submitEmail && submitPass) {
      login(submitEmail, submitPass).then(() => {
        navigate("/")
      })
    }
  }
  return (
    <>
      <div className={Styles.login}>
        <div className={Styles.login__container}>
          <h1 className={Styles.login__title}>Вход</h1>
          <form className={Styles.login__form}>
            <div className={Styles.input__wrapper}>
              <input
                className={Styles.form__input}
                name="email"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={Styles.input__wrapper}>
              <input
                className={Styles.form__input}
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className={classNames(
                Styles.login__btn,
                password && email && Styles.login__btn_active,
              )}
              onClick={() => onSubmit(email, password)}
              type="button"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
