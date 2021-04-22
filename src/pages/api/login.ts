import type { NextApiRequest, NextApiResponse } from 'next';
import { magic } from '@lib/magic';
import { setLoginSession } from '@lib/auth';
import { UserModel } from '@lib/models/user-model';
import methodHandler from '@utils/middleware/method-handler';

async function login(req: NextApiRequest, res: NextApiResponse) {
  const didToken = req.headers.authorization.substr(7);
  const { email, issuer } = await magic.users.getMetadataByToken(didToken);
  // const session = { ...metadata }

  const userModel = new UserModel();
  const user = await userModel.registerUser(email);

  // registerUser will return the user data if it is new
  // but will return false if it already exists
  if (user === undefined) {
    return res.status(500).send({
      isLoggedIn: false,
      user: {},
      error: { message: 'There was a problem trying to login.' }
    });
  }

  const token = await userModel.obtainFaunaDBToken(email);

  if (!token) {
    return res.status(500).send({
      isLoggedIn: false,
      user: {},
      error: { message: 'Error with token. There was a problem trying to login.' }
    });
  }

  const userLoggedInData = await setLoginSession(res, {
    token,
    email,
    issuer
  });

  return res.status(200).send({ isLoggedIn: true, user: userLoggedInData });
}

export default methodHandler(login, ['POST']);
