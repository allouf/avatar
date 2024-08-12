'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '../Button';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../lotties/man';
import lottieBg from '../../../public/assets/lottie-bg.webp';
import PrivateSale from '@/components/popups/privateSale';
import JoinWhitelist from '@/components/popups/joinWhitelist';
import Completed from '@/components/popups/completed';

export default function FirstSection() {
  const [privateSale, setPrivateSaleVisible] = useState(false);
  const [joinWhitelist, setJoinWhitelistVisible] = useState(false);
  const [completed, setCompletedPopupVisible] = useState(false);

  useEffect(() => {
    if (privateSale || joinWhitelist || completed) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup on component unmount
    return () => document.body.classList.remove('no-scroll');
  }, [privateSale, joinWhitelist, completed]);

  const togglePopup1 = () => setPrivateSaleVisible(!privateSale);
  const togglePopup2 = () => setJoinWhitelistVisible(!joinWhitelist);
  const hideJoinWhitelistVisible = () => setJoinWhitelistVisible(false);
  
  const showCompletedPopup = () => setCompletedPopupVisible(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    hideJoinWhitelistVisible();
    showCompletedPopup();
  };
  return (
    <>
    
      {privateSale && (
        <PrivateSale onSubmit={handleSubmit}  onClose={togglePopup1} />
      )}
    
      {joinWhitelist && (
        <JoinWhitelist onSubmit={handleSubmit} onClose={togglePopup2} />
      )}
 
     

    <div className='container xl:mb-32'>
      <div className='flex-wrap text-white flex md:row flex-col-reverse sm:flex-row gap-2 sm:gap-0'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='w-[100%] sm:w-[50%]'
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='hero_title Oxanium md:text-start font-bold text-2xl mt-10 md:text-3xl lg:text-4xl xl:text-5xl mb-5 xl:mb-10 md:w-[97%]'
          >
            AI - WEARABLE CRYPTO COLLECTIBLES ECOSYSTEM
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='LatoLight xl:text-xl md:text-start'
          >
            Gamified DePin + AI companion System on wearable
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='flex items-center md:items-start md:justify-start my-10 md:mb-0 xl:mt-20'
          >
            <Button clickEvent={togglePopup1} title="Private Sale" />
            <Button clickEvent={togglePopup2} title="White List" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='sm:w-[50%] flex items-center justify-center w-100 lottie-column'
        >
          <Image src={lottieBg} layout='responsive' alt="Lottie Background" loading="lazy" />
          <Player
            autoplay
            loop
            src={animationData}
            style={{ height: '400px', width: '400px', opacity: "75%" }}
          />
        </motion.div>
      </div>
    </div>
    </>

  );
}
