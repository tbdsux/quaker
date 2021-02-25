import { q, adminClient, getClient } from '../faunadb'

interface q_res {
  secret: string
}

export class UserModel {
  async createUser(email) {
    /* Step 4.3: Create a user in FaunaDB */
    return adminClient.query(
      q.Create(q.Collection('users'), {
        data: { email: email, name: '' },
      }),
    )
  }

  async getUserByEmail(email) {
    /* Step 4.3: Get a user by their email in FaunaDB */
    return adminClient
      .query(q.Get(q.Match(q.Index('users_by_email'), email)))
      .catch(() => undefined)
  }

  async updateUserName(name, email) {
    // Update the user's name if not set / updated.
    return adminClient
      .query(
        q.Update(
          q.Select(['ref'], q.Get(q.Match(q.Index('users_by_email'), email))),
          {
            data: { name: name },
          },
        ),
      )
      .catch((e) => undefined)
  }

  async obtainFaunaDBToken(user) {
    /* Step 4.3: Obtain a FaunaDB access token for the user */
    return adminClient
      .query(q.Create(q.Tokens(), { instance: q.Select('ref', user) }))
      .then((res: q_res) => res?.secret)
      .catch(() => undefined)
  }

  async invalidateFaunaDBToken(token) {
    /* Step 4.3: Invalidate a FaunaDB access token for the user */
    await getClient(token).query(q.Logout(true))
  }
}