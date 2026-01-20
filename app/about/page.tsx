import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className='container mt-10'>
      <div className='mb-10 px-4 sm:px-12'>
        {/* Heading */}
        <div className='mb-16 text-center'>
          <h1 className='mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl'>
            About TechBlog
          </h1>
          <p className='mx-auto max-w-2xl leading-relaxed text-gray-400'>
            A modern tech blog about real-world development and thoughtful
            engineering.
          </p>
        </div>
        {/* Content */}
        <div className='space-y-14'>
          {/* Section 1 */}
          <div className='grid grid-cols-1 items-center gap-10 md:grid-cols-2'>
            <Image
              src='/assets/images/about.png'
              alt='TechBlog About Image'
              width={600}
              height={600}
              className='rounded-2xl object-cover'
            />
            <div className=''>
              <h2 className='mb-4 text-2xl font-semibold text-gray-200'>
                Why TechBlog?
              </h2>
              <p className='leading-relaxed text-gray-400'>
                TechBlog was created to share insights on modern technologies
                and web development. We focus on practical concepts, clean code,
                and real tools helping developers understand how things work and
                how to build better applications.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className='bg-secondary-background rounded-2xl border border-white/10 p-8'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-200'>
              What We Write About
            </h2>
            <ul className='space-y-3 text-gray-400'>
              <li>• Modern web technologies and frameworks</li>
              <li>
                • Frontend development with React, Next.js, and Tailwind CSS
              </li>
              <li>• Backend tools, APIs, and application architecture</li>
              <li>• Practical guides and insights for web developers</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className='text-center'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-200'>
              Built for Developers
            </h2>
            <p className='mx-auto mb-8 max-w-2xl leading-relaxed text-gray-400'>
              Whether you&apos;re just starting out or refining your skills,
              TechBlog is designed to inspire better code, better design, and
              better thinking.
            </p>
            <Link
              href='/articles'
              className='inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-500'
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
