import { useHasMounted } from '@lib/hooks/useHasMounted';
import { UserContextProps } from './provider';
import { useSession } from './useSession';

type UseUserProps = {
  isLoading: boolean;
  user: UserContextProps | null;
};

// PS: I don't know if this is the best solution.
const useUser = (): UseUserProps => {
  const mounted = useHasMounted();
  const { session } = useSession();

  if (session) {
    return {
      isLoading: false,
      user: session
    };
  }

  if (!mounted)
    return {
      isLoading: true,
      user: null
    };

  return {
    isLoading: false,
    user: null
  };
};

export { useUser };
