import React, { FormEvent, Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';

import Router from 'next/router';

import { ToastWrapper } from '@components/toast';

export const NewFormModal = () => {
  const [open, setOpen] = useState(false);
  const formName = useRef<HTMLInputElement>(null);
  const createBtnRef = useRef<HTMLButtonElement>(null);

  const userCreateForm = async (e: FormEvent) => {
    e.preventDefault();

    // show notifs status
    toast.info('Creating form...');
    createBtnRef.current.innerHTML = 'Creating...';
    createBtnRef.current.disabled = true;

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
          Router.push(`/user/dashboard/forms/${res.form.ref['@ref'].id}`);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <ToastWrapper />

      <div className="mt-8">
        <button
          onClick={() => setOpen(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-8"
        >
          Create New Form
        </button>
      </div>

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-bland"
          initialFocus={formName}
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
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title as="h2" className="font-bold text-2xl leading-6 text-gray-900">
                  Create a New Form
                </Dialog.Title>
                <div className="mt-6">
                  <form onSubmit={userCreateForm}>
                    <div className="flex flex-col w-full">
                      <label htmlFor="form-title" className="mb-2 tracking-wide">
                        What's the name / title of your form?
                      </label>
                      <input
                        ref={formName}
                        type="text"
                        className="py-2 px-4 text-lg border-2 rounded-md"
                        placeholder="Your form name or title"
                      />
                    </div>
                  </form>
                </div>

                <div className="mt-6 flex flex-row justify-end">
                  <button
                    type="submit"
                    ref={createBtnRef}
                    onClick={userCreateForm}
                    className="mr-1 py-2 px-6 rounded-md bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-70 disabled:bg-teal-500"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="py-2 px-6 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
