import { useEffect, useState } from 'react'
import { TextField } from '../../TextField/TextField'
import { MultiSelect } from '../../MultiSelect/MultiSelect'
import style from './CreateUserForm.module.css'
import { data } from '../../../data'
import { SelectField } from '../../SelectField/SelectField'
import { validator } from '../../../utils/validator'
import { Qualities } from '../../Qualities'

export const CreateUserForm = () => {
  const optionQualities = Object.values(data.qualities).map((qual) => ({
    _id: qual._id,
    name: qual.name,
    color: qual.color,
    value: qual._id,
    label: qual.name,
  }))

  const optionProfessions = Object.keys(data.professions).map((key) => ({
    value: key,
    label: data.professions[key].name,
  }))
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    age: 0,
    profession: '',
    qualities: [],
    confirmPassword: '',
  })

  const [error, setError] = useState({})

  const userSchema = {
    name: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Минимум 2 символа', value: 2 },
      max: { message: 'Максимум 10 символов', value: 10 },
    },
    age: {
      isNumber: { message: 'Должно быть более 21', value: 21 },
    },
    profession: {
      isRequired: { message: 'Обязательное поле' },
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

  const handleChange = (e) => {
    const { value, name } = e.target
    setUserData({ ...userData, [name]: value })
  }

  function generateRandomId(length) {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const newUserData = {
      ...userData,
      _id: generateRandomId(24),
      profession: data.professions[userData.profession],
      age: Number(userData.age),
    }
    const newQualitoes = userData.qualities.map(({ name }) => name)
    const newUserData2 = {
      ...userData,
      age: Number(userData.age),
      qualities: newQualitoes,
    }
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...newUser } = newUserData2
    console.log(newUserData)
    //addNewUser(newUserData)
  }

  return (
    <div className={style.CreateFormContainer}>
      <h2>Update user</h2>
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
          name="age"
          label="Возраст"
          placeholder="Введите возраст"
          value={userData.age}
          onChange={handleChange}
          error={error?.age}
          type="number"
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

        <MultiSelect
          name="qualities"
          options={optionQualities}
          onChange={handleChange}
          defaultValue={userData.qualities}
        />
        <SelectField
          name="profession"
          label="Профессия"
          options={optionProfessions}
          onChange={handleChange}
          value={userData.profession}
          error={error?.profession}
        />
        <button disabled={!isValid} type="submit">
          Сохранить
        </button>
      </form>
    </div>
  )
}
