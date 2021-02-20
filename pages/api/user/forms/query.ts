import type { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from '@lib/auth'
import { FormsModel } from '@lib/models/forms-model'

export default async function query_form(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getLoginSession(req)

  if (session) {
    // query db info
    const formsModel = new FormsModel()

    // const form = await formsModel.getFormByTsEmail(session.email,))

    // res.status(200).json({ form: form || null })
  } else {
    res.status(404).json({ form: null })
  }
}
