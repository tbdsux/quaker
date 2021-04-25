import { StringInputField } from '@components/forms/string-input';
import { BaseModal } from '@components/shared/Modal';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FormFieldTypes } from '~types/fields';
import { FieldDataProps } from '~types/forms';

import { ModalProps } from '~types/modals';

interface ModifyFormFieldsProps extends ModalProps {
  modify: boolean;
  modifyFieldData?: FieldDataProps;
  handleAddFormField: (fd: FieldDataProps) => void;
  handleModifyFormField: (old: FieldDataProps, fd: FieldDataProps) => void;
}

const FieldsModal = ({
  open,
  setOpen,
  onClose,
  modify,
  modifyFieldData,
  handleAddFormField,
  handleModifyFormField
}: ModifyFormFieldsProps) => {
  const fieldQuestion = useRef<HTMLInputElement>();
  const [type, setType] = useState('user-input'); // use user input as default

  useEffect(() => {
    if (modify && modifyFieldData) {
      setType(modifyFieldData.type);
    }
  }, [modify, modifyFieldData]);

  // create new field and return
  const newField = (): FieldDataProps => {
    return {
      question: fieldQuestion.current.value,
      type: type
    };
  };

  const handleModifyWrapper = () => {
    const n = newField();

    // only modify if different set of values
    if (n != modifyFieldData) {
      handleModifyFormField(modifyFieldData, n);
    }
  };

  const handleAddWrapper = () => {
    handleAddFormField(newField());
  };

  return (
    <>
      {open ? (
        <BaseModal
          defineXButton={true}
          xButtonFunction={() => {
            // reset
            fieldQuestion.current.value = '';
            setType('user-input');
            setOpen(false);
          }}
          className="w-1/2 mx-auto rounded-md"
        >
          <div>
            <h3 className="text-3xl font-extrabold tracking-wide text-coolGray-700 underline">
              {modify ? 'Edit field' : 'Add a field'}
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
                    setType(e.target.value);
                  }}
                  defaultValue={type}
                >
                  <option value="field-type" disabled>
                    Choose a field type...
                  </option>
                  {FormFieldTypes.map((field, index) => (
                    <option key={index} value={field.value}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>
              <hr className="my-2" />

              <div>
                {type == 'user-input' ? (
                  <StringInputField
                    label="User Input"
                    questionRef={fieldQuestion}
                    defaultValue={modify ? modifyFieldData.question : ''}
                  />
                ) : type == 'text-input' ? (
                  <div>
                    <StringInputField
                      label="Text input"
                      questionRef={fieldQuestion}
                      defaultValue={modify ? modifyFieldData.question : ''}
                    />
                  </div>
                ) : type == 'multiple-choice' ? (
                  <div>
                    <h2 className="text-lg my-3 font-bold tracking-wide uppercase text-teal-800">
                      Multiple Choice
                    </h2>
                    <div>Currently in the works...</div>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-end mt-4">
                {modify ? (
                  <button
                    onClick={() => handleModifyWrapper()}
                    className="py-2 px-6 mx-1 rounded-md bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    Modify
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddWrapper()}
                    className="py-2 px-6 mx-1 rounded-md bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    Add
                  </button>
                )}
                <button
                  onClick={() => {
                    setOpen(false);
                    onClose();
                  }}
                  className="py-2 px-6 mx-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </BaseModal>
      ) : null}
    </>
  );
};

export { FieldsModal };
