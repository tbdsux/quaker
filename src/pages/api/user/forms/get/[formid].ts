import type { NextApiRequest, NextApiResponse } from 'next';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import sessionHandler from '@utils/middleware/session-handler';
import { getTokenFromSession } from '@lib/hooks/getToken';
import { strArray } from '@utils/utils';

async function query_formById(req: NextApiRequest, res: NextApiResponse) {
  const { formid } = req.query;
  const token = await getTokenFromSession(req);

  // query db info
  const formsModel = new FormsModel(token);
  const form = await formsModel.getFormById(strArray(formid));

  // query result is undefined
  if (!form) {
    return res.status(500).end();
  }

  return res.status(200).json({ form: form || null });
}

export default methodHandler(sessionHandler(query_formById), ['GET']);
