import Image from 'next/image'

import Layout from '@components/Layout'
import Menu from '@components/Menu'

const Home = () => {
  return (
    <Layout title="Quaker | Simple Forms Maker">
      <Menu />

      <div className="py-20 w-5/6 mx-auto flex items-end justify-between">
        <div className="w-2/3">
          <h1 className="text-7xl font-extrabold text-teal-500">
            Craft & Create <br />
            <span className="font-black underline">Amazing Forms</span> <br />
            for your questions
          </h1>
          <p className="mt-6 text-4xl font-bold text-gray-700">
            Build, publish and create online forms and get response easily
          </p>
          <div className="mt-8">
            <button className="py-4 px-5 bg-gray-50 text-xl rounded-lg border-teal-500 border-2 hover:bg-teal-500 hover:text-white">
              Learn More
            </button>
          </div>
        </div>
        <div className="">
          <Image src="/showcase.svg" height="300" width="400" />
        </div>
      </div>
    </Layout>
  )
}

export default Home
