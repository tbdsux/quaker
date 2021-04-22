import { Expr } from 'faunadb';

export interface formData {
  user: string;
  name: string;
  fields: object[];
  linkId: string;
  createdDate: string;
}

export interface answerFormData {
  form: Expr;
  date: Date;
  answers: Object;
  responseID: string;
}
