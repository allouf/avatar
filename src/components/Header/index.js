"use client";
import React, { useState } from 'react';
import './style.css';
import Image from 'next/image';
import logo from '../../../public/assets/logo.svg';
import profile from '../../../public/assets/profile.png';
import menuicon from '../../../public/assets/menu-icon.svg';
import { motion } from 'framer-motion';

export default function Header() {
  const [headerOpen, setHeaderOpen] = useState(false);

  return (
    <>
      <header className='header w-full md:mt-2 sm:mt-2 engine-header mb-16'>
        <div className='container'>
          <div className='flex justify-between items-center'>
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='logo sm:w-40 lg:w-auto'>
              <Image src={logo} alt="Logo" loading="lazy" />
            </motion.div>
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
             className='headerDefault headerMenu py-2 xl:py-5 xl:px-16 md:px-6 sm:px-3'>
              <ul className='flex text-white xl:gap-12 md:gap-3 lg:gap-6 gap-4'>
                <li>
                  <a href="https://drive.google.com/file/d/1ZSMbAvM8ulRg9-saG0uZ-cZ8z44dsjvj/view" className='menu-links uppercase'>White-paper</a>
                </li>
                <li>
                  <a href="https://drive.google.com/file/d/1ZSMbAvM8ulRg9-saG0uZ-cZ8z44dsjvj/view" className='menu-links uppercase'>VISUAL NOVEL</a>
                </li>
                <li>
                  <a href="#" className='menu-links uppercase disabled-link'>INITIAL DEMO</a>
                </li>
              </ul>
            </motion.div>
            {headerOpen &&
              <div className='headerResponsive headerMenu py-2 xl:px-16  md:px-6 sm:px-3'>
                <ul className='flex text-white xl:gap-12 md:gap-3 lg:gap-6 gap-4'>
                  <li>
                    <a href="https://drive.google.com/file/d/1ZSMbAvM8ulRg9-saG0uZ-cZ8z44dsjvj/view" className='menu-links uppercase'>White-paper</a>
                  </li>
                  <li>
                    <a href="https://drive.google.com/file/d/1ZSMbAvM8ulRg9-saG0uZ-cZ8z44dsjvj/view" className='menu-links uppercase'>VISUAL NOVEL</a>
                  </li>
                  <li>
                    <a href="#" className='menu-links uppercase disabled-link'>INITIAL DEMO</a>
                  </li>
                </ul>
              </div>
            }
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}

               className='headerbtn-box flex items-center lg:gap-3 md:gap-1'>
              <div className='left-line h-4 w-0.5 bg-black'></div>
              <div className='header-btn py-1.5 lg:py-2 px-3 xl:py-3.5 lg:px-4 md:px-2 text-white Oxanium'>
                <a href="#" className='font-bold'>Connect Wallet</a>
              </div>
              <div className='right-line h-4 w-0.5'></div>
              <div className='profile-img hidden pr-2'>
                <Image src={profile} alt="Profile" loading="lazy" />
              </div>
              <input type='checkbox' id='check'></input>
              <label htmlFor="check" className='checkbtn block sm:hidden pl-4'>
                <div className='menu-icon pr-3' onClick={() => setHeaderOpen(!headerOpen)}>
                  <Image src={menuicon} alt="Menu Icon" loading="lazy" />
                </div>
              </label>
            </motion.div>
          </div>
        </div>
      </header>
    </>
  );
}
