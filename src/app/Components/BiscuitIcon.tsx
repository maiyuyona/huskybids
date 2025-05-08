'use client';

import Image from 'next/image';

interface BiscuitIconProps {
  size?: number;
  className?: string;
}

const BiscuitIcon = ({ size = 20, className = '' }: BiscuitIconProps) => {
  return (
    <Image
      src="/images/biscuit.png"
      alt="Biscuit"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
};

export default BiscuitIcon; 