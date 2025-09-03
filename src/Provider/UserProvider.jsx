import React, { createContext, useContext, useEffect, useState } from 'react'
import { http } from '../http'

const UserContext = createContext()

export const useUsers = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getUsers = async () => {
    setIsLoading(true)
    try {
      const { data } = await http.get(
        'users?page=1&limit=30&sortBy=name&order=asc'
      )

      setUsers(data.data)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      setIsLoading(false)
    }
  }

  const getUserById = async (id) => {
    try {
      const data = await http.get(`users/${id}`)
      return data
    } catch (error) {
      setError(error)
    }
  }

  const updateUser = async (id, payload) => {
    try {
      const { data } = await http.put(`users/${id}`, payload)
      const indexUser = users.findIndex((user) => user._id === id)
      const copyArray = [...users]
      copyArray[indexUser] = data
      setUsers(copyArray)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <UserContext value={{ users, getUserById, updateUser }}>
      {isLoading ? <h2>...loading</h2> : children}
    </UserContext>
  )
}
