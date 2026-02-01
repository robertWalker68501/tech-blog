const PostCardSkeleton = () => {
  return (
    <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className='animate-pulse overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b]'
        >
          {/* Image skeleton */}
          <div className='h-48 w-full bg-white/10' />

          {/* Content skeleton */}
          <div className='space-y-6 p-5'>
            <div className='h-3 w-24 rounded bg-white/10' />

            <div className='h-5 w-3/4 rounded bg-white/10' />

            <div className='space-y-2'>
              <div className='h-4 w-full rounded bg-white/10' />
              <div className='h-4 w-full rounded bg-white/10' />
              <div className='h-4 w-full rounded bg-white/10' />
            </div>

            <div className='h-4 w-28 rounded bg-white/10' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCardSkeleton;
