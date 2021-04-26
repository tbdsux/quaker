import { BaseModal } from '@components/shared/Modal';
import RenderForm from '@components/shared/RenderForm';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment } from 'react';
import { FieldDataProps } from '~types/forms';
import { ModalProps } from '~types/modals';
import { FormResponseProps } from '~types/responses';

interface ViewResponseModalProps extends ModalProps {
  response: FormResponseProps;
  formFields: FieldDataProps[];
}

const ViewResponseModal = ({ open, setOpen, response, formFields }: ViewResponseModalProps) => {
  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-bland"
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
                  View Response
                </Dialog.Title>
                <Dialog.Description>
                  <p className="text-sm mt-2 tracking-wide">
                    Submitted Date:{' '}
                    <span className="underline">{new Date(response.data.date).toUTCString()}</span>
                  </p>
                </Dialog.Description>

                <hr className="my-4" />

                <div className="w-11/12 mx-auto">
                  <div className="w-full p-6 my-2 bg-gray-100 mx-auto">
                    <RenderForm formfields={formFields} formresp={response.data.answers} />
                  </div>
                </div>

                <div className="mt-4 float-right">
                  <button
                    onClick={() => setOpen(false)}
                    className="py-2 px-6 mx-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* {open ? (
        <BaseModal
          defineXButton={true}
          xButtonFunction={() => {
            setOpen(false);
          }}
          className="w-5/6 mx-auto"
        >
          <div>
            <div className="flex justify-between items-end m-4">
              <h3 className="text-xl font-bold tracking-wide">View Response</h3>
              <p className="text-sm">
                Date:{' '}
                <span className="underline">{new Date(response.data.date).toUTCString()}</span>
              </p>
            </div>
            <hr />
            <div className="w-2/3 p-6 my-2 bg-gray-100 mx-auto">
              <RenderForm formfields={formFields} formresp={response.data.answers} />
            </div>
          </div>
        </BaseModal>
      ) : null} */}
    </>
  );
};

export { ViewResponseModal };
