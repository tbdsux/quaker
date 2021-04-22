import { useHasMounted } from '@lib/hooks/useHasMounted';
import { useUser } from '@lib/wrapper/useUser';
import Link from 'next/link';
import React from 'react';

const DashMenu = React.memo(() => {
  const mounted = useHasMounted();
  const user = useUser();

  if (!mounted) return null;

  return (
    <nav className="py-4 w-5/6 mx-auto flex items-center justify-between">
      <div>
        <h1 className="text-3xl tracking-wide font-extrabold text-teal-600">QuaKer</h1>
      </div>
      <ul className="flex items-center">
        <li className="px-8 text-lg">
          <Link href="/user/dashboard">
            <a className="font-bold tracking-wide text-coolGray-700 hover:text-teal-500">Forms</a>
          </Link>
        </li>
        <li className="pl-8 text-lg">
          <a
            href="/api/logout"
            className="font-bold tracking-wide text-coolGray-700 hover:text-teal-500"
          >
            Sign Out
          </a>
        </li>
        <li className="ml-8 px-10 text-lg rounded border border-teal-600 text-center">
          <p title={user.email} className="tracking-wide text-teal-600">
            {user.email}
          </p>
        </li>
      </ul>
    </nav>
  );
});

export default DashMenu;
