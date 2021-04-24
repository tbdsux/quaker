import { useHasMounted } from '@lib/hooks/useHasMounted';
import { useUser } from '@lib/wrapper/useUser';
import Router from 'next/router';
import { ComponentType, useEffect } from 'react';

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
    const mounted = useHasMounted();
    const { isLoggedIn } = useUser();

    if (mounted && isLoggedIn) {
      Router.push(options?.redirectTo ? options.redirectTo : '/user/dashboard');
    }

    if (!isLoggedIn) return <PageComponent {...props} />;

    return <></>;
  };
};

const withPageAuthRequired: WithPageAuthProps = (PageComponent, options) => {
  return function withPageAuth(props): JSX.Element {
    const { isLoggedIn, user, isLoading } = useUser();

    useEffect(() => {
      if (!isLoggedIn && !user && !isLoading) {
        Router.push(options?.redirectTo ? options.redirectTo : '/login');
      }
    }, [isLoggedIn, user]);

    if (isLoggedIn) return <PageComponent {...props} />;

    return <></>;
  };
};

export { withPageAuthForm, withPageAuthRequired };
