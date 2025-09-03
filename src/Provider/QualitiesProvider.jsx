import { createContext, useContext, useState, useEffect } from 'react'
import { http } from '../http'

const QualitiesContext = createContext()

export const useQualities = () => useContext(QualitiesContext)

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getQualities = async () => {
    setIsLoading(true)
    try {
      const { data } = await http.get('qualities')

      setQualities(data)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      setIsLoading(false)
    }
  }

  const getQualitiesById = (ids) => {
    return qualities.filter((qual) => ids.includes(qual._id))
  }

  useEffect(() => {
    getQualities()
  }, [])

  return (
    <QualitiesContext value={{ qualities, getQualitiesById }}>
      {!isLoading && children}
    </QualitiesContext>
  )
}
