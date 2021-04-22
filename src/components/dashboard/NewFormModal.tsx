import { Dispatch, FormEvent, SetStateAction, useRef } from 'react';
import Router from 'next/router';

import Modal from '@components/Modal';

type NewFormModalProps = {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};

export const NewFormModal = ({ modal, setModal }: NewFormModalProps) => {
  const formName = useRef<HTMLInputElement>(null);

  const userCreateForm = async (e: FormEvent) => {
    e.preventDefault();

    const dat = {
      formName: formName.current.value
    };

    // TODO: DIRECT-IMPLEMENTATION
    try {
      await fetch('/api/user/forms/create', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dat)
      })
        .then((result) => {
          if (result.status === 200) {
            return result.json();
          }
        })
        .then((res) => {
          setModal(false);

          Router.push(`/user/dashboard/forms/${res.form.ref['@ref'].id}`);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal open={modal} modal={setModal} modalClass="w-1/2 mx-auto rounded-md">
      <h3 className="text-2xl font-bold text-coolGray-700">Create a new form</h3>
      <div className="mt-8">
        <form onSubmit={userCreateForm}>
          <div className="flex flex-col w-full">
            <label htmlFor="form-title" className="mb-2 text-lg tracking-wide">
              What's the name / title of your form?
            </label>
            <input
              ref={formName}
              type="text"
              className="py-2 px-4 text-xl border-2 rounded-md"
              placeholder="Your form name or title"
            />
          </div>
          <div className="mt-6 flex flex-row justify-end">
            <button
              type="submit"
              onClick={userCreateForm}
              className="mr-1 py-2 px-6 rounded-md text-lg bg-teal-500 hover:bg-teal-600 text-white"
            >
              Create
            </button>
            <button
              onClick={() => setModal(false)}
              className="py-2 px-6 rounded-md text-lg bg-gray-500 hover:bg-gray-600 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
