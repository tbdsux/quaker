import type { NextApiRequest, NextApiResponse } from 'next'
import { magic } from '@lib/magic'
import { removeTokenCookie } from '@lib/auth-cookies'
import { getLoginSession } from '@lib/auth'
import { UserModel } from '@lib/models/user-model'

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await getLoginSession(req)
    const userModel = new UserModel()

    if (session) {
      await Promise.all([
        userModel.invalidateFaunaDBToken(session.token),
        magic.users.logoutByIssuer(session.issuer),
      ])
      removeTokenCookie(res)
    }
  } catch (error) {
    console.error(error)
  }

  res.writeHead(302, { Location: '/' })
  res.end()
}
