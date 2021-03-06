import type { NextApiRequest, NextApiResponse } from 'next'
import { FormsModel } from '@lib/models/forms-model'
import { answerFormData } from '@utils/form-data'
import methodHandler from '@utils/middleware/method-handler'

async function submit_formAnswer(req: NextApiRequest, res: NextApiResponse) {
  const data: answerFormData = req.body

  if (data) {
    const formsModel = new FormsModel()

    const formExists = await formsModel.getFormById(data.formid)

    if (formExists) {
      const form = await formsModel.submitFormAnswer(data)

      if (form) {
        res.status(200).end('Form has been successfully submitted!')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.status(404).end('Unknown Form')
    }
  } else {
    res.status(400).end('Bad Request')
  }
}

export default methodHandler(submit_formAnswer, ['POST'])
