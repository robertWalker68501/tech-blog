import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { LuPen, LuTrash } from 'react-icons/lu';

const ArticlePage = () => {
  return (
    <div className='container'>
      <article className='mx-auto max-w-3xl px-6 py-20'>
        {/* Article header */}
        <header className='mb-10'>
          <h1 className='primary-heading'>
            Building a Medium-Style Blog with Next.js
          </h1>
          <div className='flex items-center gap-4 text-sm text-gray-400'>
            <span>By Emmanuel Egbon</span>
            <span>.</span>
            <span>Sep 12, 2025</span>
          </div>
        </header>

        {/* Article Image */}
        <div className='relative mb-12 h-55 w-full sm:h-80 lg:h-105'>
          <Image
            src='/assets/images/p6.png'
            alt='Article image'
            fill
            className='rounded-2xl object-cover'
          />
        </div>

        {/* Article content */}
        <div className='max-w-none leading-relaxed tracking-wide text-gray-400'>
          <p className='mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
            itaque nesciunt placeat saepe. At consectetur eveniet ex laborum
            modi nobis quisquam quod quos saepe sapiente. Autem in iure suscipit
            vitae.
          </p>
          <p className='mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
            itaque nesciunt placeat saepe. At consectetur eveniet ex laborum
            modi nobis quisquam quod quos saepe sapiente. Autem in iure suscipit
            vitae.
          </p>
          <p className='mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
            itaque nesciunt placeat saepe. At consectetur eveniet ex laborum
            modi nobis quisquam quod quos saepe sapiente. Autem in iure suscipit
            vitae.
          </p>
        </div>

        <div className='my-16 border-t border-white/10' />

        <div className='flex items-center justify-end gap-2'>
          <Link
            href='#'
            className='inline-flex items-center gap-2 rounded-full border border-indigo-400/20 px-3 py-1.5 text-sm font-medium text-indigo-400 transition hover:border-indigo-400/40 hover:bg-indigo-400/10'
          >
            <LuPen />
            Edit
          </Link>
          <button
            type='button'
            className='inline-flex cursor-pointer items-center gap-2 rounded-full border border-red-400/20 px-3 py-1.5 text-sm font-medium text-red-400 transition hover:border-red-400/40 hover:bg-red-400/10 disabled:cursor-not-allowed'
          >
            <LuTrash />
            Delete
          </button>
        </div>

        <div className='mt-16'>
          <Link
            href='/articles'
            className='flex items-center gap-2 text-indigo-400 transition-colors hover:text-indigo-300'
          >
            <ArrowLeft size={20} /> Back to Articles
          </Link>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
