import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import {useAddress, useNetwork} from "@thirdweb-dev/react";
import {NextPage} from "next";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import Lottie from "react-lottie";
import {getRecord, saveRecord} from "../helper/api.helper";
import {EndpointUrl, endpointUrls} from "../helper/endpoint.helper";
import t1 from "../src/assets/img/Tetrahedron.json";
import t2 from "../src/assets/img/Cube.json";
import t3 from "../src/assets/img/octahedron.json";
import t4 from "../src/assets/img/Dodecahedron.json";
import t5 from "../src/assets/img/Icosahedron.json";
import man from "../public/images/rotating_3d_man_smaller.json";
import {LocalStorageKeys, useLocalStorage} from "../helper/localstorage.hook";
import Slider, {Settings} from "react-slick";

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
  const {setItem, getItem} = useLocalStorage(
    LocalStorageKeys.REGISTERED_USER_EMAIL
  );

  const [totalWallets, setTotalWallets] = useState(0);
  const [tokensPerUser, setTokensPerUser] = useState(0);

  const [network] = useNetwork();
  const chainId = network.data.chain?.chainId;

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
      setError("There was an error fetching the user registration email: " + error); // assuming you have a state setter like 'setErrorState'
      // ... other error-related logic ...

      // Optionally, if you want to re-throw, make sure it's caught wherever 'getUserRegisterEmail' is called
      // throw error;
    }
  }

  const moveToEmailScreen = () => {
    sliderRef.current?.slickGoTo(1);
    // setScreenType(SCREENS.EMAIL);
  };

  const joinWishList = async () => {
    if (!email || !address) {
      handleShowAlert("Error", "'email' and 'walletId' are required", "error");
      return;
    }

    try {
      const res = await saveRecord(endpointUrls[EndpointUrl.JOIN_WISHLIST], {
        email: email,
        walletId: address,
      });
      console.log("here", email);
      await fetchAirdropStats(); // Make sure this function is defined as async
      setItem(email);
      setAlreadyRegistered(true);
      setScreenType(SCREENS.REGISTERED);
      setRegisteredUserEmail(email);
      handleShowAlert(
        "Success",
        "Congratulations! You've been added to the wishlist.",
        "success"
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        handleShowAlert("Error", error.message, "error");
      } else {
        console.error('An unexpected error occurred');
        handleShowAlert("Error", "An unexpected error occurred", "error");
      }
    }
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
    // Check if chainId is defined and not equal to 1 (Ethereum Mainnet)
    if (typeof chainId === 'number' && chainId !== 1) {
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

  const fetchAirdropStats = async () => {
    try {
      const response = await fetch('/api/userWalletStats');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setTotalWallets(data.estimatedTotalWallets);
      setTokensPerUser(data.airdropAmountPerWallet);
    } catch (error) {
      console.error('Error during airdrop stats fetch:', error);
    }
  };

  useEffect(() => {
    // Call the function
    fetchAirdropStats();
    // dependencies array can also include any other state variable
    // that upon changing should re-trigger this effect
  }, []);

  useEffect(() => {
    // This function checks if the current address is registered
    const checkRegistration = async (currentAddress: string) => {
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
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    afterChange: function (index: number) {
      setSlideNum(index);
    },
  };

  let sliderRef: any = useRef<any>(null);

  return (
    <div className="home-main">
      <SimpleGrid columns={12} columnGap={[2, 4, 6, 6]} rowGap={8} className="content-container">
        <GridItem colSpan={[12, 12, 12, 6, 6]} order={0}>
          <Box className="avatar-system-container">
            <Text className="heading">
              Avatar system
            </Text>

            <Box className="avatar-system">
              <img
                className="avatar-system-bg"
                src="/images/avatar_system_bg.svg"
                alt=""
              />
              <Box className="avatar-system-fg">
                <Lottie options={manLottie}></Lottie>
              </Box>
            </Box>
          </Box>
        </GridItem>

        <GridItem colSpan={[12, 12, 12, 6, 6]} order={[2, 2, 2, 1, 1]} className="join-section">
          <Slider
            {...settings}
            className="slider-container"
            ref={sliderRef}
          >
            <div>
              <Box className="slide-container">
                <Box className="hero-logo">
                  <img
                    src="/images/logo.svg"
                    alt="IDEA Engine"
                    className="hero-logo-image"
                  />
                  <Box>
                    <Heading as="h1" className="heading-1">
                      IDEA Engine
                    </Heading>
                    <Text className="subheading-1">
                      AI - Wearable Crypto
                    </Text>
                    <Text className="subheading-1">
                      Collectibles Ecosystem
                    </Text>
                  </Box>
                </Box>
                <Flex direction="column" alignItems="center" className="slide-content">
                  <Heading as="h2" className="heading-2">FEATURES</Heading>
                  <Text className="paragraph">Wearable device</Text>
                  <Text className="paragraph">Digital Identity</Text>
                  <Text className="paragraph">Secured knowledge graph vault</Text>
                  <Text className="paragraph">AI + DAO Game Engine</Text>
                  <Text className="paragraph">IP tokenization/New NFT standard</Text>
                  <Text className="paragraph">Marketplace</Text>
                </Flex>
              </Box>
            </div>

            {!alreadyRegistered ? (<div>
              <Box className="slide-container">
                <Heading as="h1" className="heading-1 slide-content">
                  Join Our Exclusive Whitelist
                </Heading>

                <Box className="input-container">
                  <Input
                    isInvalid={!!error}
                    errorBorderColor="red.300"
                    className="input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <p className="error">{error}</p>
                </Box>
                <Text className="paragraph slide-content">
                  Be eligible to receive a special <a href="#">$INCENTIVES</a>{" "}
                  Airdrop! Don't miss out on this unique opportunity to gain
                  early access and rewards. Sign up today with your wallet to
                  secure your spot and start benefiting!
                </Text>
              </Box>
            </div>) : (<div>
              <Box className="slide-container">
                <Box className="slide-content">
                  <Text className="subheading-1">Airdrop</Text>
                  <Heading as="h1" className="heading-1">
                    $INCENTIVES
                  </Heading>
                  <Text className="stat">
                    1000000
                  </Text>
                </Box>
                <Box className="slide-content">
                  <Heading as="h2" className="heading-2">
                    Registered wallets
                  </Heading>
                  <Text className="stat">
                    {totalWallets}
                  </Text>
                </Box>
                <Box className="slide-content">
                  <Heading as="h2" className="heading-2">Your Rewards</Heading>
                  <Text className="stat">
                    {tokensPerUser.toFixed(2)} $INCENTIVES
                  </Text>
                </Box>
              </Box>
            </div>)}
          </Slider>

          <Box className="join-button-container">
            {slideNum === 0 && (
              <Button onClick={moveToEmailScreen} isDisabled={alreadyRegistered}>
                {alreadyRegistered ? 'Joined' : 'Join'}
              </Button>
            )}
            {slideNum === 1 && !alreadyRegistered && (
              <Button
                onClick={joinWishList}
                className={!address ? "disabled" : ""}
                isDisabled={!address}
              >
                Join Whitelist
              </Button>
            )}
            {(slideNum === 1 && alreadyRegistered) && (
              <Button className={"disabled"} isDisabled={true}>
                Claim
              </Button>
            )}
          </Box>
        </GridItem>

        <GridItem hideFrom={['lg']} colSpan={12} order={[3, 3, 3, 2, 2]}>
          <hr className="full-width-line"/>
        </GridItem>

        <GridItem colSpan={[12, 12, 12, 6, 6]} order={[1, 1, 1, 3, 3]}>
          <Box className="shape-grid">
            <Box className="shape-container">
              <Text>Thought</Text>
              <Lottie options={top}></Lottie>
            </Box>
            <Box className="shape-container">
              <Text>Emotion</Text>
              <Lottie options={top2}></Lottie>
            </Box>
            <Box className="shape-container">
              <Text>Imagination</Text>
              <Lottie options={top3}></Lottie>
            </Box>
            <Box className="shape-container">
              <Text>Action</Text>
              <Lottie options={top4}></Lottie>
            </Box>
            <Box className="shape-container">
              <Text>Belief</Text>
              <Lottie options={top5}></Lottie>
            </Box>
          </Box>
        </GridItem>

        <GridItem colSpan={[12, 12, 12, 6, 6]} order={4}>
          <Box className="footer">
            <Box className="footer-left">
              <a href="http://www.the-incentives.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/mind_ic.svg" alt="Incentives Mind Icon"/>
              </a>
              <Text className="footer-copyright">
                Copyright © 2024 Incentives<br/>
                Incentives - AI Automations and blockchain<br/>
                <a href="mailto:sales@idea-engine.ai">sales@idea-engine.ai</a>
              </Text>
            </Box>
            <ul className="footer-right">
              <li>
                <a href="https://x.com/Incentives01" target="_blank" rel="noopener noreferrer">
                  <img src="/images/social_ic01.svg" alt="X Social Icon"/>
                </a>
              </li>
              <li>
                <a href="https://t.me/Incentives01" target="_blank" rel="noopener noreferrer">
                  <img src="/images/social_ic02.svg" alt="Telegram Social Icon"/>
                </a>
              </li>
              <li>
                <a href="https://incentives101.substack.com/" target="_blank" rel="noopener noreferrer">
                  <img src="/images/social_ic03.svg" alt="Substack Social Icon"/>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/idea_engine.ai/" target="_blank" rel="noopener noreferrer">
                  <img src="/images/social_ic04.svg" alt="Instagram Social Icon"/>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@IDEA-EngineAI" target="_blank" rel="noopener noreferrer">
                  <img src="/images/social_ic05.svg" alt="YouTube Social Icon"/>
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
