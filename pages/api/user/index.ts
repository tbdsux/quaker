import type { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from '@lib/auth'
import { UserModel } from '@lib/models/user-model'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const session = await getLoginSession(req)

  if (session) {
    // query db info
    const userModel = new UserModel()
    const user = await userModel.getUserByEmail(session.email)

    res.status(200).json({ user: user.data || null })
  }

  res.status(404).json({ user: null })
}
