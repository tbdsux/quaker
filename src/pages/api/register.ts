import type { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '@lib/models/user-model';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  const user = new UserModel();
  await user
    .registerUser('iamcoderx@gmail.com')
    .then((r) => {
      console.log(r);
    })
    .catch((e) => console.error(e));

  res.end('sample register');
}
