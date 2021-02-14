import { useUser } from '../../../lib/hooks'

import Layout from '../../../components/Layout'
import Menu from '../../../components/dashboard/Menu'

const UserDashboard = () => {
  const user = useUser({ redirectTo: '/login' })

  return (
    <Layout title="Dashboard | QuaKer">
      <Menu />
      <hr />

      <div>
        {user && (
          <div>
            hello <p>{JSON.stringify(user, null, 2)}</p>
          </div>
        )}
        <div></div>
      </div>
    </Layout>
  )
}

export default UserDashboard
