import { useHasMounted } from '@lib/hooks/useHasMounted';
import { UserContextProps } from './provider';
import { useSession } from './useSession';

// PS: I don't know if this is the best solution.
const useUser = () => {
  const { session } = useSession();

  return session;
};

export { useUser };
