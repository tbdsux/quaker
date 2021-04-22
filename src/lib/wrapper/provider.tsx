import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from "react";
import useSWR from "swr";

type UserContextProps = {
	token: string;
	email: string;
	issuer: string;
	createdAt: number;
	maxAge: number;
};
type MagicUserContextProviderProps = {
	session: UserContextProps;
	setSession: Dispatch<SetStateAction<UserContextProps>>;
};
type QuakerMagicUserProviderProps = {
	children: ReactNode;
};

const MagicUserContext = createContext<MagicUserContextProviderProps>(null);

const QuakerMagicUserProvider = ({
	children,
}: QuakerMagicUserProviderProps) => {
	const [session, setSession] = useState<UserContextProps>();

	const { data, error } = useSWR("/api/user");
	const value = useMemo(() => ({ session, setSession }), [session]);

	useEffect(() => {
		if (data) {
			setSession(data.user);
		}
	}, [data]);

	return (
		<MagicUserContext.Provider value={value}>
			{children}
		</MagicUserContext.Provider>
	);
};

export default QuakerMagicUserProvider;
export { MagicUserContext };
export type { UserContextProps };
