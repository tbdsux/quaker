import type { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@lib/auth';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import sessionHandler from '@utils/middleware/session-handler';
import { BaseApiQueryResponse } from '~types/query';
import { FormsPaginate } from '~types/forms';
import { getTokenFromSession } from '@lib/hooks/getToken';

interface QueryFormsReponse extends BaseApiQueryResponse {
  forms?: FormsPaginate;
}

async function query_forms(req: NextApiRequest, res: NextApiResponse<QueryFormsReponse>) {
  const token = await getTokenFromSession(req);

  // query db info
  const formsModel = new FormsModel(token);
  const forms = await formsModel.queryUserForms();

  // query result is undefined
  if (!forms) {
    return res.status(500).json({
      error: true,
      message: 'There was a problem while trying to query user forms.'
    });
  }

  return res.status(200).json({
    error: false,
    message: 'Success!',
    forms: forms
  });
}

export default methodHandler(sessionHandler(query_forms), ['GET']);
export type { QueryFormsReponse };
