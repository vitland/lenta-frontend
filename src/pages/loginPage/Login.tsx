import Styles from "./Login.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"
import {loginUser} from "../../features/user/userSlice";
import {isValidLength, validateEmail} from "../../utils/validate";
import {useAppDispatch} from "../../app/hooks";

type Validate = {
  email?: boolean;
  password?: boolean
}

function Login() {
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isValidForm, setIsValidForm] = useState<undefined | Validate>({email: false, password: false})
  const onSubmit = (submitEmail?: string, submitPass?: string) => {
    if (submitEmail && submitPass) {
      dispatch(loginUser({email: submitEmail, password: submitPass})).then(() => {
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
                onChange={(e) => {
                  const isValidOnChange = validateEmail(e.target.value)
                  setIsValidForm(prev => ({...prev, email: isValidOnChange}))
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className={Styles.input__wrapper}>
              <input
                className={Styles.form__input}
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  const isValidOnChange = isValidLength(e.target.value)
                  setIsValidForm(prev => ({...prev, password: isValidOnChange}))
                  setPassword(e.target.value)
                }}
              />
            </div>
            <button
              className={classNames(
                Styles.login__btn,
                isValidForm?.email && isValidForm?.password && Styles.login__btn_active,
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
