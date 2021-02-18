import type { NextApiRequest, NextApiResponse } from 'next'
import { UserModel } from '@lib/models/user-model'

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userModel = new UserModel()

    // set user's name
    const user = await userModel.updateUserName(req.body.name, req.body.email)

    if (user) {
      res.status(200).send({ done: true })
    }
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
}
