import { UserProps } from './user';

interface FieldDataProps {
  question: string;
  type: string;
}

interface FormDataProps {
  owner: object;
  name: string;
  fields: FieldDataProps[];
}

interface FormDataRef {
  ref: object;
  ts: number;
  data: FormDataProps;
}

export type { FieldDataProps, FormDataProps, FormDataRef };
