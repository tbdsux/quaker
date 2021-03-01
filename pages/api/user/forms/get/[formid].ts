import type { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from '@lib/auth'
import { FormsModel } from '@lib/models/forms-model'
import methodHandler from '@utils/middleware/method-handler'
import sessionHandler from '@utils/middleware/session-handler'

async function query_formById(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { formid },
  } = req

  // query db info
  const formsModel = new FormsModel()
  const form = await formsModel.getFormById(
    Array.isArray(formid) ? formid.join() : formid,
  )

  // query result is undefined
  if (!form) {
    return res.status(500).end()
  }

  return res.status(200).json({ form: form || null })
}

export default methodHandler(sessionHandler(query_formById), ['GET'])
