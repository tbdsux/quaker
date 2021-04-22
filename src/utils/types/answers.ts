import { Expr } from 'faunadb';

interface AnswerDataProps {
  data: {
    date: Date;
    answers: object;
    responseId: string;
  };
}

interface AnswerBodyFormProps extends AnswerDataProps {
  formid: number;
}

interface AnswerDataFormProps extends AnswerDataProps {
  form: Expr;
}

export type { AnswerBodyFormProps, AnswerDataFormProps };
