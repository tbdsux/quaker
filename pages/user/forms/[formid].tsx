import { useRouter } from 'next/router'

import Layout from '@components/Layout'
import Menu from '@components/dashboard/Menu'
import { useUser } from '@lib/hooks'

const ModifyForm = () => {
  const user = useUser({ redirectTo: '/login' })

  const router = useRouter()

  const { formid } = router.query

  return (
    <>
      {user && (
        <Layout title="hehe">
          <Menu username={user.name} />
          <div>hi</div>
        </Layout>
      )}
    </>
  )
}

export default ModifyForm
