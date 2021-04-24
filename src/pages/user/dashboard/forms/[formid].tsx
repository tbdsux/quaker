import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';

import Layout from '@components/Layout';
import Menu from '@components/dashboard/DashMenu';
import { formData } from '@utils/form-data';
import { fetcher } from '@lib/fetcher';
import { UserLoading } from '@components/loading/user';
import { FieldDataProps } from 'types/forms';
import { useUser } from '@lib/wrapper/useUser';
import { joinFormUrl, PROJECT_SITE } from '@utils/site';
import { withPageAuthRequired } from '@lib/wrapper/withPageAuth';
import { FieldsModal } from '@components/modals/fields';

const ModifyForm = withPageAuthRequired(() => {
  // MAIN STATES
  const router = useRouter();
  const { formid } = router.query;

  const { user } = useUser();

  const [form, setForm] = useState<formData>();
  const [formFields, setFormFields] = useState([]);

  const [fieldModal, setFieldModal] = useState(false);

  // END MAIN STATES

  // FORM FIELD STATES
  const [fieldType, setFieldType] = useState('field-type');
  const [updated, setUpdated] = useState(false);
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyField, setModifyField] = useState<FieldDataProps>(Object);
  const fieldQuestion = useRef<HTMLInputElement>(null);
  // END FORM FIELD STATES

  // ====> MAIN FUNCTIONS
  const handleAddFormField = (fd: FieldDataProps) => {
    setFieldModal(false);
    setFormFields([...formFields, fd]);
    setUpdated(true);
  };

  const handleRemoveFormField = (fd: FieldDataProps) => {
    var tf = formFields;
    tf.splice(tf.indexOf(fd), 1);

    setFormFields(tf);
    setUpdated(true);
  };

  const handleModifyFormField = (old: FieldDataProps, fd: FieldDataProps) => {
    const index = formFields.indexOf(old);
    const f = formFields;

    f.splice(index, 1);
    f.splice(index, 0, fd);

    setFieldModal(false);
    setFormFields(f);
    setUpdated(true);
  };

  // update form fields (call api)
  useEffect(() => {
    if (updated) {
      fetch('/api/user/forms/update/fields', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formid: formid,
          fields: formFields
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.updated) {
            setUpdated(false);
          }
        });
    }
  }, [updated, formFields, formid]);
  // ====> END MAIN FUNCTIONS

  // UTIL FUNCTIONS, .THIS ONLY WORKS IF IT IS AT THE END
  const { data } = useSWR(formid ? `/api/user/forms/get/${formid}` : null, fetcher);

  useEffect(() => {
    if (data) {
      setForm(data.form?.data);
      setFormFields(data.form?.data.fields);
    }
  }, [data]);

  // show loading if form's data is still not available
  if (!data && user) {
    return <UserLoading />;
  }

  return (
    <>
      {user && form && (
        <Layout title={`${form.name} | Modify Form - Quaker`}>
          <FieldsModal
            open={fieldModal}
            setOpen={setFieldModal}
            modify={modifyMode}
            modifyFieldData={modifyField}
            handleAddFormField={handleAddFormField}
            handleModifyFormField={handleModifyFormField}
          />

          <Menu />

          <div className="w-4/5 mx-auto py-12">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-end">
                <h3 className="font-extrabold text-2xl tracking-wide underline text-teal-500">
                  {form.name}
                </h3>
                <a
                  target="_blank"
                  href={joinFormUrl(form.linkId)}
                  className="ml-2 text-coolGray-500 hover:underline"
                >
                  ({form.linkId})
                </a>
              </div>
              <div className="inline-flex items-center">
                <button
                  onClick={() => {
                    setModifyMode(false);
                    setFieldModal(true);
                  }}
                  className="bg-coolGray-500 hover:bg-coolGray-600 text-white py-2 px-8 tracking-wide border-coolGray-500"
                >
                  Add Field
                </button>
                <button className="py-2 border px-6 rounded-md mx-1">Settings</button>
                <Link href={`/user/dashboard/forms/${formid}/responses`}>
                  <a className="py-2 border px-6 rounded-md bg-gray-100 hover:bg-gray-200">
                    Responses
                  </a>
                </Link>
              </div>
            </div>

            <hr className="my-6" />

            <div className="bg-gray-50 p-8">
              <h4 className="mb-4 ml-4">Preview: </h4>
              <div className="w-2/3 mx-auto">
                {formFields.map((field, index) => (
                  <div key={index} className="flex flex-col my-3 p-2">
                    <div className="flex items-center justify-between">
                      <p className="text-lg tracking-wide mb-1">{field.question}</p>
                      <div>
                        <button
                          onClick={() => {
                            setFieldModal(true);
                            setModifyMode(true);
                            setModifyField(field);
                          }}
                          className="mx-1 text-sm underline tracking-wide"
                        >
                          modify
                        </button>
                        <button
                          onClick={() => handleRemoveFormField(field)}
                          className="mx-1 text-sm font-light tracking-wide text-red-500 hover:text-red-600"
                        >
                          remove
                        </button>
                      </div>
                    </div>
                    {field.type == 'user-input' ? (
                      <div>
                        <input type="text" className="py-2 px-4 border rounded-md w-full" />
                      </div>
                    ) : field.type == 'text-input' ? (
                      <div>
                        <textarea className="py-2 px-4 border rounded-md w-full h-32"></textarea>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
});

export default ModifyForm;
