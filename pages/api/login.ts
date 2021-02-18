import type { NextApiRequest, NextApiResponse } from 'next'
import { magic } from '@lib/magic'
import { setLoginSession } from '@lib/auth'
import { UserModel } from '@lib/models/user-model'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const didToken = req.headers.authorization.substr(7)
    const { email, issuer } = await magic.users.getMetadataByToken(didToken)
    // const session = { ...metadata }

    const userModel = new UserModel()
    const user =
      (await userModel.getUserByEmail(email)) ??
      (await userModel.createUser(email))
    const token = await userModel.obtainFaunaDBToken(user)

    await setLoginSession(res, { token, email, issuer })

    res.status(200).send({ done: true })
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
}
