import type { NextApiRequest, NextApiResponse } from 'next'
import { FormsModel } from '@lib/models/forms-model'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  var {
    query: { formlink },
  } = req

  if (Array.isArray(formlink)) {
    res.status(400).json({ error: 'Bad Request' })
  } else {
    const formsModel = new FormsModel()

    const form = await formsModel.getFormByLinkId(formlink)

    if (form) {
      res.status(200).json(form.data)
    } else {
      res.status(404).json({ error: 'Unknown FORM Link' })
    }
  }
}
