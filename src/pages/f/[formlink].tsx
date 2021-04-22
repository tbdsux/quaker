import { FormEvent, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import Router, { useRouter } from 'next/router';
import Error from 'next/error';
import { nanoid } from 'nanoid';

import Layout from '@components/Layout';
import RenderForm from '@components/shared/RenderForm';

import { fetcher } from '@lib/fetcher';

import { formData } from '@utils/form-data';
import { AnswerBodyFormProps } from '@utils/types/answers';

import { FieldDataProps } from '~types/forms';

const FormLinkRender = () => {
  const router = useRouter();
  const { formlink } = router.query;
  const { data } = useSWR(formlink ? `/api/forms/${formlink}` : null, fetcher);
  const submitBtn = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState<formData>(null);

  // ===> MAIN FUNCTIONS
  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitBtn.current.innerText = 'Submitting...';
    submitBtn.current.disabled = true;

    var answers = {};

    // extract form answers
    form.fields.map((field: FieldDataProps) => {
      answers[field.question] = e.currentTarget[field.question]['value'];
    });

    // form submit
    const answerData: AnswerBodyFormProps = {
      formid: data.form.ref['@ref'].id,
      data: {
        date: new Date(),
        answers: answers,
        responseId: nanoid(40)
      }
    };

    await fetch('/api/forms/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answerData)
    })
      .then((res) => {
        if (res.ok) {
          Router.push('/f/submit-success');
        } else {
          return <Error statusCode={res.status} />;
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // UTILS
  useEffect(() => {
    if (data) {
      setForm(data.form?.data);
    }
  }, [data]);

  // finished query but it doesn't exist or the api returned an error
  if (data && data.error) return <Error statusCode={404} />;

  if (!data) return <>Loading...</>;

  return (
    <>
      {form && (
        <Layout title={`${form.name} - Quaker Forms`}>
          <div className="py-14 w-5/6 mx-auto">
            <header className="text-center">
              <h3 className="text-4xl font-black tracking-wide">{form.name}</h3>
            </header>

            <hr className="my-4" />

            {/* render form fields */}
            <div className="w-1/2 mx-auto">
              <form onSubmit={handleSubmitForm}>
                <RenderForm formfields={form.fields} />

                <div className="mt-6">
                  <button
                    ref={submitBtn}
                    type="submit"
                    className="py-2 px-8 bg-teal-500 hover:bg-teal-600 text-white rounded-md text-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default FormLinkRender;
