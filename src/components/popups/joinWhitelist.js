import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PopupLogo from '../../../public/assets/popupLogo.webp';
import Cross from '../../../public/assets/cross.svg';
import Completed from '@/components/popups/completed';

import './popup.css';

export default function JoinWhitelist({ onClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const [completed, setCompletedVisible] = useState(false);

  const togglePopup3 = () => {
    setCompletedVisible(!completed);
  };

  return (
    <>
{completed && (
    <Completed onCloseCompleted={togglePopup3} text='Email with instructions will be sent shortly!'/>
) }
{completed === false && (
  <div className='JoinWhitelist text-white Oxanium popup'>
    <div className='container md:pt-10 md:pb-14 relative'>
      <div className="absolute right-8 cursor-pointer top-8 w-[16px]">
        <Image 
          src={Cross} 
          alt="Close" 
          width={24} // Adjust size as needed
          height={24} // Adjust size as needed
          onClick={onClose} 
          style={{ cursor: 'pointer' }} // Make it look clickable
        />
      </div>
      <div className='flex align-center justify-between md:ps-16 pe-8'>
        <div>
          <Image className='mx-auto' src={PopupLogo} alt="Popup Logo"/>
        </div>
        <div className='ps-24'>
          <h3 className='md:text-4xl py-5 font-bold'>Join Our Whitelist</h3>
          <p className='popText font-normal text-lg'>Fill your email below to join our whitelist today!</p>
          <form className='emailForm' onSubmit={handleSubmit}>
            <input 
              className='emailInput text-black bg-white mt-10 py-4 px-5 w-full mb-5' 
              placeholder='Enter your email' 
              type='email' 
              required 
            />
            <button 
              onClick={togglePopup3} 
              className='bg-blue py-4 px-6 emailButton text-sm w-full'
            >
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
)}


    </>
  );
}
