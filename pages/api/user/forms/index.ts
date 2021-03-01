import type { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from '@lib/auth'
import { FormsModel } from '@lib/models/forms-model'
import methodHandler from '@utils/middleware/method-handler'
import sessionHandler from '@utils/middleware/session-handler'

async function query_forms(req: NextApiRequest, res: NextApiResponse) {
  const session = await getLoginSession(req)

  // query db info
  const formsModel = new FormsModel()
  const forms = await formsModel.queryForms(session.email)

  // query result is undefined
  if (!forms) {
    return res.status(500).end()
  }

  return res.status(200).json({ forms: forms || null })
}

export default methodHandler(sessionHandler(query_forms), ['GET'])
