import { fetcher } from '@lib/fetcher';
import useSWR from 'swr';

export const FormFieldTypes = [
  {
    name: 'User Input',
    value: 'user-input'
  },
  {
    name: 'Text Input',
    value: 'text-input'
  },
  {
    name: 'Multiple Choice',
    value: 'multiple-choice'
  }
];

export function getForm(formid: string | undefined) {
  const { data, error } = useSWR(formid ? `/api/user/forms/get/${formid}` : null, fetcher);

  const form = data?.form;

  return error ? { form: {}, formOk: false } : { form: form?.data, formOk: true };
}
