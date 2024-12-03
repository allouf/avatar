import React from 'react';
import './style.css';
import Image from 'next/image';
import web3 from '../../../public/assets/web3.png'
import ttf from '../../../public/assets/ttf5.png'
import lighthouseLogo from '../../../public/assets/lighthouse-logo.webp'
import platinumVc from '../../../public/assets/platinum-vc.svg'
import yukai from '../../../public/assets/yukai.webp'
import octalysis from '../../../public/assets/octalysis.svg'

import w3 from '../../../public/assets/w3.png'
import tt from '../../../public/assets/tt.png'

export default function PartnershipSection() {

return (
    // <div></div>
    <div className='PartnershipSection w-full'>
        <div className='container'>
        <h4 className="text-center text-white text-2xl md:text-4xl xl:text-5xl mb-8 lg:mb-10 Oxanium md:mt-10 font-bold">
          Partnerships
        </h4>
        <ul className='px-2.5 max-w-[375px] md:max-w-[100%] mx-auto flex justify-center sm:gap-10 md:gap-12 align-center'>
            {/* <li>
                <Image className="max-w-24  sm:max-w-32 lg:max-w-44 xl:max-w-full" src={web3}/>
            </li> */}
            <li>
                <a href="https://x.com/ttfbo/t">
                <Image className="max-w-16  sm:max-w-10 lg:max-w-44 xl:max-w-full w-24" src={ttf}/>
                </a>
            </li>
            <li>
                <a href="https://www.lighthouse.storage/">
                <Image className="max-w-16  sm:max-w-10 lg:max-w-44 xl:max-w-full w-24" src={lighthouseLogo}/>
                </a>
            </li>
            <li>
                <a href="https://vc.platinum.fund/">
                <Image className="max-w-16  sm:max-w-10 lg:max-w-44 xl:max-w-full w-24" src={platinumVc}/>
                </a>
            </li>
            <li>
                <a href="https://yukaichou.com/">
                <Image className="max-w-16  sm:max-w-10 lg:max-w-44 xl:max-w-full w-24" src={yukai}/>
                </a>
            </li>
            <li>
                <a href="https://octalysisgroup.com/">
                <Image className="max-w-16  sm:max-w-10 lg:max-w-44 xl:max-w-full w-24" src={octalysis}/>
                </a>
            </li>
            {/* <li>
                <Image className="max-w-12  sm:max-w-16 lg:max-w-40 xl:max-w-full" src={w3}/>
            </li> 
            <li>
                <Image className="max-w-10  sm:max-w-12 lg:max-w-48 xl:max-w-full" src={tt}/>
            </li> */}
        </ul>
        </div>
    </div>

);
}