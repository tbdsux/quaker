import type { NextApiRequest, NextApiResponse } from 'next'
import { FormsModel } from '@lib/models/forms-model'
import methodHandler from '@utils/middleware/method-handler'
import sessionHandler from '@utils/middleware/session-handler'
import { getForm } from '@utils/form'

async function remove_response(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { formid, respID },
  } = req

  // TODO: validate formid
  // issue: THIS CREATES ANOTHER FORMSMODEL
  // const valid = getForm(Array.isArray(formid) ? formid.join() : formid)
  // if (!valid.formOk) {
  //   return res.status(400).end()
  // }

  // query db info
  const formsModel = new FormsModel()

  const formResponses = await formsModel.removeResponseByID(respID)

  return res.status(200).json({ deleted: formResponses ? true : false })
}

export default methodHandler(sessionHandler(remove_response), ['PUT'])
