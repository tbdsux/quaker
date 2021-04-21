import { useContext } from "react";
import { MagicUserContext } from "./provider";

const useSession = () => {
	const context = useContext(MagicUserContext);

	if (context === undefined) {
		throw new Error("need to wrap");
	}
	return context;
};

export { useSession };
