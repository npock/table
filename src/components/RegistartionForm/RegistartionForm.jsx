import { useEffect, useState } from 'react'
import { TextField } from '../../components/TextField/TextField'
import style from './Registration.module.css'
import { validator } from '../../utils/validator'

export const RegisrationForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState({})

  const userSchema = {
    name: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Минимум 2 символа', value: 2 },
      max: { message: 'Максимум 10 символов', value: 10 },
    },
    email: {
      isRequired: { message: 'Обязательное поле' },
      isEmail: { message: 'Введите корректный email' },
    },
    password: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Минимум 6 символов', value: 6 },
      max: { message: 'Максимум 10 символов', value: 10 },
    },
    confirmPassword: {
      checkPassword: {
        message: 'Пароли не совпадают',
        ref: 'password',
      },
    },
  }

  const validate = () => {
    const error = validator(userData, userSchema)
    setError(error)
    return Object.keys(error).length === 0
  }

  const isValid = Object.keys(error).length === 0

  useEffect(() => {
    validate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...newUserData } = userData
    registerAcc(newUserData)
    console.log(newUserData)
  }

  const registerAcc = async (data) => {
    const response = await fetch(
      'http://94.228.114.203:3004/api/auth/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    )
    const result = await response.json()
    console.log(result)
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setUserData({ ...userData, [name]: value })
  }
  return (
    <>
      <div className={style.registartionFormContiner}>
        <h2>Regisration</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Имя"
            placeholder="Введите имя"
            value={userData.name}
            onChange={handleChange}
            error={error?.name}
            type="text"
          />

          <TextField
            name="email"
            label="Email"
            placeholder="Введите Email"
            value={userData.email}
            onChange={handleChange}
            error={error?.email}
            type="text"
          />
          <TextField
            name="password"
            label="password"
            placeholder="Введите password"
            value={userData.password}
            onChange={handleChange}
            error={error?.password}
            type="text"
          />
          <TextField
            name="confirmPassword"
            label="Повтор Пароля"
            placeholder="Введите повторяющий password"
            value={userData.confirmPassword}
            onChange={handleChange}
            error={error?.confirmPassword}
            type="text"
          />

          <button className={style.register} disabled={!isValid} type="submit">
            Зарегестрироваться
          </button>
        </form>
      </div>
    </>
  )
}
