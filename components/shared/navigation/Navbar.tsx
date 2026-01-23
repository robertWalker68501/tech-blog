'use client';

import Link from 'next/link';
import { LuNotebookPen, LuSearch } from 'react-icons/lu';

import MobileNav from '@/components/shared/navigation/MobileNav';
import NavLink from '@/components/shared/navigation/NavLink';
import SiteLogo from '@/components/shared/SiteLogo';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/constants';
import { authClient } from '@/lib/auth-client';
import { useModalStore } from '@/store/useModalStore';

const Navbar = () => {
  const { openSignIn, openSearch } = useModalStore();

  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <nav className='flex w-full items-center justify-between py-4'>
      {/* Site Logo */}
      <SiteLogo href='/' />

      {/* Desktop Navigation */}
      <div className='flex items-center gap-4'>
        <button
          type='button'
          className='flex cursor-pointer items-center gap-1 text-lg font-semibold text-gray-400'
          onClick={openSearch}
        >
          <LuSearch size={20} />
          <span className='hidden md:block'>Search</span>
        </button>
        {session && (
          <div>
            <Link
              href='/write'
              className='flex cursor-pointer items-center gap-1 text-lg font-semibold text-gray-400'
            >
              <LuNotebookPen size={20} />
              <span className='hidden md:block'>Write</span>
            </Link>
          </div>
        )}
        <div className='hidden items-center gap-4 md:flex'>
          {NAV_LINKS.map(({ id, href, label }) => (
            <NavLink
              key={id}
              href={href}
              label={label}
            />
          ))}
          <>
            {!isPending && (
              <>
                {session ? (
                  <Button
                    size='lg'
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    size='lg'
                    onClick={openSignIn}
                  >
                    Login
                  </Button>
                )}
              </>
            )}
          </>
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
