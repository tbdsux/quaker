import { useRouter } from 'next/router'
import Error from 'next/error'
import useSWR from 'swr'
import Layout from '@components/Layout'
import { FormEvent } from 'react'

const FormLinkRender = () => {
  const router = useRouter()
  const { formlink } = router.query
  const { data, error } = useSWR(`/api/forms/${formlink}`)

  if (error) {
    return <Error statusCode={404} />
  }

  if (!data) {
    return <div>Loading...</div>
  }

  // ===> MAIN FUNCTIONS
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Layout title={`${data.name} - Quaker Forms`}>
      <div className="py-14 w-5/6 mx-auto">
        <header className="text-center">
          <h3 className="text-4xl font-black tracking-wide">{data.name}</h3>
        </header>

        <hr className="my-4" />

        {/* render form fields */}
        <div className="w-1/2 mx-auto">
          <form onSubmit={handleSubmitForm}>
            {data.fields.map((field) => (
              <div className="my-2" key={data.fields.indexOf(field)}>
                <label
                  className="text-lg tracking-wide mb-1"
                  htmlFor={field.question}
                >
                  {field.question}
                </label>
                {field.type == 'user-input' ? (
                  <div>
                    <input
                      className="py-2 text-lg border px-4 rounded-md w-full"
                      name={field.question.toLowerCase()}
                      type="text"
                    />
                  </div>
                ) : field.type == 'text-input' ? (
                  <div>
                    <textarea
                      className="py-2 text-lg rounded-md border h-32 w-full"
                      name={field.question}
                    ></textarea>
                  </div>
                ) : null}
              </div>
            ))}

            <div className="mt-6">
              <button
                type="submit"
                className="py-2 px-8 bg-teal-500 hover:bg-teal-600 text-white rounded-md text-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default FormLinkRender
