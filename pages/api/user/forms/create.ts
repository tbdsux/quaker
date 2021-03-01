import type { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from '@lib/auth'
import { FormsModel } from '@lib/models/forms-model'
import methodHandler from '@utils/middleware/method-handler'
import sessionHandler from '@utils/middleware/session-handler'

async function create_form(req: NextApiRequest, res: NextApiResponse) {
  // query db info
  const formsModel = new FormsModel()

  const form = await formsModel.createForm(req.body.user, req.body.name)

  // query result is undefined
  if (!form) {
    return res.status(500).end()
  }

  res.status(200).json({ form: form || null })
}

export default methodHandler(sessionHandler(create_form), ['PUT'])
