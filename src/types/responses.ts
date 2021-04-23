interface FormReponseProps {
  form: object;
  data: {
    date: string;
    answers: { [key: string]: string };
    responseId: string;
  };
}

export type { FormReponseProps };
