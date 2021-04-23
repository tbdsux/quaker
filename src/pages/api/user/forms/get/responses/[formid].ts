import type { NextApiRequest, NextApiResponse } from 'next';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import sessionHandler from '@utils/middleware/session-handler';
import { getTokenFromSession } from '@lib/hooks/getToken';
import { strArray } from '@utils/utils';
import { GET_REF } from 'fauna/ref';
import { BaseApiQueryResponse } from '~types/query';
import { FormReponseProps } from '~types/responses';
import { FormDataProps } from '~types/forms';

interface QueryReponsesApi extends BaseApiQueryResponse {
  formExists: boolean;
  responses?: FormReponseProps[];
  form?: object;
}

async function get_responses(req: NextApiRequest, res: NextApiResponse<QueryReponsesApi>) {
  const { formid } = req.query;

  const token = await getTokenFromSession(req);

  // query db info
  const formsModel = new FormsModel(token);
  const formRef = GET_REF('forms', strArray(formid));
  const form = await formsModel.getFormByRef(formRef);

  if (!form) {
    return res.status(404).json({
      formExists: false,
      error: true,
      message: 'Cannot find form with the specified id.'
    });
  }

  const formResponses = await formsModel.getFormResponsesByRef(formRef);

  // query result is undefined
  if (!formResponses) {
    return res.status(500).json({
      formExists: true,
      error: true,
      message: 'There was a problem while trying to query the responses.'
    });
  }

  return res.status(200).json({
    formExists: true,
    error: false,
    message: 'Successfully queried!',
    responses: formResponses,
    form: form
  });
}

export default methodHandler(sessionHandler(get_responses), ['GET']);
