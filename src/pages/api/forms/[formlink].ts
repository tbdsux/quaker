import type { NextApiRequest, NextApiResponse } from 'next';
import { FormsModel } from '@lib/models/forms-model';
import methodHandler from '@utils/middleware/method-handler';
import { getPublicToken } from '@lib/hooks/getToken';

async function get_form(req: NextApiRequest, res: NextApiResponse) {
  var {
    query: { formlink }
  } = req;

  // this is to prevent unconditional render of 404 page on the main page
  if (formlink == 'undefined') {
    return res.status(200).end(null);
  }

  if (Array.isArray(formlink)) {
    res.status(400).json({ error: 'Bad Request' });
  } else {
    const formsModel = new FormsModel(getPublicToken()); // use the public token in here

    const form = await formsModel.getFormByLinkId(formlink);

    // query result is undefined
    if (!form) {
      return res.status(404).end(`Unknown FormID ${formlink}`);
    }

    return res.status(200).json(form);
  }
}

export default methodHandler(get_form, ['GET']);
