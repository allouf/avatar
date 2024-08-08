"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import FirstSection from "@/components/firstSection";
import Header from "@/components/Header";
import SecondSection from "@/components/SecondSection";
import secondImage from "../../public/assets/smallWatch.png";
import secondImageResponsive from "../../public/assets/secondImageResponsive.webp";
import thirdImage from "../../public/assets/questNft.webp";
import thirdImageResponsive from "../../public/assets/thirdImageResponsive.svg";
import appleBtn from "../../public/assets/appstore-icon.svg";
import playStore from "../../public/assets/playstore-icon.svg";
import fourthImage from "../../public/assets/fourthImage.webp";
import fourthImageResponsive from "../../public/assets/fourthImageResponsive.webp";
import fifthImage from "../../public/assets/lastImg.webp";
import fifthImageResponsive from "../../public/assets/lastImgResponsive.webp";
import subscribe from "../../public/assets/subscribe.png";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import nft1 from "../../public/assets/nft1.webp";
import nft5 from "../../public/assets/nft7.webp";
import nft3 from "../../public/assets/nft3.webp";
import nft4 from "../../public/assets/nft4.webp";
import lineThing1 from "../../public/assets/line3.png";
import gradient from "../../public/assets/gradientBlue.svg";
import cardGradient from '../../public/assets/card-gradient.png';
import roadMapBg from '../../public/assets/roadmap-bg.png';
import zfGradient from '../../public/assets/zf-gradient.webp';
import toggleUp from '../../public/assets/toggle-up.png';
import Loader from '../components/loader.js'

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      const handleLoad = () => setLoading(false);
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);
  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { ref: sectionRef, inView: headingView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: formRef, inView: formInView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger when 10% of the section is visible
  });

  return (
    <>
      <div className="flex self-center items-center justify-center bg-black overflow-x-hidden w-full">
        {loading ? <Loader /> :
        <main className="flex relative z-0 min-h-screen flex-col items-center justify-between bg-black">
          <Header />
          <FirstSection />

          <div className="absolute left-0 z-[-1] w-[70%] top-[300px]">
            <Image src={lineThing1} />
          </div>

          <SecondSection
            preTitle={"Wearable Threads On Chain + AI "}
            blueText={"Gamified"}
            titleText={"DePin + SocialFI for AI "}
            paragraph={"Mini-games to level up your desired Identity on Smartwatch"}
            sectionImg={secondImage}
            responsiveImage={secondImageResponsive}
          />

          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: headingView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
          >
            <Image style={{ top: '-22%' }} className="absolute right-0" src={zfGradient} />
            <div className="container">
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: headingView ? 1 : 0, y: headingView ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className="gradient-text text-2xl sm:text-4xl xl:text-[50px] font-medium mt-10 lg:mt-28 md:text-center"
              >
                Distributed Wearable Avatar Network
              </motion.h4>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: headingView ? 1 : 0, y: headingView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative text-xs sm:text-sm mx-auto text-white inter mt-5 xl:mt-10 font-light inter xl:text-lg lg:w-[650px] xl:w-[850px] md:text-center"
              >
                Revolutionizing AI and social interactions. Users can engage in peer-to-peer zero knowledge exchanges, ensuring complete privacy and security during data transactions. Users will be rewarded for taking notes, interacting with artificial intelligence, and communicating with other users.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex mt-10 gap-4 justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: headingView ? 1 : 0, y: headingView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="playStore flex align-center w-max gap-2 py-1 md:py-2 xl:py-3 justify-center"
                >
                  <Image src={playStore} className="object-contain app-store" />
                  For Android
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: headingView ? 1 : 0, y: headingView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="appStore flex align-center w-max gap-2 py-1 md:py-2 xl:py-3 justify-center"
                >
                  <Image src={appleBtn} className="object-contain app-store" />
                  For IOS
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <gradientcontainer className="relative z-2 w-full">
            <SecondSection
              preTitle={"Incentivized But Not Play To Earn Model"}
              blueText={"ZK NFT Quests/"}
              titleText={"Games"}
              paragraph={"Gamified Threads with custom data variables"}
              sectionImg={thirdImage}
              responsiveImage={thirdImageResponsive}
            />
          </gradientcontainer>

          <SecondSection
            preTitle={"Earn desired cryptocurrency by creating AI + DAO pools on the smartwatch"}
            blueText={"Pair your any token"}
            titleText={"with AI"}
            paragraph={"Your token will be able Tell Jokes, Provide Advice, Offer Tips and much more."}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cards w-full relative"
          >
            <Image style={{ top: '-30%' }} className="absolute left-0" src={cardGradient} />
            <div className="container">
              <div className="px-2 sm:px-4 md:px-0 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5 md:my-7 lg:my-10 items-center justify-center">
                <Card img={nft1} hearts={"6"} cryptoName={"Floki"} userName={"User"} ethAmount={"7.09"} />
                <Card img={nft5} hearts={"7"} cryptoName={"Pepe"} userName={"User"} ethAmount={"5.15"} />
                <Card img={nft3} hearts={"8"} cryptoName={"Jesus"} userName={"User"} ethAmount={"0.62"} />
                <Card img={nft4} hearts={"6"} cryptoName={"Vinu"} userName={"User"} ethAmount={"12.89"} />
              </div>
            </div>
          </motion.div>

          <SecondSection
            className="mt-24"
            preTitle={"IDEA Engine: AI Wearable Crypto Collectibles Ecosystem"}
            titleText={"Tokenomics And Utility"}
            sectionImg={fourthImage}
            responsiveImage={fourthImageResponsive}
          />

          <div className="relative w-full mb-10 md:mb-20">
            <Image style={{ top: '-22%' }} className="w-[50%] hidden md:block absolute left-0" src={roadMapBg} />
            <gradientcontainer className="relative z-2">
              <SecondSection
                preTitle={"IDEA Token Supply"}
                titleText={"Roadmap"}
                sectionImg={fifthImage}
                responsiveImage={fifthImageResponsive}
              />
            </gradientcontainer>
          </div>

          <Footer />
          <div className="fixed bottom-8 right-8 z-10">
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full shadow-md hover:bg-gray-700 transition"
            >
              <Image src={toggleUp} className="w-6 h-6 text-white" />
            </button>
          </div>
        </main>
        }
      </div>
    </>
  );
}
