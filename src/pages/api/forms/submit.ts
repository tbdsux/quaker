import type { NextApiRequest, NextApiResponse } from 'next';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import { getPublicToken } from '@lib/hooks/getToken';
import { GET_REF } from 'fauna/ref';
import { FormResponseProps, SubmitFormProps } from '~types/responses';

async function submit_formAnswer(req: NextApiRequest, res: NextApiResponse) {
  const form: SubmitFormProps = req.body;

  const formsModel = new FormsModel(getPublicToken());

  // get form reference
  const formRef = GET_REF('forms', form.formid.toString());
  const formExists = await formsModel.getFormByRef(formRef);

  if (!formExists) {
    // TODO::
    // return 404
  }

  // submit form
  const answer: FormResponseProps = {
    form: formRef,
    data: form.data
  };
  const submit = await formsModel.submitFormAnswer(answer);

  if (!submit) {
    // TODO::
    // there was a problem while trying to submit the form
  }

  return res.status(200).json({ success: true, message: 'The answer was successfully submitted.' });
}

export default methodHandler(submit_formAnswer, ['POST']);
