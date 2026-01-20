import Link from 'next/link';
import { LuNotebookPen, LuSearch } from 'react-icons/lu';

import MobileNav from '@/components/shared/navigation/MobileNav';
import NavLink from '@/components/shared/navigation/NavLink';
import { ThemeToggle } from '@/components/shared/navigation/ThemeToggle';
import SiteLogo from '@/components/shared/SiteLogo';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/constants';

const Navbar = () => {
  return (
    <nav className='flex w-full items-center justify-between py-4'>
      {/* Site Logo */}
      <SiteLogo href='/' />

      {/* Desktop Navigation */}
      <div className='flex items-center gap-4'>
        <div className='flex cursor-pointer items-center gap-1 text-lg font-semibold text-gray-400'>
          <LuSearch size={20} />
          <span className='hidden md:block'>Search</span>
        </div>
        <div className='flex cursor-pointer items-center gap-1 text-lg font-semibold text-gray-400'>
          <LuNotebookPen size={20} />
          <span className='hidden md:block'>Write</span>
        </div>
        <div className='hidden items-center gap-4 md:flex'>
          {NAV_LINKS.map(({ id, href, label }) => (
            <NavLink
              key={id}
              href={href}
              label={label}
            />
          ))}
          <Button size='lg'>
            <Link href='/login'>Login</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden'>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
