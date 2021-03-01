import type { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from '@lib/auth'
import { FormsModel } from '@lib/models/forms-model'
import methodHandler from '@utils/middleware/method-handler'

async function query_formById(req: NextApiRequest, res: NextApiResponse) {
  const session = await getLoginSession(req)

  if (session) {
    const {
      query: { formid },
    } = req

    if (Array.isArray(formid)) {
      res.status(400).json({ form: null })
    } else {
      // query db info
      const formsModel = new FormsModel()
      const form = await formsModel.getFormById(formid)

      res.status(200).json({ form: form || null })
    }
  } else {
    res.status(404).json({ form: null })
  }
}

export default methodHandler(query_formById, ['GET'])
