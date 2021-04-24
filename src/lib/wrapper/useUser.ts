import { UserContextProps } from './provider';
import { useSession } from './useSession';

type UseUserProps = {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: UserContextProps;
};

// PS: I don't know if this is the best solution.
const useUser = (): UseUserProps => {
  const { session, isSessionLoading } = useSession();

  return { isLoading: isSessionLoading, ...session };
};

export { useUser };
