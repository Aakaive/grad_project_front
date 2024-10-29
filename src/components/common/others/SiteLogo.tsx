"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SiteLogo: React.FC = () => {
    const router = useRouter();
    const handelLogoClick = () => {
        router.push('/');
    }
    
    return (
        <button onClick={handelLogoClick} className='rounded-[10px] border-black border-[1px]'>
            사이트명
        </button>

    );
}

export default SiteLogo;