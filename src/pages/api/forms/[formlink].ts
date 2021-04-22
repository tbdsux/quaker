import type { NextApiRequest, NextApiResponse } from 'next';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import { getPublicToken } from '@lib/hooks/getToken';
import { strArray } from '@utils/utils';
import { BaseApiQueryResponse } from '~types/query';

interface QueryFormByIdResponseProps extends BaseApiQueryResponse {
  exists: boolean;
  form?: object;
}

async function get_form(req: NextApiRequest, res: NextApiResponse<QueryFormByIdResponseProps>) {
  const { formlink } = req.query;

  const formsModel = new FormsModel(getPublicToken()); // use the public token in here

  const form = await formsModel.getFormByLinkId(strArray(formlink));

  // query result is undefined
  if (!form) {
    return res
      .status(404)
      .json({ exists: false, error: true, message: `Unknown FormID ${formlink}` });
  }

  // no defined fields from the form
  if (form.data.fields.length < 1) {
    return res
      .status(404)
      .json({ exists: true, error: true, message: 'No defined fields from the form.' });
  }

  return res.status(200).json({ exists: true, error: false, form });
}

export default methodHandler(get_form, ['GET']);
