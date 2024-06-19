import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, handler }: { children: ReactNode; handler: any }) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/20" onClick={handler}>
      {children}
    </div>,
    document.body,
  );
};

export default Modal;
