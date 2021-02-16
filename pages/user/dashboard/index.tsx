import Router from 'next/router'
import { useUser } from '../../../lib/hooks'

import Layout from '../../../components/Layout'
import Menu from '../../../components/dashboard/Menu'

const UserDashboard = () => {
  const user = useUser({ redirectTo: '/login' })

  if (user && user.name === '') {
    Router.push('/user/dashboard/welcome')
  }

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
