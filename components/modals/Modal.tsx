import { ReactNode } from 'react';

import { LuX } from 'react-icons/lu';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/90 transition-all duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'} `}
      />
      {/* Modal Content */}
      <div
        className={`bg-secondary-background relative z-10 w-full max-w-md transform rounded-2xl border border-white/10 px-6 py-12 shadow-xl transition-all duration-700 ${isOpen ? 'translate-y-0' : 'translate-y-full'} ${isOpen ? 'opacity-100' : 'opacity-0'} `}
      >
        <button
          className='absolute top-4 right-4 text-gray-400 transition hover:text-white'
          aria-label='Close Modal'
          onClick={onClose}
        >
          <LuX size={22} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
