import { getLoginSession } from '@lib/auth';
import { NextApiRequest } from 'next';

const getTokenFromSession = async (req: NextApiRequest) => {
  const session = await getLoginSession(req);

  if (session) {
    return session.token;
  }
};

const getPublicToken = () => {
  return process.env.FAUNADB_PUBLIC_KEY;
};

export { getTokenFromSession, getPublicToken };
