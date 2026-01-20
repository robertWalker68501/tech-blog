import Link from 'next/link';

const Footer = () => {
  return (
    <footer className=''>
      <div className='container mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-10 sm:flex-row'>
        <p className='text-sm text-gray-400'>
          &copy; {new Date().getFullYear()} Tech
          <span className='text-primary'>Blog</span>. All rights reserved.
        </p>

        <div className='flex items-center gap-6 text-sm'>
          <Link
            href='/'
            className='hover:text-primary text-gray-400 transition-colors'
          >
            Home
          </Link>
          <Link
            href='/about'
            className='hover:text-primary text-gray-400 transition-colors'
          >
            About
          </Link>
          <Link
            href='/articles'
            className='hover:text-primary text-gray-400 transition-colors'
          >
            Articles
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
