import { useEffect, useState } from 'react'
import { TextField } from '../../TextField/TextField'
import { SelectField } from '../../SelectField/SelectField'
import { MultiSelect } from '../../MultiSelect/MultiSelect'
import { validator } from '../../../utils/validator'
import { useQualities } from '../../../Provider/QualitiesProvider'
import { useProfessions } from '../../../Provider/ProfessionProvider'
import { useUsers } from '../../../Provider/userProvider'
import { useNavigate } from 'react-router-dom'
import style from './UpdateUserForm.module.css'

export const UpdateUserForm = ({ dataUser, userId }) => {
  const { qualities } = useQualities()
  const { professions, getProfessionsById } = useProfessions()
  const { updateUser } = useUsers()
  const navigate = useNavigate()

  const optionQualities = Object.values(qualities).map((qual) => ({
    value: qual._id,
    label: qual.name,
  }))

  const optionProfessions = Object.values(professions).map((key) => ({
    value: key._id,
    label: key.name,
  }))

  const newDataUserQualities = dataUser.qualities.map((qualId) => {
    const newQual = optionQualities.filter((objQual) => {
      if (objQual.value === qualId) {
        return objQual
      }
    })
    return { value: qualId, label: newQual[0].label }
  })

  const [userData, setUserData] = useState({
    name: dataUser.name,
    email: dataUser.email,
    rate: dataUser.rate,
    profession: dataUser.profession,
    qualities: newDataUserQualities,
  })

  const [error, setError] = useState({})

  const userSchema = {
    name: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Минимум 2 символа', value: 2 },
      max: { message: 'Максимум 30 символов', value: 30 },
    },
    rate: {
      isNumber: { message: 'Должно быть более 1', value: 1 },
    },
    profession: {
      isRequired: { message: 'Обязательное поле' },
    },
    email: {
      isRequired: { message: 'Обязательное поле' },
      isEmail: { message: 'Введите корректный email' },
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

  const onSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const newQualities = userData.qualities.map((qaul) => qaul.value)
    const newUserData = {
      ...userData,
      rate: Number(userData.rate),
      qualities: newQualities,
    }

    await updateUser(userId, newUserData)
    navigate(-1)
  }

  return (
    <div className={style.CreateFormContainer}>
      <h2>Update user</h2>
      <form onSubmit={onSubmit}>
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
          name="rate"
          label="Rating"
          placeholder="Введите rate"
          value={userData.rate}
          onChange={handleChange}
          error={error?.rate}
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

        <MultiSelect
          name="qualities"
          options={optionQualities}
          onChange={handleChange}
          defaultValue={newDataUserQualities}
        />
        <SelectField
          name="profession"
          label="Профессия"
          options={optionProfessions}
          onChange={handleChange}
          value={userData.profession}
          defaultValue={getProfessionsById(dataUser.profession).name}
          error={error?.profession}
        />
        <button disabled={!isValid} type="submit">
          Update
        </button>
      </form>
    </div>
  )
}
