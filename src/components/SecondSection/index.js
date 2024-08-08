import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import secondImg from '../../../public/assets/secondImage.svg';
import secondImgResponsive from '../../../public/assets/secondImageResponsive.svg';

export default function SecondSection({
  preTitle,
  blueText,
  titleText,
  paragraph,
  sectionImg,
  responsiveImage,
  viewAllBtn
}) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1 // Trigger when 10% of the section is visible
  });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: sectionInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className='text-white md:flex flex-col mt-16 md:mt-24 xl:mt-48 w-full'
    >
      <div className='container'>
        <div className='md:flex justify-between items-end'>
          <div className='w-full mb-5'>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className='LatoLight capitalize preTitle text-xs sm:text-sm'
            >
              {preTitle}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className='capitalize break-words Oxanium text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-5 xl:mt-10 mainTitle'
            >
              {blueText ? (
                <span className='inline text-custom-blue mr-3'>
                  {blueText}
                </span>
              ) : null}
              {titleText}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className='capitalize w-[80%] Oxanium text-sm mt-3 lg:mt-5 font-thin lg:mb-0 lg:w-1/3 subtext'
            >
              {paragraph}
            </motion.p>
          </div>
          {viewAllBtn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className='px-3 px-md-0 lg:w-[35%] xl:w-1/2 md:flex justify-end items-start mt-8 mt-md-0'
            >
              <button className="view_all relative text-black opacity-80 Oxanium bg-black hover:text-white border border-transparent group">
                View All
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {sectionImg && responsiveImage && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: sectionInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className='hidden sm:flex justify-center items-center self-center w-full container'
          >
            <Image src={sectionImg} layout='responsive' alt="Section Image" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: sectionInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className='flex sm:hidden justify-center items-center self-center'
          >
            <Image src={responsiveImage} alt="Responsive Image" />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
