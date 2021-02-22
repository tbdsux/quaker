import { nanoid } from 'nanoid'
import { q, adminClient } from '../faunadb'

export class FormsModel {
  generateFormId() {
    const linkId = nanoid(8)

    return adminClient
      .query(q.Get(q.Match(q.Index('form_by_linkId'), linkId)))
      .then(() => this.generateFormId())
      .catch(() => linkId)
  }

  async createForm(user: string, name: string) {
    const linkId = this.generateFormId()

    // create a form with defined fields
    return adminClient.query(
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
  }

  async queryForms(user: string) {
    return adminClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('get_forms_by_email'), user)),
        q.Lambda((x) => q.Get(x)),
      ),
    )
  }
}
