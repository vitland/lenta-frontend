import Styles from "./Login.module.css"

function Login() {
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
              />
            </div>
            <div className={Styles.input__wrapper}>
              <input
                className={Styles.form__input}
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>
            <button className={Styles.login__btn}>Войти</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
