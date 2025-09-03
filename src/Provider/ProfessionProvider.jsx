import { createContext, useContext, useState, useEffect } from 'react'
import { http } from '../http'

const ProfessionsContext = createContext()

export const useProfessions = () => useContext(ProfessionsContext)

export const ProfessionsProvider = ({ children }) => {
  const [professions, setProfessions] = useState([])
  const [, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const getProfessions = async () => {
    setIsLoading(true)
    try {
      const { data } = await http.get('professions')

      setProfessions(data)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      setIsLoading(false)
    }
  }

  const getProfessionsById = (id) => {
    return professions.filter((profession) => id === profession._id)[0]
  }

  useEffect(() => {
    getProfessions()
  }, [])

  return (
    <ProfessionsContext value={{ professions, getProfessionsById }}>
      {!isLoading && children}
    </ProfessionsContext>
  )
}
