import Router from 'next/router'
import { FormEvent, useRef } from 'react'
import Layout from '@components/Layout'
import { useUser } from '@lib/hooks'

const UserWelcome = () => {
  const user = useUser({ redirectTo: '/login' })

  // redirect to dashboard if user has name set
  if (user) {
    if (user.name) {
      Router.push('/user/dashboard')
    }
  }

  const setNameInput = useRef<HTMLInputElement>(null)

  const handleSetName = async (e: FormEvent) => {
    e.preventDefault()

    const body = {
      name: setNameInput.current.value,
      email: user.email,
    }

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (res.status === 200) {
        Router.push('/user/dashboard')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Layout title="Welcome to QuaKer">
      {user && !user.name && (
        <div className="absolute w-full h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-black text-coolGray-700">
              Welcome to <span className="underline text-teal-500">QuaKer</span>
            </h1>
            <div className="mt-8">
              <h2 className="text-3xl text-coolGray-700">
                Before you continue, what should we call you?
              </h2>

              <form className="mt-8 text-center" onSubmit={handleSetName}>
                <input
                  ref={setNameInput}
                  type="text"
                  name="name"
                  className="py-3 px-6 w-full rounded-full border-2 text-xl text-center"
                  placeholder="Please enter your name / username"
                />

                <button
                  type="submit"
                  className="mt-4 py-2 p-8 rounded-full bg-teal-500 hover:bg-teal-600 text-white text-lg uppercase"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default UserWelcome
