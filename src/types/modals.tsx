import { Dispatch, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose?: VoidFunction;
}

interface BaseModalProps {
  overlayClass?: string;
  className?: string;
  children: ReactNode;
  defineXButton: boolean;
  xButtonFunction?: VoidFunction; // this relies from defineXButton
}

export type { ModalProps, BaseModalProps };
