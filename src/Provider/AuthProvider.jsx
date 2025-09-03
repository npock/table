import { createContext, useContext, useState } from 'react'
import { http } from '../http'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  //const [user,setUser]=useState({})

  const login = async () => {
    try {
      const { data } = await http.post('auth/login', {
        email: 'user@example.com',
        password: '12345678',
      })
      console.log(data)
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      setIsAuth(true)
    } catch (error) {
      console.log(error)
    }
  }

  const createUser = async (payload) => {
    try {
      const { data } = await http.post('users', payload)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  const register = async (payload) => {
    try {
      const { data } = await http.post('auth/register', payload)
      console.log(data)
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      setIsAuth(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext value={{ login, register, createUser, isAuth }}>
      {children}
    </AuthContext>
  )
}
