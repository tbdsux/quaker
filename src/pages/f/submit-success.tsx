import Head from 'next/head'

const SubmitSuccessPage = () => {
  return (
    <>
      <Head>
        <title>Form Submitted! - Quaker Forms</title>
      </Head>
      <div className="h-screen w-full flex items-center justify-center">
        <div>
          <p>Form has been submitted! Thank you!</p>
        </div>
      </div>
    </>
  )
}

export default SubmitSuccessPage
