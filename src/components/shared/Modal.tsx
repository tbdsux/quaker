import { Dispatch, ReactNode, SetStateAction } from 'react';
import { BaseModalProps } from '~types/modals';

interface ModalData {
  open: boolean;
  children: ReactNode;
  modalClass?: string;
  modalOverlayClass?: string;
  modal: Dispatch<SetStateAction<boolean>>;
  onModalClose?: VoidFunction;
}

const BaseModal = ({
  children,
  overlayClass,
  className,
  defineXButton,
  xButtonFunction
}: BaseModalProps) => {
  return (
    <div
      className={`absolute z-50 bg-bland w-full h-screen flex items-center justify-center ${overlayClass}`}
    >
      <div className={`bg-white relative p-8 ${className}`} role="dialog">
        {children}
        {defineXButton ? (
          <button
            onClick={() => xButtonFunction()}
            title="Close Modal"
            className="h-8 w-8 absolute top-2 right-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export { BaseModal };
