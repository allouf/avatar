import React, { useState } from 'react';
import Image from 'next/image';
import PopupLogo from '../../../public/assets/popupLogo.webp';
import Cross from '../../../public/assets/cross.svg';
import './popup.css';
import Completed from '@/components/popups/completed'; // Import the Completed component

export default function PrivateSale({ onClose }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCompleted(true); 
  };

  return (
    <>
      {!isCompleted ? (
        <div className='PrivateSale text-center text-white Oxanium popup'>
          <div className='popup-content px-4 sm:px-8 py-8 md:pt-10 md:pb-16 relative'>
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
            <Image className='mx-auto w-28 md:w-36' src={PopupLogo} alt="Popup Logo"/>
            <h3 className='text-xl sm:text-2xl md:text-4xl py-5'>Private Sale</h3>
            <p className='popText mx-auto text-xs sm:text-sm md:text-lg max-w-[300px]'>
              Enter your email below to receive instructions on how to participate in our token private sale
            </p>
            <form 
             className='emailForm flex justify-between bg-white mt-10 py-1.5 sm:py-2.5 md:py-3 ps-3 pe-1 sm:px-3 md:px-5' 
             onSubmit={handleSubmit}>
              <input type="email" className='sm:text-sm md:text-lg text-xs outline-0 w-full text-black' placeholder='Enter your email' required />
              <button type="submit" className='md:w-2/4 bg-black py-2 sm:py-3 md:px-6 emailButton sm:text-sm md:text-lg text-xs'>Get Tokens</button>
            </form>
          </div>
        </div>
      ) : (
        <Completed onClose={onClose} text='Email with instructions will be sent shortly!' />
      )}
    </>
  );
}
