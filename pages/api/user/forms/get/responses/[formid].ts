import type { NextApiRequest, NextApiResponse } from 'next'
import { FormsModel } from '@lib/models/forms-model'
import methodHandler from '@utils/middleware/method-handler'
import sessionHandler from '@utils/middleware/session-handler'

async function get_responses(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { formid },
  } = req

  if (formid == 'undefined') {
    return res.status(200).json({ form_responses: null })
  }

  // query db info
  const formsModel = new FormsModel()

  const formResponses = await formsModel.getFormResponses(
    Array.isArray(formid) ? formid.join() : formid,
  )

  // query result is undefined
  if (!formResponses) {
    return res.status(404).end()
  }

  return res.status(200).json({ form_responses: formResponses || null })
}

export default methodHandler(sessionHandler(get_responses), ['GET'])
