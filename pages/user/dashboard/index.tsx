import { FormEvent, useEffect, useRef, useState } from 'react'
import Router from 'next/router'
import { useUser } from '@lib/hooks'
import useSWR from 'swr'

import Layout from '@components/Layout'
import Menu from '@components/dashboard/Menu'
import Modal from '@components/Modal'
import Link from 'next/link'
import { fetcher } from '@lib/fetcher'

const UserDashboard = () => {
  const user = useUser({ redirectTo: '/login' })
  const formName = useRef<HTMLInputElement>(null)
  const { data } = useSWR('/api/user/forms', fetcher)
  const [forms, setForms] = useState([])

  useEffect(() => {
    if (data) {
      setForms(data?.forms.data)
    }
  }, [data])

  const [modal, setModal] = useState(false)

  if (user) {
    if (!user.name) {
      Router.push('/user/dashboard/welcome')
    }
    // const { data, error } = useSWR('/api/user/forms', fetcher)
    // console.log(data)
  }

  const userCreateForm = async (e: FormEvent) => {
    e.preventDefault()

    const dat = {
      user: user.email,
      name: formName.current.value,
    }

    // TODO: DIRECT-IMPLEMENTATION
    try {
      await fetch('/api/user/forms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dat),
      })
        .then((result) => {
          if (result.status === 200) {
            return result.json()
          }
        })
        .then((res) => {
          setModal(false)

          Router.push(`/user/forms/${res.form.ref['@ref'].id}`)
        })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      {user && (
        <div>
          <Layout title="Dashboard | QuaKer">
            {/* modals in here */}
            <Modal
              open={modal}
              modal={setModal}
              modalClass="w-1/2 mx-auto rounded-md"
            >
              <h3 className="text-2xl font-bold text-coolGray-700">
                Create a new form
              </h3>
              <div className="mt-8">
                <form onSubmit={userCreateForm}>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="form-title"
                      className="mb-2 text-lg tracking-wide"
                    >
                      What's the name / title of your form?
                    </label>
                    <input
                      ref={formName}
                      type="text"
                      className="py-2 px-4 text-xl border-2 rounded-md"
                      placeholder="Your form name or title"
                    />
                  </div>
                  <div className="mt-6 flex flex-row justify-end">
                    <button
                      type="submit"
                      onClick={userCreateForm}
                      className="mr-1 py-2 px-6 rounded-md text-lg bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => setModal(false)}
                      className="py-2 px-6 rounded-md text-lg bg-gray-500 hover:bg-gray-600 text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </Modal>

            <Menu username={user.name} />
            <hr />

            <div className="w-11/12 mx-auto">
              <div>
                <div className="mt-8">
                  <button
                    onClick={() => setModal(true)}
                    className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-8"
                  >
                    Create New Form
                  </button>
                </div>
              </div>

              <hr className="my-6" />
              {forms && (
                <div className="flex flex-col">
                  {forms.map((form) => (
                    <Link
                      key={form.ts}
                      href={`/user/forms/${form.ref['@ref'].id}`}
                    >
                      <a className="py-2 bg-teal-400 my-1 px-4 rounded-md text-white text-lg">
                        <p>{form.data.name}</p>
                        <p>{JSON.stringify(form)}</p>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Layout>
        </div>
      )}
    </>
  )
}

export default UserDashboard
