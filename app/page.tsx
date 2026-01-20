import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';

import RecentPosts from '@/components/posts/RecentPosts';

const Home = () => {
  return (
    <section className='container mt-10'>
      <h1 className='text-center text-3xl leading-snug tracking-wide text-gray-200 lg:text-5xl lg:leading-tight xl:text-7xl'>
        <span className='font-bold'>Welcome to TechBlog!</span>
        <br />
        Discover Stories and Creative Ideas
      </h1>
      <div className='py-12 lg:py-24'>
        <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16'>
          <div className='relative'>
            <Image
              src='/assets/images/about.png'
              alt='about image'
              width={600}
              height={600}
              className='rounded-2xl border border-white/10'
            />

            {/* Glow */}
            <div className='absolute -inset-4 -z-10 bg-indigo-500/10 blur-3xl' />
          </div>

          {/* Content */}
          <div className='max-w-xl'>
            <span className='text-sm tracking-widest text-indigo-400 uppercase'>
              About TechBlog
            </span>
            <h3 className='mt-3 text-2xl font-semibold tracking-tight text-white lg:text-3xl xl:text-4xl'>
              Simple Ways to Innovate Your Inner Creative Mind
            </h3>
            <p className='mt-6 leading-relaxed text-gray-400'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              consectetur, nunc vel aliquam aliquet, nisl velit aliquet nunc, ut
              aliquam nisl velit vel nunc. Sed consectetur, nunc vel aliquam
              aliquet, nisl velit aliquet nunc, ut aliquam nisl velit vel nunc.
            </p>
            <div className='mt-10'>
              <Link
                href='/about'
                className='bg-secondary-background inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3 font-semibold text-gray-200 transition-colors hover:bg-white/10'
              >
                Learn More
                <LuArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Posts */}
      <RecentPosts />
    </section>
  );
};
export default Home;
