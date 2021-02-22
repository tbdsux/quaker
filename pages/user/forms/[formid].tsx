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

          <div className="w-4/5 mx-auto py-12">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-2xl tracking-wide underline text-teal-500">
                form.name
              </h3>
              <button className="bg-coolGray-500 hover:bg-coolGray-600 text-white py-2 px-8 tracking-wide">
                Add Field
              </button>
            </div>
          </div>
        </Layout>
      )}
    </>
  )
}

export default ModifyForm
