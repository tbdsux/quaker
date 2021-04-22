import type { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@lib/auth';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import sessionHandler from '@utils/middleware/session-handler';
import { getTokenFromSession } from '@lib/hooks/getToken';

async function update_formFields(req: NextApiRequest, res: NextApiResponse) {
  const token = await getTokenFromSession(req);
  // query db info
  const formsModel = new FormsModel(token);
  const form = formsModel.updateFormFieldsByID(req.body.formid, req.body.fields);

  // query result is undefined
  if (!form) {
    return res.status(500).end();
  }

  return res.status(200).json({ form: form || null });
}

export default methodHandler(sessionHandler(update_formFields), ['PUT']);
