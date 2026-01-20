'use client';

import Modal from '@/components/modals/Modal';
import { RESULTS } from '@/constants';
import { useModalStore } from '@/store/useModalStore';

const SearchModal = () => {
  const { isSearchOpen, closeSearch } = useModalStore();

  return (
    <Modal
      isOpen={isSearchOpen}
      onClose={closeSearch}
    >
      <div className='space-y-4'>
        <input
          type='text'
          placeholder='Search articles...'
          autoFocus
          className='w-full rounded-xl border border-white/10 bg-black/40 p-4 text-lg text-white outline-none focus:border-indigo-500'
        />

        <div className='max-h-80 divide-y divide-white/10 overflow-y-auto rounded-xl border border-white/10'>
          {RESULTS.map((result) => {
            return (
              <button
                key={result.id}
                className='transition w-full cursor-pointer px-4 py-3 text-left text-gray-300 hover:bg-white/5 hover:text-white'
              >
                {result.title}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
