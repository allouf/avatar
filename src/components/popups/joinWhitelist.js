import React, { useState } from 'react';
import Image from 'next/image';
import PopupLogo from '../../../public/assets/popupLogo.webp';
import Cross from '../../../public/assets/cross.svg';
import Completed from '@/components/popups/completed';

import './popup.css';

export default function JoinWhitelist({ onClose }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCompleted(true);
  };

  return (
    <>
      {!isCompleted ? (
        <div className='JoinWhitelist text-white Oxanium popup'>
          <div className='popup-content py-8 px-5 sm:px-8 md:pt-10 md:pb-14 relative'>
            <div className="absolute right-8 cursor-pointer top-8 w-[16px]">
              <Image 
                src={Cross} 
                alt="Close" 
                width={24}
                height={24}
                onClick={onClose} 
                style={{ cursor: 'pointer' }}
              />
            </div>
            <div className='sm:flex align-center justify-between lg:ps-16 lg:pe-8'>
              <div className='sm:w-1/2 lg:w-1/3'>
                <Image className='w-24 sm:w-36 md:w-2/4 lg:w-full mx-auto' src={PopupLogo} alt="Popup Logo"/>
              </div>
              <div className='lg:ps-24'>
                <h3 className='text-xl sm:text-3xl md:text-4xl pt-5 pb-2 md:py-5 font-bold'>Join Our Whitelist</h3>
                <p className='popText font-normal text-xs sm:text-sm md:text-lg'>Fill your email below to join our whitelist today!</p>
                <form onSubmit={handleSubmit}>
                  <input 
                    className='text-xs sm:text-sm emailInput text-black bg-white mt-5 md:mt-10 py-3 md:py-4 px-5 w-full mb-2 md:mb-5' 
                    placeholder='Enter your email' 
                    type='email' 
                    required 
                  />
                  <button 
                    type="submit"
                    className='bg-blue py-3 md:py-4 px-6 emailButton text-xs sm:text-sm w-full'
                  >
                    Complete Registration
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Completed onClose={onClose } text='Email with instructions will be sent shortly!'/>
      )}
    </>
  );
}
