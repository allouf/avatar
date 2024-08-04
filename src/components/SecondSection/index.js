import React from 'react'
import Image from 'next/image'
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
    return (
        <div className='text-white md:flex flex-col mt-16 md:mt-24 xl:mt-48 w-full'>
            <div className='container'>
                <div className='md:flex justify-between items-end'>
                    <div className='w-full mb-5'>
                        <p className='LatoLight capitalize preTitle text-xs sm:text-sm'>
                            {preTitle}
                        </p>
                        <h2 className='capitalize break-words Oxanium text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-5 xl:mt-10 mainTitle'>
                            {blueText ? (
                                <span className='inline text-custom-blue mr-3'>
                                    {blueText}
                                </span>
                            ) : null}
                            {titleText}
                        </h2>
                        <p className='capitalize w-[80%] Oxanium text-sm  mt-3 lg:mt-5  font-thin lg:mb-0 lg:w-1/3 subtext'>
                            {paragraph}
                        </p>
                    </div>
                    {viewAllBtn &&
                        <div className="px-3 px-md-0 lg:w-[35%]  xl:w-1/2 md:flex justify-end items-start mt-8 mt-md-0">
                            <button2 className="view_all relative text-black opacity-80 Oxanium bg-black hover:text-white border border-transparent group">
                                View All
                            </button2>
                        </div>
                    }
                </div>
            </div>

            {sectionImg && responsiveImage &&

                <>
                    <div className='hidden sm:flex justify-center items-center self-center w-full container'>
                        <Image src={sectionImg} layout='responsive' />
                    </div>
                    <div className='flex sm:hidden justify-center items-center self-center'>
                        <Image src={responsiveImage} />
                    </div>
                </>
            }

        </div>
    )
}
