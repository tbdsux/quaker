import type { NextApiRequest, NextApiResponse } from 'next';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import sessionHandler from '@utils/middleware/session-handler';
import { getTokenFromSession } from '@lib/hooks/getToken';
import { GET_REF } from 'fauna/ref';
import { strArray } from '@utils/utils';
import { BaseApiQueryResponse } from '~types/query';

interface QueryUpdateFormResponse extends BaseApiQueryResponse {
  updated: boolean;
}

async function update_formFields(
  req: NextApiRequest,
  res: NextApiResponse<QueryUpdateFormResponse>
) {
  const { formid, fields } = req.body;

  const token = await getTokenFromSession(req);

  // execute query
  const formsModel = new FormsModel(token);
  const formRef = GET_REF('forms', strArray(formid));
  const form = formsModel.updateFormFieldsByRef(formRef, fields);

  // query result is undefined
  if (!form) {
    return res
      .status(500)
      .json({
        error: true,
        message: 'There was a problem while trying to update form fields.',
        updated: false
      });
  }

  return res
    .status(200)
    .json({ error: false, message: 'Successfully updated form fields.', updated: true });
}

export default methodHandler(sessionHandler(update_formFields), ['PUT']);
