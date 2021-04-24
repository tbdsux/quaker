import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import useSWR from 'swr';

type UserContextProps = {
  token: string;
  email: string;
  issuer: string;
  createdAt: number;
  maxAge: number;
};

type SessionUserProps = {
  user: UserContextProps | null;
  isLoggedIn: boolean;
};
type MagicUserContextProviderProps = {
  session: SessionUserProps;
  isSessionLoading: boolean;
  setSession: Dispatch<SetStateAction<SessionUserProps>>;
};
type QuakerMagicUserProviderProps = {
  children: ReactNode;
};

const MagicUserContext = createContext<MagicUserContextProviderProps>(null);

const QuakerMagicUserProvider = ({ children }: QuakerMagicUserProviderProps) => {
  const [session, setSession] = useState<SessionUserProps>(null);

  const fetchUser = useCallback(async (): Promise<void> => {
    const r = await fetch('/api/user', {
      method: 'GET'
    });
    const data = await r.json();
    setSession({
      user: data.user,
      isLoggedIn: !!data.user
    });
  }, []);

  useEffect(() => {
    if (session?.user) return;
    (async () => {
      await fetchUser();
    })();
  }, [session?.user]);

  return (
    <MagicUserContext.Provider value={{ session, setSession, isSessionLoading: !session }}>
      {children}
    </MagicUserContext.Provider>
  );
};

export default QuakerMagicUserProvider;
export { MagicUserContext };
export type { UserContextProps };
