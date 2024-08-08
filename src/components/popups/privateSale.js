import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PopupLogo from '../../../public/assets/popupLogo.webp'
import Cross  from '../../../public/assets/cross.svg'
import './popup.css';
import Completed from '@/components/popups/completed';

export default function PrivateSale({onClose}) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const [completed, setCompletedVisible] = useState(false);
  const [joinWhitelist, setJoinWhitelistVisible] = useState(false);

  const togglePopup3 = () => {
    setCompletedVisible(!completed);
    setJoinWhitelistVisible(false);
  };

  return (
    <>
{completed && (
    <Completed onCloseCompleted={togglePopup3} text='Your email has been registered!'/>
) }
        <div className='PrivateSale text-center text-white Oxanium popup'>
            <div className='container md:pt-10 md:pb-16 relative'>
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
              <Image className='mx-auto' src={PopupLogo}/>
              <h3 className='md:text-4xl py-5'>Private Sale</h3>
              <p className='popText mx-auto'>Enter your email below to receive instructions on how to participate in our token private sale</p>
              <form className='emailForm flex justify-between bg-white mt-10 py-3 px-5' onSubmit={handleSubmit}>
                <input placeholder='Enter your email'/>
                <button onClick={togglePopup3} className='bg-black py-3 px-6 emailButton text-sm'>Get Tokens</button>
              </form>
            </div>
        </div>
        </>
    )
};