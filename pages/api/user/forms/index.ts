import type { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from '@lib/auth'
import { FormsModel } from '@lib/models/forms-model'
import methodHandler from '@utils/middleware/method-handler'

async function query_forms(req: NextApiRequest, res: NextApiResponse) {
  const session = await getLoginSession(req)

  if (session) {
    // query db info
    const formsModel = new FormsModel()

    const forms = await formsModel.queryForms(session.email)

    res.status(200).json({ forms: forms || null })
  } else {
    res.status(404).json({ forms: null })
  }
}

export default methodHandler(query_forms, ['GET'])
