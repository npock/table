import { useState } from 'react'
import { Profession } from './components/Profession'
import { Qualities } from './components/Qualities'
//import { data } from './data'
import { RegisrationForm } from './components/RegistartionForm/RegistartionForm'
import { useUsers } from './Provider/userProvider'
import './Table.css'
import { CreateUserForm } from './components/ui/CreateUserForm/CreateUserForm'
import { useAuth } from './Provider/AuthProvider'
import { useQualities } from './Provider/QualitiesProvider'
import { Link } from 'react-router-dom'
import { useProfessions } from './Provider/ProfessionProvider'
import { NotificationList } from './toastifycastom/tostify'
// import { ToastContainer, toast } from 'react-toastify'

function Table() {
  // const notify = () => toast('Wow so easy!')
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const { users } = useUsers()
  const { login } = useAuth()
  const { getQualitiesById } = useQualities()
  const { getProfessionsById } = useProfessions()

  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (item) => {
        return <Link to={`/users/${item._id}`}>{item.name}</Link>
      },
    },
    rate: {
      path: 'rate',
      name: 'Рейтинг',
      component: (item) => {
        return <span>{item.rate}</span>
      },
    },
    qualities: {
      name: 'Качества',
      component: (item) => {
        return <Qualities qualities={getQualitiesById(item.qualities)} />
      },
    },
    profession: {
      name: 'Профессия',
      path: 'profession',
      component: (item) => (
        <Profession profession={getProfessionsById(item.profession)} />
      ),
    },
    delete: {
      name: 'Удалить',
      component: (item) => {
        return (
          <button onClick={() => console.log('delete', item)}>Удалить</button>
        )
      },
    },
  }

  const renderColumn = (item, column) => {
    const component = columns[column].component
    if (component && typeof component === 'function') {
      return component(item)
    } else {
      return item[column]
    }
  }

  const handleSort = (item) => {
    setSortBy({
      path: item,
      order: sortBy.order === 'asc' ? 'desc' : 'asc',
    })
  }

  const getValueByPath = (object, path) => {
    if (!path) {
      return
    }
    return path.split('.').reduce((acc, key) => acc?.[key], object)
  }

  const sortedUsers = users.slice().sort((a, b) => {
    const aValue = getValueByPath(a, sortBy.path)
    const bValue = getValueByPath(b, sortBy.path)

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortBy.order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortBy.order === 'asc' ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const renderArrow = (selectSort, currentPath) => {
    if (selectSort.path === currentPath) {
      if (selectSort.order === 'asc') {
        return '▲'
      } else {
        return '▼'
      }
    }
  }

  return (
    <>
      <button onClick={login}>login</button>
      {/* <RegisrationForm />
      <CreateUserForm /> */}
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            {Object.keys(columns).map((key) => (
              <th
                key={key}
                onClick={
                  columns[key].path && handleSort.bind(null, columns[key].path)
                }
              >
                {columns[key].name}
                {renderArrow(sortBy, columns[key].path)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((item) => {
            return (
              <tr key={item._id}>
                {Object.keys(columns).map((column) => (
                  <td key={column}>{renderColumn(item, column)} </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <NotificationList></NotificationList>
        {/* {notify()}
        <button onClick={notify}>Notify!</button> */}
        {/* <ToastContainer /> */}
      </div>
    </>
  )
}

export default Table
