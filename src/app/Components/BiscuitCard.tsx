'use client';

import Image from 'next/image';

const BiscuitCard = () => {
  return (
    <Image
      src="/images/biscuit.png"
      alt="Biscuit"
      width={80}
      height={80}
      className="rounded-full"
      priority
    />
  );
};

export default BiscuitCard; 