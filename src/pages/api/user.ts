import type { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@lib/auth';
import methodHandler from '@utils/middleware/method-handler';

async function user(req: NextApiRequest, res: NextApiResponse) {
  const session = await getLoginSession(req);

  return res.status(200).json({ user: session || null });
}

export default methodHandler(user, ['GET']);
