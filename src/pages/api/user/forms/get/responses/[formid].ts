import type { NextApiRequest, NextApiResponse } from 'next';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import sessionHandler from '@utils/middleware/session-handler';
import { getTokenFromSession } from '@lib/hooks/getToken';
import { strArray } from '@utils/utils';
import { GET_REF } from 'fauna/ref';

async function get_responses(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { formid }
  } = req;

  const token = await getTokenFromSession(req);

  // query db info
  const formsModel = new FormsModel(token);
  const formRef = GET_REF('forms', strArray(formid));
  const formResponses = await formsModel.getFormResponsesByRef(formRef);

  // query result is undefined
  if (!formResponses) {
    return res.status(404).end();
  }

  return res.status(200).json({ form_responses: formResponses || null });
}

export default methodHandler(sessionHandler(get_responses), ['GET']);
