import { answerFormData } from '@utils/form-data';
import { AnswerDataFormProps } from '@utils/types/answers';
import { Client, Expr } from 'faunadb';
import { nanoid } from 'nanoid';
import { q, getClient } from '../faunadb';

export class FormsModel {
  _token: string;
  _client: Client;

  constructor(token: string) {
    this._token = token;
    this._client = getClient(token);
  }

  generateFormId() {
    const linkId = nanoid(8);

    // const check = this._client
    //   .query(q.Get(q.Match(q.Index('form_by_linkId'), linkId)))
    //   .then(() => true)
    //   .catch(() => false)

    // if (check) {
    //   return this.generateFormId()
    // }

    return linkId;
  }

  async createForm(name: string) {
    const linkId = this.generateFormId();

    // create a form with defined fields
    return this._client
      .query(
        q.Create(q.Collection('forms'), {
          data: {
            owner: q.CurrentIdentity(), // reference to current user
            name: name,
            fields: [],
            linkId: linkId,
            createdDate: new Date().toISOString()
          }
        })
      )
      .catch(() => undefined);
  }

  async queryUserForms() {
    return this._client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('forms_by_userRef'), q.CurrentIdentity())),
        q.Lambda((x) => q.Get(x))
      )
    );
  }

  // getFormById gets the form by it's 'ref-id' [this is more efficient]
  async getFormById(formId: string) {
    return this._client.query(q.Get(q.Ref(q.Collection('forms'), formId))).catch(() => undefined);
  }

  async getFormByRef(ref: Expr) {
    return this._client.query(q.Get(ref));
  }

  // updateFormFieldsByID updates the form's fields
  async updateFormFieldsByID(id: string, fields: object[]) {
    return this._client
      .query(
        q.Update(q.Ref(q.Collection('forms'), id), {
          data: { fields: fields }
        })
      )
      .catch(() => undefined);
  }

  // getFormByLinkId gets the form by its linkid
  async getFormByLinkId(formLink: string) {
    return this._client
      .query(q.Get(q.Match(q.Index('form_by_linkId'), formLink)))
      .catch(() => undefined);
  }

  async submitFormAnswer(data: AnswerDataFormProps) {
    return this._client
      .query(
        q.Create(q.Collection('answers'), {
          data: data
        })
      )
      .catch(() => undefined);
  }

  async getFormResponsesByRef(form: Expr) {
    return this._client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('answers_by_formRef'), form)),
          q.Lambda((x) => q.Get(x))
        )
      )
      .catch(() => undefined);
  }

  async removeResponseByRef(responseRef: Expr) {
    return this._client.query(q.Delete(responseRef)).catch(() => undefined);
  }
}
