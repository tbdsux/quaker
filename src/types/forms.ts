interface FieldDataProps {
  question: string;
  type: string;
}

interface FormDataProps {
  owner: object;
  name: string;
  fields: FieldDataProps[];
  linkId: string;
  createdDate: string;
}

interface FormDataRef {
  ref: object;
  ts: number;
  data: FormDataProps;
}

interface FormsPaginate {
  data: FormDataRef[];
}

export type { FieldDataProps, FormDataProps, FormDataRef, FormsPaginate };
