import { answerFormData } from '@utils/form-data'
import { nanoid } from 'nanoid'
import { q, adminClient } from '../faunadb'

export class FormsModel {
  generateFormId() {
    const linkId = nanoid(8)

    // const check = adminClient
    //   .query(q.Get(q.Match(q.Index('form_by_linkId'), linkId)))
    //   .then(() => true)
    //   .catch(() => false)

    // if (check) {
    //   return this.generateFormId()
    // }

    return linkId
  }

  async createForm(user: string, name: string) {
    const linkId = this.generateFormId()

    // create a form with defined fields
    return adminClient
      .query(
        q.Create(q.Collection('forms'), {
          data: {
            user: user,
            name: name,
            fields: [],
            linkId: linkId,
            createdDate: new Date().toISOString(),
          },
        }),
      )
      .catch(() => undefined)
  }

  async queryForms(user: string) {
    return adminClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('get_forms_by_email'), user)),
        q.Lambda((x) => q.Get(x)),
      ),
    )
  }

  // getFormById gets the form by it's 'ref-id' [this is more efficient]
  async getFormById(formId: string) {
    return adminClient
      .query(q.Get(q.Ref(q.Collection('forms'), formId)))
      .catch(() => undefined)
  }

  // updateFormFieldsByID updates the form's fields
  async updateFormFieldsByID(id: string, fields: object[]) {
    return adminClient
      .query(
        q.Update(q.Ref(q.Collection('forms'), id), {
          data: { fields: fields },
        }),
      )
      .catch(() => undefined)
  }

  // getFormByLinkId gets the form by its linkid
  async getFormByLinkId(formLink: string) {
    return adminClient
      .query(q.Get(q.Match(q.Index('form_by_linkId'), formLink)))
      .catch(() => undefined)
  }

  async submitFormAnswer(data: answerFormData) {
    return adminClient
      .query(
        q.Create(q.Collection('answers'), {
          data: data,
        }),
      )
      .catch(() => undefined)
  }
}
