import type { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from '@lib/auth'
import { FormsModel } from '@lib/models/forms-model'

export default async function create_form(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getLoginSession(req)

  if (session) {
    // query db info
    const formsModel = new FormsModel()

    const form = await formsModel.createForm(req.body.user, req.body.name)

    res.status(200).json({ form: form || null })
  } else {
    res.status(404).json({ form: null })
  }
}
