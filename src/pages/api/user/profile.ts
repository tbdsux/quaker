import type { NextApiRequest, NextApiResponse } from 'next'
import { UserModel } from '@lib/models/user-model'
import methodHandler from '@utils/middleware/method-handler'
import sessionHandler from '@utils/middleware/session-handler'

async function profile(req: NextApiRequest, res: NextApiResponse) {
  const userModel = new UserModel()

  // set user's name
  const user = await userModel.updateUserName(req.body.name, req.body.email)

  // query result is undefined
  if (!user) {
    return res.status(500).end()
  }

  return res.status(200).send({ done: true })
}

export default methodHandler(sessionHandler(profile), ['POST', 'PUT'])
