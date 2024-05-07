import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ConnectWallet } from '@thirdweb-dev/react';

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex className='headerInnr'>
        <img src='/images/logo.svg' alt='' className='main-logo' />
        <Flex
          flex={{ base: 1, xl: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', xl: 'none' }}
        >
          <IconButton
            className='toggel_btn'
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={7} h={7} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', xl: 'start' }}>
          <Flex display={{ base: 'none', xl: 'flex' }} className='hedr_width'>
            <Box className='desktopNav'>
              <ul className='left_hedr'>
                <li>
                  <Button as='a' href='/' className='semThree_btn'>
                    <svg
                      width='40'
                      height='17'
                      viewBox='0 0 40 17'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='37.1164'
                        cy='13.9646'
                        r='2.45287'
                        fill='white'
                      />
                      <path
                        className='path'
                        d='M37.4667 13.6148V1H1.02405V9.28971'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                    <img src='/images/menu-ic.svg' alt='' className='menu-ic' />
                    <img
                      src='/images/white_pepr_bg.svg'
                      alt=''
                      className='imgPernt'
                    />
                    <span>White paper</span>
                  </Button>
                </li>
                <li>
                  <a href="https://drive.google.com/file/d/1ZSMbAvM8ulRg9-saG0uZ-cZ8z44dsjvj/view" target="_blank" rel="noopener noreferrer">
                    <Button className='semThree_btn'>
                      <svg
                        width='40'
                        height='17'
                        viewBox='0 0 40 17'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <circle
                          cx='37.1164'
                          cy='13.9646'
                          r='2.45287'
                          fill='white'
                        />
                        <path
                          className='path'
                          d='M37.4667 13.6148V1H1.02405V9.28971'
                          stroke='white'
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                      </svg>
                      <img
                        src='/images/menu-ic02.svg'
                        alt=''
                        className='menu-ic'
                      />
                      <img
                        src='/images/visual_novel_img.svg'
                        alt=''
                        className='imgPernt'
                      />
                      <span className='center_txt'>Visual novel</span>
                    </Button>
                  </a>
                </li>
                <li>
                  <Button as='a' href='/' className='semThree_btn'>
                    <svg
                      width='40'
                      height='17'
                      viewBox='0 0 40 17'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='37.1164'
                        cy='13.9646'
                        r='2.45287'
                        fill='white'
                      />
                      <path
                        className='path'
                        d='M37.4667 13.6148V1H1.02405V9.28971'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                    <img
                      src='/images/menu-ic03.svg'
                      alt=''
                      className='menu-ic'
                    />
                    <img
                      src='/images/video_img.svg'
                      alt=''
                      className='imgPernt'
                    />
                    <span className='vido_span'>Video</span>
                  </Button>
                </li>
                {/* <li>
                        <ConnectWallet className='cont_wallt_btn' />
                    </li> */}
              </ul>
            </Box>
          </Flex>
        </Flex>

        <Stack className='wallt_pernt'>
          <ConnectWallet className='cont_wallt_btn' />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box className='mobileNav'>
          <ul className='left_hedr'>
            <li>
              <Button as='a' href='/' className='semThree_btn'>
                <svg
                  width='40'
                  height='17'
                  viewBox='0 0 40 17'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='37.1164' cy='13.9646' r='2.45287' fill='white' />
                  <path
                    className='path'
                    d='M37.4667 13.6148V1H1.02405V9.28971'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
                <img src='/images/menu-ic.svg' alt='' className='menu-ic' />
                <img
                  src='/images/white_pepr_bg.svg'
                  alt=''
                  className='imgPernt'
                />
                <span>White paper</span>
              </Button>
            </li>
            <li>
              <Button as='a' href='/' className='semThree_btn'>
                <svg
                  width='40'
                  height='17'
                  viewBox='0 0 40 17'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='37.1164' cy='13.9646' r='2.45287' fill='white' />
                  <path
                    className='path'
                    d='M37.4667 13.6148V1H1.02405V9.28971'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
                <img src='/images/menu-ic02.svg' alt='' className='menu-ic' />
                <img
                  src='/images/visual_novel_img.svg'
                  alt=''
                  className='imgPernt'
                />
                <span className='center_txt'>Visual novel</span>
              </Button>
            </li>
            <li>
              <Button as='a' href='/' className='semThree_btn'>
                <svg
                  width='40'
                  height='17'
                  viewBox='0 0 40 17'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='37.1164' cy='13.9646' r='2.45287' fill='white' />
                  <path
                    className='path'
                    d='M37.4667 13.6148V1H1.02405V9.28971'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
                <img src='/images/menu-ic03.svg' alt='' className='menu-ic' />
                <img src='/images/video_img.svg' alt='' className='imgPernt' />
                <span className='vido_span'>Video</span>
              </Button>
            </li>
            {/* <li>
                        <ConnectWallet className='cont_wallt_btn' />
                    </li> */}
          </ul>
        </Box>
      </Collapse>
    </Box>
  );
}
