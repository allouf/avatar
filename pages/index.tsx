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
import { useAddress , useNetwork } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import { getRecord, saveRecord } from "../helper/api.helper";
import { EndpointUrl, endpointUrls } from "../helper/endpoint.helper";
import t1 from "../src/assets/img/Tetrahedron.json";
import t2 from "../src/assets/img/Cube.json";
import t3 from "../src/assets/img/octahedron.json";
import t4 from "../src/assets/img/Dodecahedron.json";
import t5 from "../src/assets/img/Icosahedron.json";
import man from "../public/images/rotating_3d_man_smaller.json";
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

  const [totalWallets, setTotalWallets] = useState(0);
  const [tokensPerUser, setTokensPerUser] = useState(0);

  const { chainId } = useNetwork();

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

  const getUserRegisterEmail = async (registeredUserEmail: string, address: string) => {
    try {
      console.log("test");
      const res = await getRecord(
        endpointUrls[EndpointUrl.IS_USER_WALLET_CONNECTED_WITH_EMAIL]?.replace(
          ":walletId",
          address
        )
      );
      
      console.log("res", res);
      if (res.isWalletConnectedWithEmail) {
        setAlreadyRegistered(res.isWalletConnectedWithEmail);
        setScreenType(SCREENS.REGISTERED);
      }
    } catch (error) {
      // Handle the error scenario appropriately here
      console.error('There was an error fetching the user registration email:', error);
  
      // Perhaps set a state variable indicating an error has occurred, display a message, etc.
      setError("There was an error fetching the user registration email: "+error); // assuming you have a state setter like 'setErrorState'
      // ... other error-related logic ...
  
      // Optionally, if you want to re-throw, make sure it's caught wherever 'getUserRegisterEmail' is called
      // throw error;
    }
  }

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
      walletId: address,
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
      .catch((error) => {
          if (error instanceof Error) {
            // Extract the server's response message
            console.error(error.message);
            // Display the server's error message to the user
            handleShowAlert("Error", error.message, "error");
          } else {
            // Handle cases where the error is not an instance of Error
            console.error('An unexpected error occurred');
            // Display a generic error message to the user
            handleShowAlert("Error", "An unexpected error occurred", "error");
          }
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

    // Check if the connected network is Ethereum Mainnet (chainId 1)
    useEffect(() => {
      if (chainId !== undefined && chainId !== 1) {
        toast({
          title: 'Network Error',
          description: 'Please connect to the Ethereum Mainnet.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }, [chainId, toast]);
  
    // Listen for changes in the wallet connection
    useEffect(() => {
      if (address) {
        // Wallet is connected or has changed
        console.log(`Wallet connected: ${address}`);
        // Refresh data or perform any actions needed when the wallet is connected or changed
        getUserRegisterEmail(registeredUserEmail, address);
      } else {
        // Wallet is disconnected
        console.log('Wallet disconnected');
        // Handle the wallet disconnection logic here
        setAlreadyRegistered(false);
        setScreenType(SCREENS.FEATURE);
        // Optionally, you could reset other state variables or redirect the user
      }
    }, [address, registeredUserEmail]);

  useEffect(() => {
    // Define an async function that fetches the airdrop stats
    async function fetchAirdropStats() {
        try {
            const endpoint = endpointUrls[EndpointUrl.GET_AIRDROP_STATS];
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json();
            // Assuming the data's structure matches what the API sends back
            setTotalWallets(data.estimatedTotalWallets);
            setTokensPerUser(data.airdropAmountPerWallet);
        } catch (error) {
            console.error('Error during airdrop stats fetch:', error);
        }
    }

    // Call the function
    fetchAirdropStats();
    
    // dependencies array can also include any other state variable 
    // that upon changing should re-trigger this effect
}, []);

useEffect(() => {
  // This function checks if the current address is registered
  const checkRegistration = async (currentAddress) => {
    try {
      const res = await getRecord(
        endpointUrls[EndpointUrl.IS_USER_WALLET_CONNECTED_WITH_EMAIL]?.replace(
          ":walletId",
          currentAddress
        )
      );
      
      if (res.isWalletConnectedWithEmail) {
        setAlreadyRegistered(res.isWalletConnectedWithEmail);
        setScreenType(SCREENS.REGISTERED);
        setRegisteredUserEmail(getItem()); // Assuming getItem() fetches the email associated with the current address
      } else {
        setAlreadyRegistered(false);
        setScreenType(SCREENS.FEATURE);
        setRegisteredUserEmail(null);
      }
    } catch (error) {
      console.error('There was an error fetching the user registration status:', error);
      setError("There was an error fetching the user registration status: " + error);
    }
  };

  if (address) {
    checkRegistration(address);
  }
}, [address]);

  useEffect(() => {
    if (!address || !registeredUserEmail) {
      setScreenType(SCREENS.FEATURE);
      // Early return to prevent further execution if the check fails.
      return;
    }
  
    getUserRegisterEmail(registeredUserEmail, address);
  }, [address, registeredUserEmail]);



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
  const manLottie = {
    loop: true,
    autoplay: true,
    animationData: man,
    /*rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },*/
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
                <Lottie options={manLottie}></Lottie>
              </Box>
            </Box>
            <Box className="five-loti-box five-loti-box_v2">
              <Box className="sem_loti_five">
                <Heading as="h1">Thought</Heading>
                <Lottie options={top} width={100} height={120}></Lottie>
              </Box>
              <Box className="sem_loti_five">
                <Heading as="h1">Emotion</Heading>
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
                      1000000
                  </Heading>
                  <Text className="def_per_c2 m_b_sem_c2">
                    Registered wallets
                  </Text>
                  <Heading as="h5" className="def_h5_c2 m_b_sem_c2">
                      {totalWallets}
                  </Heading>
                  <Text className="def_per_c2 m_b_sem_c2">Your Rewards</Text>
                  <Heading as="h5" className="def_h5_c2 m_b_sem_c2">
                      {tokensPerUser.toFixed(2)} $INCENTIVES
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
            {slideNum === 0 && (
            <Button onClick={moveToEmailScreen} isDisabled={alreadyRegistered}>
            {alreadyRegistered ? 'Joined' : 'Join'}
            </Button>
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
        </GridItem>
      </SimpleGrid>
      <hr className="full-width-line" />
        <div className="footer-border">
        <Box className="footer">
        <Box className="fort_left">
        <a href="http://www.the-incentives.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/mind_ic.svg" alt="Incentives Mind Icon" />
        </a>
        <Text className="footer-copyright">
          Copyright © 2024 Incentives <br />
          Incentives - AI Automations and blockchain
        </Text>
        </Box>
        <ul className="fotr_right">
        <li>
          <a href="https://x.com/Incentives01" target="_blank" rel="noopener noreferrer">
            <img src="/images/social_ic01.svg" alt="X Social Icon" />
          </a>
        </li>
        <li>
          <a href="https://t.me/Incentives01" target="_blank" rel="noopener noreferrer">
            <img src="/images/social_ic02.svg" alt="Telegram Social Icon" />
          </a>
        </li>
        <li>
          <a href="https://incentives101.substack.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/social_ic03.svg" alt="Substack Social Icon" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/idea_engine.ai/" target="_blank" rel="noopener noreferrer">
            <img src="/images/social_ic04.svg" alt="Instagram Social Icon" />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/@IDEA-EngineAI" target="_blank" rel="noopener noreferrer">
            <img src="/images/social_ic05.svg" alt="YouTube Social Icon" />
          </a>
        </li>
        </ul>
        </Box>
        </div>
    </div>
  );
};

export default Home;
