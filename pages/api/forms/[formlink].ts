import type { NextApiRequest, NextApiResponse } from 'next'
import { FormsModel } from '@lib/models/forms-model'
import methodHandler from '@utils/middleware/method-handler'

async function get_form(req: NextApiRequest, res: NextApiResponse) {
  var {
    query: { formlink },
  } = req

  if (Array.isArray(formlink)) {
    res.status(400).json({ error: 'Bad Request' })
  } else {
    const formsModel = new FormsModel()

    const form = await formsModel.getFormByLinkId(formlink)

    // query result is undefined
    if (!form) {
      return res.status(404).end(`Unknown FormID ${formlink}`)
    }

    return res.status(200).json(form.data)
  }
}

export default methodHandler(get_form, ['GET'])
