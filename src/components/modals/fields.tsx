import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Transition, Dialog, Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import { StringInputField } from '@components/forms/string-input';

import { FormFieldObject, FormFieldTypes } from '~types/fields';
import { FieldDataProps } from '~types/forms';
import { ModalProps } from '~types/modals';
import { MultipleChoice } from '@components/forms/multiple-choice';

interface ModifyFormFieldsProps extends ModalProps {
  modify: boolean;
  modifyFieldData?: FieldDataProps;
  handleAddFormField: (fd: FieldDataProps) => void;
  handleModifyFormField: (old: FieldDataProps, fd: FieldDataProps) => void;
}

const FieldsModal = ({
  open,
  setOpen,
  modify,
  modifyFieldData,
  handleAddFormField,
  handleModifyFormField
}: ModifyFormFieldsProps) => {
  const fieldQuestion = useRef<HTMLInputElement>();
  const [type, setType] = useState(FormFieldTypes[0]); // use user input as default

  useEffect(() => {
    if (modify && modifyFieldData) {
      setType(FormFieldObject[modifyFieldData.type]);
    }
  }, [modify, modifyFieldData]);

  // create new field and return
  const newField = (): FieldDataProps => {
    return {
      question: fieldQuestion.current.value,
      type: type.value
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

  console.log(type);

  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-bland"
          // initialFocus={formName}
          static
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title as="h2" className="font-bold text-2xl leading-6 text-gray-900">
                  {modify ? 'Edit field' : 'Add a field'}
                </Dialog.Title>
                <div className="mt-6">
                  <div className="flex items-center justify-start">
                    <label htmlFor="field-type" className="mr-3">
                      Field Type :
                    </label>
                    <Listbox value={type} onChange={setType}>
                      {({ open }) => (
                        <>
                          <div className="relative mt-1 w-1/2">
                            <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-md border shadow-md cursor-default focus:outline-none focus:border-teal-500">
                              <span className="block truncate">{type.name}</span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                  className="w-5 h-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options
                                static
                                className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                {FormFieldTypes.map((field, index) => (
                                  <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                      `${active ? 'text-teal-900 bg-teal-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                    }
                                    value={field}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={`${
                                            selected ? 'font-medium' : 'font-normal'
                                          } block truncate`}
                                        >
                                          {field.name}
                                        </span>
                                        {selected ? (
                                          <span
                                            className={`${
                                              active ? 'text-teal-600' : 'text-teal-600'
                                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                          >
                                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                  <hr className="my-4" />

                  <div className="p-5 border-teal-500 border shadow-md rounded-md">
                    {type.value == 'user-input' ? (
                      <StringInputField
                        label="User Input"
                        questionRef={fieldQuestion}
                        defaultValue={modify ? modifyFieldData.question : ''}
                      />
                    ) : type.value == 'text-input' ? (
                      <div>
                        <StringInputField
                          label="Text input"
                          questionRef={fieldQuestion}
                          defaultValue={modify ? modifyFieldData.question : ''}
                        />
                      </div>
                    ) : type.value == 'multiple-choice' ? (
                      <div>
                        <MultipleChoice
                          label="Multiple Choice"
                          questionRef={fieldQuestion}
                          defaultValue={modify ? modifyFieldData.question : ''}
                        />
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
                      }}
                      className="py-2 px-6 mx-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export { FieldsModal };
