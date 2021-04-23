import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';

import Layout from '@components/Layout';
import Menu from '@components/dashboard/DashMenu';
import Modal from '@components/shared/Modal';
import { formData } from '@utils/form-data';
import { fetcher } from '@lib/fetcher';
import { UserLoading } from '@components/loading/user';
import { FieldDataProps } from 'types/forms';
import { useUser } from '@lib/wrapper/useUser';
import { joinFormUrl, PROJECT_SITE } from '@utils/site';
import { withPageAuthRequired } from '@lib/wrapper/withPageAuth';

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
  const handleAddFormField = () => {
    const fieldData: FieldDataProps = {
      question: fieldQuestion.current.value,
      type: fieldType
    };

    setFieldModal(false);
    setFormFields([...formFields, fieldData]);
    setUpdated(true);
  };

  const handleCloseModalForm = () => {
    setModifyMode(false);
    setFieldType('field-type');
  };

  const handleRemoveFormField = (fd: FieldDataProps) => {
    var tf = formFields;
    tf.splice(tf.indexOf(fd), 1);

    setFormFields(tf);
    setUpdated(true);
  };

  const handleModifyFormField = (fd: FieldDataProps) => {
    const fieldData: FieldDataProps = {
      question: fieldQuestion.current.value,
      type: fieldType
    };
    const index = formFields.indexOf(fd);
    const f = formFields;

    f.splice(index, 1);
    f.splice(index, 0, fieldData);

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
          <Modal
            open={fieldModal}
            modal={setFieldModal}
            onModalClose={() => handleCloseModalForm()}
            modalClass="w-1/2 mx-auto rounded-md"
          >
            <div>
              <h3 className="text-3xl font-extrabold tracking-wide text-coolGray-700 underline">
                {modifyMode ? 'Edit field' : 'Add a field'}
              </h3>
              <div className="mt-8">
                <div className="flex items-center text-lg">
                  <label htmlFor="field-type" className="mr-3">
                    Field Type :
                  </label>
                  <select
                    name="field-type"
                    id=""
                    className="py-2 px-4 rounded-md bg-gray-100"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setFieldType(e.target.value);
                    }}
                    defaultValue={fieldType}
                  >
                    <option value="field-type" disabled>
                      Choose a field type...
                    </option>
                    <option value="user-input">User Input</option>
                    <option value="text-input">Text Input</option>
                    <option value="multiple-choice">Multiple Choice</option>
                  </select>
                </div>
                <hr className="my-2" />

                <div>
                  {fieldType == 'user-input' ? (
                    <div>
                      <h2 className="text-lg my-3 font-bold tracking-wide uppercase text-teal-800">
                        User Input
                      </h2>
                      <div className="flex flex-col w-5/6 mx-auto">
                        <label htmlFor="field-question">Please enter the question to ask...</label>
                        <input
                          ref={fieldQuestion}
                          name="field-question"
                          type="text"
                          placeholder="Your question..."
                          className="py-2 border px-4 rounded-md"
                          defaultValue={modifyMode ? modifyField.question : ''}
                        />
                      </div>
                    </div>
                  ) : fieldType == 'text-input' ? (
                    <div>
                      <h2 className="text-lg my-3 font-bold tracking-wide uppercase text-teal-800">
                        Text Input
                      </h2>
                      <div className="flex flex-col w-5/6 mx-auto">
                        <label htmlFor="field-question">Please enter the question to ask...</label>
                        <input
                          ref={fieldQuestion}
                          name="field-question"
                          type="text"
                          placeholder="Your question..."
                          className="py-2 border px-4 rounded-md"
                          defaultValue={modifyMode ? modifyField.question : ''}
                        />
                      </div>
                    </div>
                  ) : fieldType == 'multiple-choice' ? (
                    <div>
                      <h2 className="text-lg my-3 font-bold tracking-wide uppercase text-teal-800">
                        Multiple Choice
                      </h2>
                      <div>Currently in the works...</div>
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center justify-end mt-4">
                  {modifyMode ? (
                    <button
                      onClick={() => handleModifyFormField(modifyField)}
                      className="py-2 px-6 mx-1 rounded-md bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Modify
                    </button>
                  ) : (
                    <button
                      onClick={handleAddFormField}
                      className="py-2 px-6 mx-1 rounded-md bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Add
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setFieldModal(false);
                      handleCloseModalForm();
                    }}
                    className="py-2 px-6 mx-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Modal>

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
                  onClick={() => setFieldModal(true)}
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
                {formFields.map((field) => (
                  <div key={formFields.indexOf(field)} className="flex flex-col my-3 p-2">
                    <div className="flex items-center justify-between">
                      <p className="text-lg tracking-wide mb-1">{field.question}</p>
                      <div>
                        <button
                          onClick={() => {
                            setFieldModal(true);
                            setModifyMode(true);
                            setModifyField(field);
                            setFieldType(field.type);
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
