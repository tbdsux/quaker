import { useUser } from '../../lib/hooks'

const UserDashboard = () => {
  const user = useUser({ redirectTo: '/login' })

  return (
    <div>
      {user && (
        <div>
          hello <p>{JSON.stringify(user, null, 2)}</p>
        </div>
      )}
      <div></div>
    </div>
  )
}

export default UserDashboard
