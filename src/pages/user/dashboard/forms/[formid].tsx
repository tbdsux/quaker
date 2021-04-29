import { useState, useEffect, ChangeEvent, FormEvent, useRef, useReducer } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import { toast } from 'react-toastify';

import Layout from '@components/Layout';
import Menu from '@components/dashboard/DashMenu';
import { FieldsModal } from '@components/modals/fields';
import { ToastWrapper } from '@components/toast';
import { UserLoading } from '@components/loading/user';

import { fetcher } from '@lib/fetcher';
import { useUser } from '@lib/wrapper/useUser';
import { withPageAuthRequired } from '@lib/wrapper/withPageAuth';
import { FieldsReducer, InitFields } from '@lib/reducers/fields-reducer';

import { joinFormUrl, PROJECT_SITE } from '@utils/site';
import { FieldDataProps, FormDataProps } from 'types/forms';

import { SaveIcon } from '@heroicons/react/outline';
import { useHasMounted } from '@lib/hooks/useHasMounted';

const ModifyForm = withPageAuthRequired(() => {
  // MAIN STATES
  const router = useRouter();
  const { formid } = router.query;

  const { user } = useUser();

  const [form, setForm] = useState<FormDataProps>();
  const [{ fields }, dispatch] = useReducer(FieldsReducer, InitFields);

  const [fieldModal, setFieldModal] = useState(false);

  // END MAIN STATES

  // FORM FIELD STATES
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyField, setModifyField] = useState<FieldDataProps>();
  const [saveMsg, setSaveMsg] = useState('Save');
  const [saved, setSaved] = useState(true);
  // END FORM FIELD STATES

  // ====> MAIN FUNCTIONS
  const handleAddFormField = (fd: FieldDataProps) => {
    dispatch({ type: 'add', field: fd });
    setFieldModal(false);
    // enable button
    setSaved(false);
    setSaveMsg('Save');
  };

  const handleModifyFormField = (old: FieldDataProps, fd: FieldDataProps) => {
    const index = fields.indexOf(old);
    dispatch({ type: 'modify', index: index, field: fd });
    setFieldModal(false);
    // enable button
    setSaved(false);
    setSaveMsg('Save');
  };

  const handleRemoveFormField = (fd: FieldDataProps) => {
    dispatch({ type: 'remove', field: fd });
    // enable button
    setSaved(false);
    setSaveMsg('Save');
  };

  const handleUpdateFormFields = () => {
    setSaveMsg('Saving...');
    toast.info('Saving form fields...');
    fetch('/api/user/forms/update/fields', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formid: formid,
        fields: fields
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.updated) {
          // TODO: better implementation
          // mutate(`/api/user/forms/get/${formid}`);
          toast.success('Sucessfully saved form...');
          setSaved(true);
          setSaveMsg('Saved!');
        } else {
          toast.error('There was a problem while trying to save form...');
        }
      })
      .catch(() => toast.error('There was a problem while trying to save form...'));
  };

  // UTIL FUNCTIONS, .THIS ONLY WORKS IF IT IS AT THE END
  const { data } = useSWR(formid ? `/api/user/forms/get/${formid}` : null, fetcher);

  useEffect(() => {
    if (data) {
      setForm(data.form?.data);
      dispatch({ type: 'set', fields: data.form?.data.fields });
    }
  }, [data]);

  // show loading if form's data is still not available
  if (!data && user) {
    return <UserLoading />;
  }

  return (
    <>
      <ToastWrapper />

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

            <div className="bg-gray-100 rounded-md p-8 relative">
              {/* use manual form update */}
              <button
                className="disabled:opacity-70 absolute top-0 right-0 mt-2 mr-2 inline-flex bg-teal-400 hover:bg-teal-500 p-2 rounded-md text-white text-sm"
                onClick={handleUpdateFormFields}
                disabled={saved}
                title="Save Form"
              >
                <SaveIcon className="h-4 w-4 mr-1" /> {saveMsg}
              </button>
              <h4 className="mb-4 ml-4">Preview: </h4>
              <div className="w-2/3 mx-auto">
                {fields.map((field, index) => (
                  <div key={index} className="flex flex-col my-3 p-2">
                    <div className="flex items-center justify-between">
                      <p className="tracking-wide mb-1">{field.question}</p>
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
