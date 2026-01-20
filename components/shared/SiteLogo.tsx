import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface SiteLogoProps {
  href: string;
  classes?: string;
  imgSrc?: string;
  imgAlt?: string;
  imgWidth?: number;
  imgHeight?: number;
  onClick?: () => void;
}

const SiteLogo = ({
  href,
  classes,
  imgSrc = '/assets/images/logo.png',
  imgAlt = 'TechBlog Logo',
  imgWidth = 40,
  imgHeight = 40,
  onClick,
}: SiteLogoProps) => {
  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2 text-2xl font-semibold', classes)}
      onClick={onClick}
    >
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={imgWidth}
        height={imgHeight}
      />
      <span>
        Tech<span className='text-primary'>Blog</span>
      </span>
    </Link>
  );
};

export default SiteLogo;
