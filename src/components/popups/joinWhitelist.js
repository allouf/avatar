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
          <div className='container md:pt-10 md:pb-14 relative'>
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
            <div className='flex align-center justify-between md:ps-16 pe-8'>
              <div>
                <Image className='mx-auto' src={PopupLogo} alt="Popup Logo"/>
              </div>
              <div className='ps-24'>
                <h3 className='md:text-4xl py-5 font-bold'>Join Our Whitelist</h3>
                <p className='popText font-normal text-lg'>Fill your email below to join our whitelist today!</p>
                <form onSubmit={handleSubmit}>
                  <input 
                    className='emailInput text-black bg-white mt-10 py-4 px-5 w-full mb-5' 
                    placeholder='Enter your email' 
                    type='email' 
                    required 
                  />
                  <button 
                    type="submit"
                    className='bg-blue py-4 px-6 emailButton text-sm w-full'
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
