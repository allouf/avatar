import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import block from "../../../public/assets/userProfile.png";
import fire from "../../../public/assets/fxemoji_fire.png";
import eth from "../../../public/assets/eth.svg";
import vectorTest from "../../../public/assets/vectorTest.png";

export default function Card({ img, hearts, cryptoName, userName, ethAmount }) {
    const { ref: cardRef, inView: cardInView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className='text-white bg-white bg-opacity-15 p-2 rounded-xl self-center'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: cardInView ? 1 : 0, scale: cardInView ? 1 : 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='relative'
            >
                <Image src={img} layout='responsive' alt="Card Image" />
                <div style={{ borderRadius: "0 20px 0 20px" }} className='bg-white bg-opacity-15 p-2 absolute top-0 right-0 flex items-center'>
                    <div className='w-4 mr-3'>
                        <Image src={vectorTest} layout='responsive' alt="Vector Test" />
                    </div>
                    <div>{hearts}</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: cardInView ? 1 : 0, x: cardInView ? 0 : -20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className='flex items-center xl:ms-4 mt-2'
            >
                <div className='w-10 xl:mr-4'>
                    <Image src={block} layout='responsive' alt="Block" />
                </div>
                <div>
                    <h4 className='Oxanium text-xl xl:text-2xl'>
                        {cryptoName}
                    </h4>
                    <p className='Inter text-sm xl:text-sm'>
                        By @ {userName}
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: cardInView ? 1 : 0, x: cardInView ? 0 : 20 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className='flex justify-between mx-4 mt-8 xl:mt-10'
            >
                <div className='flex items-center'>
                    <p className='Oxanium text-sm lg:text-sm xl:text-lg mt-1'>
                        On Sale
                    </p>
                    <div className='w-3 xl:w-5 xl:ml-1'>
                        <Image src={fire} layout='responsive' alt="Fire" />
                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='w-5'>
                        <Image src={eth} layout='responsive' alt="ETH" />
                    </div>
                    <p className='text-sm lg:text-sm xl:text-lg'>
                        {ethAmount}
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex justify-center items-center mt-5 xl:mt-10 mb-3"
            >
                <button3 className="text-xs lg:text-xs xl:text-lg relative w-[80%] text-center  opacity-80 cursor-pointer  p-2 xl:p-3 Oxanium  hover:text-white border border-[#AD1AAF] group">
                <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: cardInView ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Coming Soon
                    </motion.span>
                </button3>
            </motion.div>
        </motion.div>
    );
}
