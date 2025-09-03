import { Navigate, useParams, Link } from 'react-router-dom'
import { EditUserPage } from '../Layouts/EditUserPage'

export const UserLayouts = () => {
  const { id, edit } = useParams()
  return (
    <>
      {id ? (
        edit === 'edit' ? (
          <EditUserPage userId={id} />
        ) : (
          <>
            <h1>user{id}</h1>
            <button>
              <Link to={`/users/${id}/edit`}>edit</Link>
            </button>
          </>
        )
      ) : (
        <Navigate to={'/'} replace />
      )}
    </>
  )
}
