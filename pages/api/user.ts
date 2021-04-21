import type { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@lib/auth';
import { UserModel } from '@lib/models/user-model';
import methodHandler from '@utils/middleware/method-handler';
import sessionHandler from '@utils/middleware/session-handler';

async function user(req: NextApiRequest, res: NextApiResponse) {
  const session = await getLoginSession(req);

  // // query db info
  // const userModel = new UserModel()
  // const user = await userModel.getUserByEmail(session.email)

  // // query result is undefined
  // if (!user) {
  //   return res.status(500).end()
  // }

  return res.status(200).json({ user: session || null });
}

export default methodHandler(user, ['GET']);
