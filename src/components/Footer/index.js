import React from 'react'
import facebook from '../../../public/assets/facebook.png';
import linkedin from '../../../public/assets/linkedin.png';
import cam from '../../../public/assets/cam.png';
import footerline from '../../../public/assets/footer-top-line.png';
import Image from "next/image"
export default function Footer() {
  return (
    
    <footer className='relative mt-16 xl:mt-24 max-w-none w-screen'>
      <div className='hidden  md:block'>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="288" viewBox="0 0 2002 288" fill="none">
          <path d="M2014.79 332V332C2014.79 149.746 1867.04 2 1684.79 2H291C108.746 2 -39 149.746 -39 332V332" stroke="url(#paint0_linear_184_8924)" stroke-width="4" stroke-miterlimit="10"/>
          <defs>
          <linearGradient id="paint0_linear_184_8924" x1="-3462.06" y1="102.645" x2="2576.44" y2="507.276" gradientUnits="userSpaceOnUse">
          <stop offset="0.349725" stop-color="#004DF4" stop-opacity="0"/>
          <stop offset="0.569189" stop-color="#004DF4" stop-opacity="0"/>
          <stop offset="0.739819" stop-color="#26DDFF"/>
          <stop offset="0.900449" stop-color="#26DDFF" stop-opacity="0.04"/>
          <stop offset="0.946763" stop-color="#26DDFF" stop-opacity="0"/>
          </linearGradient>
          </defs>
        </svg>
      </div>
      <div className='container'>
      <div className='footer-top-line w-full'>
        {/* <Image className='w-full' src={footerline} /> */}
      </div>
      <div className='mb-10 md:mb-auto h-max xl:w-2/3 left-0 right-0 md:absolute m-auto top-0 bottom-0 footer-content grid text-center xl:flex items-center lg:justify-around  flex-col gap-8 sm:gap-6 lg:gap-6 xl:gap-8 md:flex-row'>
        <div>
          <ul className='flex justify-center footer-list gap-6 xl:gap-10 md:gap-4 lg:gap-6'>
            <li><a href="#" className='text-xs md:text-sm uppercase footer-gray-text'>White-paper</a></li>
            <li><a href="#" className='text-xs md:text-sm uppercase footer-gray-text'>VISUAL NOVEL</a></li>
            <li><a href="#" className='text-xs md:text-sm uppercase footer-gray-text'>INITIAL DEMO</a></li>
          </ul>
        </div>
        <div className='md:flex gap-4 align-center justify-center'>
        <a href="#" className='text-sm  mb-5 md:mb-0 block  align-center follow-us uppercase text-white'>Follow us</a>
        <div className='flex justify-center gap-6 align-center'>

          <a className='footer-social' href="https://x.com/Incentives01"><Image src='https://www.idea-engine.ai/images/social_ic01.svg' width={20} height={20} /></a>
          <a className='footer-social' href="https://t.me/idea_engine_ai"><Image src='https://www.idea-engine.ai/images/social_ic02.svg' width={20} height={20} /></a>
          <a className='footer-social' href="https://incentives101.substack.com/"><Image src='https://www.idea-engine.ai/images/social_ic03.svg' width={20} height={20} /></a>
          <a className='footer-social' href="https://www.instagram.com/idea_engine.ai/"><Image src='https://www.idea-engine.ai/images/social_ic04.svg' width={20} height={20} /></a>
          <a className='footer-social' href="https://www.youtube.com/@IDEA-EngineAI"><Image src='https://www.idea-engine.ai/images/social_ic05.svg' width={20} height={20} /></a>
        </div>
        </div>
      </div>
      <div className='footer-copty-text py-1'>
        <p className='m-0'>© Copyright © 2024 Incentives - AI Automations and blockchain sales@idea-engine.ai</p>
      </div>
      </div>
    </footer>
  )
}
