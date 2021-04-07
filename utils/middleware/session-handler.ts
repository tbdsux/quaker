import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getLoginSession } from "@lib/auth";

// sessionHandler => handles user cookie (if exists, user is logged in; otherwise, returns error 403)
const sessionHandler = (handler: NextApiHandler) => async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const session = await getLoginSession(req);

	if (!session) {
		return res.status(403).json({});
	}

	return handler(req, res);
};

export default sessionHandler;
