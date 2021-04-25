import type { NextApiRequest, NextApiResponse } from 'next';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import sessionHandler from '@utils/middleware/session-handler';
import { getTokenFromSession } from '@lib/hooks/getToken';
import { GET_REF } from 'fauna/ref';

async function remove_response(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { formid, respID }
  } = req;

  // TODO: validate formid
  // issue: THIS CREATES ANOTHER FORMSMODEL
  // const valid = getForm(Array.isArray(formid) ? formid.join() : formid)
  // if (!valid.formOk) {
  //   return res.status(400).end()
  // }

  // query db info
  const token = await getTokenFromSession(req);
  const formsModel = new FormsModel(token);
  const responseRef = GET_REF('answers', respID);

  const formResponses = await formsModel.removeResponseByRef(responseRef);

  return res.status(200).json({ deleted: formResponses ? true : false });
}

export default methodHandler(sessionHandler(remove_response), ['PUT']);
