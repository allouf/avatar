import {
  Box,
  Button,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import { getRecord, saveRecord } from "../helper/api.helper";
import { EndpointUrl, endpointUrls } from "../helper/endpoint.helper";
import t1 from "../src/assets/img/File_name_t1.json";
import t2 from "../src/assets/img/File_name_t2.json";
import t3 from "../src/assets/img/File_name_t3.json";
import t4 from "../src/assets/img/File_name_t4.json";
import t5 from "../src/assets/img/File_name_t5.json";
import { LocalStorageKeys, useLocalStorage } from "../helper/localstorage.hook";
import Slider from "react-slick";

enum SCREENS {
  FEATURE = "feature",
  EMAIL = "email",
  REGISTERED = "registered",
}

const Home: NextPage = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [slideNum, setSlideNum] = useState(0);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const address = useAddress();
  const toast = useToast();
  const [screenType, setScreenType] = useState<SCREENS | string>("");
  const { setItem, getItem } = useLocalStorage(
    LocalStorageKeys.REGISTERED_USER_EMAIL
  );

  const [registeredUserEmail, setRegisteredUserEmail] = useState(getItem());

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target?.value || "";
    setEmail(emailValue);

    if (!event.target.validity.valid) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (address) {
      getUserRegisterEmail(registeredUserEmail, address);
    }

    if (!address || !registeredUserEmail) {
      setScreenType(SCREENS.FEATURE);
    }
  }, [address]);

  const getUserRegisterEmail = async (
    registeredUserEmail: string,
    address: string
  ) => {
    console.log("test");
    await getRecord(
      endpointUrls[EndpointUrl.IS_USER_WALLET_CONNECTED_WITH_EMAIL]?.replace(
        ":walletId",
        address
      )
    ).then((res) => {
      console.log("res", res);
      if (res.isWalletConnectedWithEmail) {
        setAlreadyRegistered(res.isWalletConnectedWithEmail);
        setScreenType(SCREENS.REGISTERED);
      }
    });
  };

  const moveToEmailScreen = () => {
    sliderRef?.slickGoTo(1);
    // setScreenType(SCREENS.EMAIL);
  };

  const joinWishList = () => {
    if (!email || !address) {
      handleShowAlert("Error", "'email' and 'walletId' are required", "error");
      return;
    }

    saveRecord(endpointUrls[EndpointUrl.JOIN_WISHLIST], {
      email: email,
      walletId: address || "0x2ffafa23d3323422342123123114asdf",
    })
      .then((res) => {
        console.log("here", email);
        setItem(email);
        setScreenType(SCREENS.REGISTERED);
        setRegisteredUserEmail(email);
        handleShowAlert(
          "Success",
          "Congratulations! You've been added to the wishlist.",
          "success"
        );
      })
      .catch((error: any) => {
        console.log("error", error);
        handleShowAlert("Error", address + " is already registered", "error");
      });
  };

  const handleShowAlert = (
    title: string,
    description: string,
    status: "info" | "warning" | "success" | "error" | "loading" | undefined
  ) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };

  const top = {
    loop: true,
    autoplay: true,
    animationData: t1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const top2 = {
    loop: true,
    autoplay: true,
    animationData: t2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const top3 = {
    loop: true,
    autoplay: true,
    animationData: t3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const top4 = {
    loop: true,
    autoplay: true,
    animationData: t4,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const top5 = {
    loop: true,
    autoplay: true,
    animationData: t5,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    afterChange: function (index: number) {
      setSlideNum(index);
    },
  };

  let sliderRef: any = useRef<any>(null);

  return (
    <div className="home-main">
      <SimpleGrid columns={12} columnGap={[2, 4, 6, 6]} rowGap={4}>
        <GridItem colSpan={[12, 12, 12, 6, 6]}>
          <Box className="avtr-sytm-main">
            <Heading as="h1" className="syst_heding">
              Avatar system
            </Heading>
            <Box className="avtar-systm avt_st_hi">
              <img
                src="/images/avatar_system_bg.svg"
                alt=""
                className="avatar_system_bg"
              />
              <Box className="loti_set">
                <img src="/images/human_img.svg" alt="" className="human_img" />
              </Box>
            </Box>
            <Box className="five-loti-box five-loti-box_v2">
              <Box className="sem_loti_five">
                <Heading as="h1">Emotion</Heading>
                <Lottie options={top} width={100} height={120}></Lottie>
              </Box>
              <Box className="sem_loti_five">
                <Heading as="h1">Thought</Heading>
                <Lottie options={top2} width={100} height={120}></Lottie>
              </Box>
              <Box className="sem_loti_five">
                <Heading as="h1">Imagination</Heading>
                <Lottie options={top3} width={100} height={120}></Lottie>
              </Box>
              <Box className="sem_loti_five">
                <Heading as="h1">Action</Heading>
                <Lottie options={top4} width={100} height={120}></Lottie>
              </Box>
              <Box className="sem_loti_five">
                <Heading as="h1">Belief</Heading>
                <Lottie options={top5} width={100} height={120}></Lottie>
              </Box>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={[12, 12, 12, 6, 6]}>
          <Slider
            {...settings}
            className="fr-brdr"
            ref={(slider: any) => {
              sliderRef = slider;
            }}
          >
            <div>
              <Box className="condson_box01 bordr_boxSem">
                <Box className="innrUpFlx">
                  <img
                    src="/images/idea_engine_side_img.png"
                    alt=""
                    className="idea_engine_side_img"
                  />
                  <Box>
                    <Heading as="h1" className="def_h1">
                      IDEA Engine
                    </Heading>
                    <Heading as="h6" className="def_h6 def_h6V2">
                      AI - Wearable Crypto
                    </Heading>
                    <Heading as="h6" className="def_h6 def_h6V2">
                      Collectibles Ecosystem
                    </Heading>
                  </Box>
                </Box>
                <Heading as="h2" className="def_h2">
                  FEATURES
                </Heading>
                <Box className="all_p_sem">
                  <Text>Wearable device </Text>
                  <Text>Digital Identity </Text>
                  <Text>Secured knowledge graph vault</Text>
                  <Text>AI + DAO Game Engine</Text>
                  <Text>IP tokenization/New NFT standard</Text>
                  <Text>Marketplace</Text>
                </Box>
              </Box>
            </div>

            {!alreadyRegistered ? (
              <div>
                <Box className="conyson_box03 bordr_boxSem avt_st_hi bordr_boxSem_three">
                  <Heading as="h1" className="def_h1 def_h1V2">
                    Join Our Exclusive Whitelist
                  </Heading>
                  {/* <Heading as="h1" className="def_h1">
                Email
              </Heading> */}
                  <Input
                    isInvalid={!!error}
                    errorBorderColor="red.300"
                    className="def_input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <p className="error">{error}</p>
                  <Text className="newAdd_txt">
                    Be eligible to receive a special <a href="#">$INCENTIVES</a>{" "}
                    Airdrop! Don't miss out on this unique opportunity to gain
                    early access and rewards. Sign up today with your wallet to
                    secure your spot and start benefiting!
                  </Text>
                </Box>
              </div>
            ) : (
              <div>
                <Box className="conyson_box02 bordr_boxSem bordr_boxSem_two">
                  <Text className="def_per_c2 m_b_sem_c2">Airdrop</Text>
                  <Heading as="h1" className="def_h1 m_b_sem_c2">
                    $INCENTIVES
                  </Heading>
                  <Heading as="h6" className="def_h6_c2 m_b_sem_c2">
                    1 000 000
                  </Heading>
                  <Text className="def_per_c2 m_b_sem_c2">
                    Registered wallets
                  </Text>
                  <Heading as="h5" className="def_h5_c2 m_b_sem_c2">
                    78923
                  </Heading>
                  <Text className="def_per_c2 m_b_sem_c2">Your Rewards</Text>
                  <Heading as="h5" className="def_h5_c2 m_b_sem_c2">
                    2356 $INCENTIVES
                  </Heading>
                </Box>
              </div>
            )}
          </Slider>
          {/* {screenType === SCREENS.FEATURE ? (

            ): (
                ''
              )} */}

          {/* {screenType === SCREENS.REGISTERED ? (
              
            ) : (
              ''
            )} */}

          {/* {screenType === SCREENS.EMAIL ? (
              
            ) : (
              ''
            )} */}
          <Box className="join_btn_pernt">
            {slideNum === 0 ? (
              <Button onClick={moveToEmailScreen}>Join</Button>
            ) : (
              ""
            )}
            {slideNum === 1 && !alreadyRegistered ? (
              <Button
                onClick={joinWishList}
                className={!address ? "disabled" : ""}
                isDisabled={!address}
              >
                Join Whitelist
              </Button>
            ) : (
              ""
            )}
            {slideNum === 1 && alreadyRegistered ? (
              <Button className={"disabled"} isDisabled={true}>
                Claim
              </Button>
            ) : (
              ""
            )}
          </Box>
          <Box className="footer">
            <Box className="fort_left">
              <img src="/images/mind_ic.svg" alt="" className="" />
              <Text>
                Copyright © 2024 Incentives <br />
                Incentives - AI Automations and blockchain
              </Text>
            </Box>
            <ul className="fotr_right">
              <li>
                <a href="#">
                  <img src="/images/social_ic01.svg" alt="" className="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/social_ic02.svg" alt="" className="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/social_ic03.svg" alt="" className="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/social_ic04.svg" alt="" className="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/social_ic05.svg" alt="" className="" />
                </a>
              </li>
            </ul>
          </Box>
        </GridItem>
      </SimpleGrid>
    </div>
  );
};

export default Home;
