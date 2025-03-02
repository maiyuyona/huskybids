'use client';

import Image from 'next/image';

const BiscuitIcon = ({ size = 20, className = '' }) => {
    return (
        <Image
            src="/images/biscuit.png" // You'll need to add your image here
            alt="Biscuit"
            width={size}
            height={size}
            className={className}
        />
    );
};

export default BiscuitIcon; 