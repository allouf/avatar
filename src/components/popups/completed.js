import React from "react";
import Image from 'next/image';
import Cross  from '../../../public/assets/cross.svg'
import './popup.css';


export default function Completed({onClose, text}) {
    return(
        <div className="Completed Oxanium text-center popup">
            <div className="container relative">
              <div className="absolute right-8 cursor-pointer top-8 w-[16px]">
              <Image 
                  src={Cross} 
                  alt="Close" 
                  width={24}
                  height={24}
                  onClick={onClose} 
                  style={{ cursor: 'pointer' }} // Make it look clickable
                />
              </div>
               <div className="py-20">
                  <h3 className="text-4xl text-custom-blue font-extrabold mb-4">Completed</h3>
                  <p className='popText mx-auto text-white'>{text}</p>
               </div>
            </div>
        </div>
    )
}