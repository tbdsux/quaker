import { useRef, useState } from 'react';
import Router from 'next/router';
import { Magic } from 'magic-sdk';

import Layout from '@components/Layout';
import Menu from '@components/shared/Menu';

import { useSession } from '@lib/wrapper/useSession';
import { withPageAuthForm } from '@lib/wrapper/withPageAuth';

const Login = withPageAuthForm(() => {
  const { setSession } = useSession();
  const [errorMsg, setErrorMsg] = useState('');
  const btnAuthRef = useRef<HTMLButtonElement>();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    // btn authref
    btnAuthRef.current.innerHTML = 'Authenticating...';
    btnAuthRef.current.disabled = true;

    // get email
    const body = {
      email: e.currentTarget.email.value
    };

    // login to magic
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
    const didToken = await magic.auth.loginWithMagicLink({
      email: body.email
    });

    // post form after,
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isLoggedIn) {
          setSession({
            user: data.user,
            isLoggedIn: !!data.user
          });
          Router.push('/user/dashboard');
        }
      })
      .catch((e) => {
        console.error(e);
        setErrorMsg(e);
      });
  };

  return (
    <Layout title="User Login | quaker">
      <Menu />

      <div className="py-24 w-11/12 mx-auto">
        <div className="text-center">
          <h1 className="text-4xl text-gray-700 font-extrabold">Login with your email address</h1>

          <div className="mt-8 flex flex-col w-2/5 mx-auto">
            <form className="" onSubmit={handleSubmit}>
              <div className="flex flex-col text-left">
                <label htmlFor="email" className="text-xl">
                  Your email address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="mt-2 py-3 px-6 border rounded-full text-2xl"
                />
              </div>
              <button
                ref={btnAuthRef}
                type="submit"
                className="disabled:opacity-70 mt-4 py-3 px-6 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-lg font-semibold tracking-wide"
              >
                Sign Up / Log In
              </button>
            </form>

            <p>{errorMsg}</p>
            {/* 
            // SOCIAL LOGIN WILL BE IMPLEMENTED SOON XD
            <button className="py-3 my-1 text-xl font-semibold tracking-wide text-white rounded-full w-full bg-blue-400 hover:bg-blue-500">
              Login with Facebook
            </button>
            <button className="py-3 my-1 text-xl font-semibold tracking-wide text-white rounded-full w-full bg-lightBlue-400 hover:bg-lightBlue-500">
              Login with Twitter
            </button>
            <button className="py-3 my-1 text-xl font-semibold tracking-wide text-white rounded-full w-full bg-red-400 hover:bg-red-500">
              Login with Google
            </button>
            <button className="py-3 my-1 text-xl font-semibold tracking-wide text-white rounded-full w-full bg-coolGray-400 hover:bg-coolGray-500">
              Login with Github
            </button> */}
          </div>
        </div>
      </div>
    </Layout>
  );
});

export default Login;
