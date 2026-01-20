'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  label: string;
  classes?: string;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLink = ({ href, label, classes, isMobile, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'hover:text-primary text-lg font-semibold text-gray-400 transition-colors duration-300',
        isActive && 'text-primary',
        isMobile && 'text-2xl',
        classes
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default NavLink;
