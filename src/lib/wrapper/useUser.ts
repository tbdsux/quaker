import { UserContextProps } from './provider';
import { useSession } from './useSession';

type UseUserProps = {
  isLoading: boolean;
  user: UserContextProps | null;
};

const useUser = (): UseUserProps => {
  const { session } = useSession();

  if (session) {
    return {
      isLoading: false,
      user: session
    };
  }

  return {
    isLoading: true,
    user: null
  };
};

export { useUser };
