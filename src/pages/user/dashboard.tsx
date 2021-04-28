import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

import Layout from '@components/Layout';
import Menu from '@components/dashboard/DashMenu';
import { NewFormModal } from '@components/modals/new-form';
import { UserLoading } from '@components/loading/user';

import { fetcher } from '@lib/fetcher';
import { useUser } from '@lib/wrapper/useUser';
import { withPageAuthRequired } from '@lib/wrapper/withPageAuth';
import { QueryFormsReponse } from 'pages/api/user/forms';

const UserDashboard = withPageAuthRequired(() => {
  const { user } = useUser();

  // const user = useUser({ redirectTo: "/login" });
  const { data: userForms } = useSWR<QueryFormsReponse>('/api/user/forms', fetcher);

  const [modal, setModal] = useState(false);

  // if (user) {
  // 	if (!user.name) {
  // 		Router.push("/user/dashboard/welcome");
  // 	}
  // }

  // loading info while trying to get all forms
  if (!userForms && user) {
    return <UserLoading />;
  }

  return (
    <>
      {user && (
        <div>
          <Layout title="Dashboard | QuaKer">
            <Menu />

            <div className="w-11/12 mx-auto">
              <NewFormModal />

              <hr className="my-6" />
              {userForms && (
                <div className="flex flex-col w-5/6 mx-auto my-8">
                  {userForms.forms?.data.map((form) => (
                    <Link key={form.ts} href={`/user/dashboard/forms/${form.ref['@ref'].id}`}>
                      <a
                        className="py-4 border border-teal-500 hover:bg-teal-500 text-teal-900 hover:text-white my-2 px-4 rounded-md flex items-center justify-between"
                        title={`View form ${form.data.name}`}
                      >
                        <p className="text-lg font-bold tracking-wide">{form.data.name}</p>
                        <p className="text-sm">{new Date(form.data.createdDate).toUTCString()}</p>
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
  );
});

export default UserDashboard;
