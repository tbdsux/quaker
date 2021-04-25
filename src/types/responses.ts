import { Expr } from 'faunadb';

interface ResponseProps {
  data: {
    date: string;
    answers: { [key: string]: string };
    responseId: string;
  };
}

interface FormResponseProps extends ResponseProps {
  form: Expr;
}
interface SubmitFormProps extends ResponseProps {
  formid: number;
}
interface ResponseRefProps {
  ref: object;
  ts: number;
  data: FormResponseProps;
}

export type { FormResponseProps, SubmitFormProps, ResponseRefProps };
