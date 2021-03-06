export interface formData {
  user: string
  name: string
  fields: object[]
  linkId: string
  createdDate: string
}

export interface answerFormData {
  formid: string
  date: Date
  answers: Object
  responseID: string
}
