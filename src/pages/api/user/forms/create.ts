import type { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@lib/auth';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import sessionHandler from '@utils/middleware/session-handler';
import { getTokenFromSession } from '@lib/hooks/getToken';

async function create_form(req: NextApiRequest, res: NextApiResponse) {
  const token = await getTokenFromSession(req);
  const { formName } = req.body;

  // creates new form
  const formsModel = new FormsModel(token);
  const form = await formsModel.createForm(formName);

  // query result is undefined
  if (!form) {
    return res.status(500).end();
  }

  res.status(200).json({ form: form || null });
}

export default methodHandler(sessionHandler(create_form), ['PUT']);
