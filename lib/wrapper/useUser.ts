import { useSession } from "./useSession";

const useUser = () => {
	const { session } = useSession();

	if (session) {
		return session;
	}
};

export { useUser };
