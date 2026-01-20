'use client';

import { useMemo, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

const WritePage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      placeholder: 'Start writing your article here...',
      height: 500,
      theme: 'dark',
      style: {
        background: '#121212',
        color: '#d1d5dc',
      },
    }),
    []
  );

  return (
    <div className='container mt-10'>
      <div className='mx-auto max-w-3xl px-6 py-20'>
        {/* Page title */}
        <h1 className='mb-10 text-3xl font-bold text-white'>
          Write a new article
        </h1>

        <form>
          {/* Title */}
          <input
            type='text'
            placeholder='Article title'
            className='mb-6 w-full bg-transparent text-4xl font-bold text-white outline-none placeholder:text-gray-500'
          />
          {/* Excerpt */}
          <textarea
            placeholder='Write a short excerpt (1-2 sentences)'
            rows={3}
            className='bg-secondary-background mb-8 w-full resize-none rounded-xl border border-white/10 p-4 text-gray-200 outline-none placeholder:text-gray-500 focus:border-indigo-500/50'
          />
          {/* Image upload */}
          <div className='mb-10'>
            <label className='mb-2 block text-gray-400'>Cover Image</label>
            <input
              type='file'
              accept='image/*'
              className='file:bg-primary block w-full text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-500'
            />
          </div>

          {/* Editor */}
          <div className='mb-10 overflow-hidden rounded-2xl border border-white/10'>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <div className='flex justify-end'>
            <button className='bg-primary cursor-pointer rounded-full px-6 py-3 font-semibold text-white transition-colors'>
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePage;
