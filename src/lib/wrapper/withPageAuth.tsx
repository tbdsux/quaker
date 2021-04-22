import { useUser } from '@lib/wrapper/useUser';
import { useHasMounted } from '@lib/hooks/useHasMounted';
import Router from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useSession } from './useSession';

// type UsePageAuthProps = {
//   redirectTo?: string;
// };

// const useAuthForms = (props?: UsePageAuthProps) => {
//   const { session } = useSession();

//   if (session) {
//     Router.push(props?.redirectTo ? props.redirectTo : '/user/dashboard');
//   }
// };

// const usePageAuthRequired = (props?: UsePageAuthProps) => {
//   const { session } = useSession();

//   if (session) {
//     Router.push(props?.redirectTo ? props.redirectTo : '/login');
//   }
// };

// export { useAuthForms, usePageAuthRequired };

// based from ::> https://github.com/auth0/nextjs-auth0/blob/main/src/frontend/with-page-auth-required.tsx

type WithPageAuthPropsOptions = {
  redirectTo?: string;
};

type WithPageAuthProps = <P extends object>(
  PageComponent: ComponentType<P>,
  options?: WithPageAuthPropsOptions
) => React.FC<P>;

const withPageAuthForm: WithPageAuthProps = (PageComponent, options) => {
  return function withPageAuth(props): JSX.Element {
    const { isLoading, user } = useUser();

    if (user && !isLoading) {
      Router.push(options?.redirectTo ? options.redirectTo : '/user/dashboard');
    }

    return <PageComponent {...props} />;
  };
};

const withPageAuthRequired: WithPageAuthProps = (PageComponent, options) => {
  return function withPageAuth(props): JSX.Element {
    const { isLoading, user } = useUser();

    if (!user && !isLoading) {
      Router.push(options?.redirectTo ? options.redirectTo : '/login');
    }

    return <PageComponent {...props} />;
  };
};

export { withPageAuthForm, withPageAuthRequired };
