import React from 'react';
import './style.css';
import Image from 'next/image';
import web3 from '../../../public/assets/web3.png'
import ttf from '../../../public/assets/ttf5.png'
import lighthouseLogo from '../../../public/assets/lighthouse-logo.webp'
import platinumVc from '../../../public/assets/platinum-vc.svg'
import yuhkai from '../../../public/assets/yuhkaiLogo.png'
import octalysis from '../../../public/assets/octalysisLogo.png'

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
        <ul className='px-2.5 md:max-w-[900px] mx-auto flex lg:flex-nowrap flex-wrap gap-6 sm:gap-8 md:gap-12 justify-center align-center'>

            <li>
                <a className='' href="https://x.com/ttfbo/t">
                <Image className="max-w-12 sm:max-w-16 md:max-w-full w-24" src={ttf}/>
                </a>
            </li>
            <li>
                <a href="https://yukaichou.com/">
                <Image className="max-w-16 sm:max-w-20 md:max-w-full w-24" src={yuhkai}/>
                </a>
            </li>
            <li>
                <a href="https://www.lighthouse.storage/">
                <Image className="max-w-16 sm:max-w-20 md:max-w-full w-24" src={lighthouseLogo}/>
                </a>
            </li>
            <li>
                <a href="https://vc.platinum.fund/">
                <Image className="max-w-24 sm:max-w-28 md:max-w-full w-48" src={platinumVc}/>
                </a>
            </li>
            <li>
                <a href="https://octalysisgroup.com/">
                <Image className="max-w-36 sm:max-w-40 md:max-w-full w-48" src={octalysis}/>
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