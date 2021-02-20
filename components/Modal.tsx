import { Dispatch, ReactNode, SetStateAction } from 'react'

interface ModalData {
  open: boolean
  children: ReactNode
  modalClass?: string
  modalOverlayClass?: string
  modal: Dispatch<SetStateAction<boolean>>
}

const Modal = ({
  open,
  children,
  modalClass,
  modalOverlayClass,
  modal,
}: ModalData) => {
  return (
    <>
      {open ? (
        <div
          className={`absolute z-50 bg-bland w-full h-screen flex items-center justify-center ${modalOverlayClass}`}
        >
          <div className={`bg-white relative p-8 ${modalClass}`} role="dialog">
            {children}
            <button
              onClick={() => modal(false)}
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
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Modal
