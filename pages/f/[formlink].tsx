import Router, { useRouter } from 'next/router'
import Error from 'next/error'
import useSWR from 'swr'
import Layout from '@components/Layout'
import { FormEvent } from 'react'
import { answerFormData } from '@utils/form-data'

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

  // RENDER 404 IF NO FIELDS DEFINED IN THE FORM
  // THIS IS TO PREVENT UNNECESSARY SUBMISSIONS WITH NO FIELDS
  if (data && data.fields.length < 1) {
    return <Error statusCode={404} />
  }

  // ===> MAIN FUNCTIONS
  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    var answers = {}

    // extract form answers
    data.fields.map((field) => {
      answers[field.question] = e.currentTarget[field.question]['value']
    })

    // form submit
    const answerData: answerFormData = {
      formlinkId: Array.isArray(formlink) ? formlink.join() : formlink,
      answers: answers,
    }

    await fetch('/api/forms/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answerData),
    })
      .then((res) => {
        if (res.ok) {
          Router.push('/f/submit-success')
        } else {
          return <Error statusCode={res.status} />
        }
      })
      .catch((e) => {
        console.error(e)
      })
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
                      name={field.question}
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
