'use client';

import { useState } from 'react';

import Link from 'next/link';
import { IoMenu } from 'react-icons/io5';
import { LuNotebookPen, LuSearch } from 'react-icons/lu';

import NavLink from '@/components/shared/navigation/NavLink';
import { ThemeToggle } from '@/components/shared/navigation/ThemeToggle';
import SiteLogo from '@/components/shared/SiteLogo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAV_LINKS } from '@/constants';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger className='cursor-pointer'>
        <IoMenu size={30} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <SiteLogo
              href='/'
              onClick={() => setIsOpen(false)}
            />
          </SheetTitle>
          <SheetDescription>
            A modern blog platform for tech enthusiasts.
          </SheetDescription>
          <Separator className='mt-4' />
        </SheetHeader>
        <div className='flex flex-col justify-center gap-4 px-6'>
          <div className='flex cursor-pointer items-center gap-1 text-lg font-semibold text-gray-400'>
            <LuSearch size={20} />
            <span className=''>Search</span>
          </div>
          <div className='flex cursor-pointer items-center gap-1 text-lg font-semibold text-gray-400'>
            <LuNotebookPen size={20} />
            <span className=''>Write</span>
          </div>
          {NAV_LINKS.map(({ id, href, label }) => (
            <NavLink
              key={id}
              href={href}
              label={label}
              onClick={() => setIsOpen(false)}
              isMobile
            />
          ))}
          <ThemeToggle />
          <Button size='lg'>
            <Link href='/login'>Login</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
