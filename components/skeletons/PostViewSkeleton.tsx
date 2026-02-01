const PostViewSkeleton = () => {
  return (
    <div className='mx-auto max-w-3xl animate-pulse px-6 py-20'>
      <header className='mb-10'>
        <div className='mb-10 h-10 rounded bg-white/10 sm:h-12 lg:h-14' />

        <div className='flex items-center gap-4 text-sm'>
          <div className='flex items-center gap-4'>
            <div className='h-10 w-10 rounded-full bg-white/10' />

            <div className='space-y-2'>
              <div className='h-4 w-28 rounded bg-white/10' />
              <div className='h-3 w-20 rounded bg-white/10' />
            </div>
          </div>

          <div className='h-1 w-1 rounded-full bg-white/10' />
          <div className='h-4 w-24 rounded bg-white/10' />
        </div>
      </header>

      <div className='mb-12 h-55 w-full rounded-2xl bg-white/10 sm:h-80 lg:h-105' />

      <div className='space-y-4'>
        <div className='h-4 rounded bg-white/10' />
        <div className='h-4 rounded bg-white/10' />
        <div className='h-4 w-3/4 rounded bg-white/10' />
      </div>

      <div className='mt-16'>
        <div className='h-4 w-40 rounded bg-white/10' />
      </div>
    </div>
  );
};

export default PostViewSkeleton;
