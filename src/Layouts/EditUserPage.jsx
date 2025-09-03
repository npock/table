import { useEffect, useState } from 'react'
import { useUsers } from '../Provider/userProvider'
import { UpdateUserForm } from '../components/ui/UpdateUserForm.jsx/UpdateUserForm'

export const EditUserPage = ({ userId }) => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { getUserById } = useUsers()

  useEffect(() => {
    getUserById(userId).then((res) => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [userId])

  if (isLoading) {
    return <h1>...loading</h1>
  }
  return <UpdateUserForm dataUser={data} userId={userId} />
}
