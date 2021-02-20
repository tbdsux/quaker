import { q, adminClient, getClient } from '../faunadb'

export class FormsModel {
  async createForm(user: string, name: string) {
    // create a form with defined fields
    return adminClient.query(
      q.Create(q.Collection('forms'), {
        data: { user: user, name: name, fields: [] },
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
