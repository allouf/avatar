const backendUrl = process.env.NODE_ENV === 'production'
  ? `https://whitelist-seven-delta.vercel.app`
  : 'http://localhost:3000';

export const domainUrl = `${backendUrl}/api`;
export enum EndpointUrl {
  JOIN_WISHLIST = 0,
  IS_USER_WALLET_CONNECTED_WITH_EMAIL = 1,
  GET_AIRDROP_STATS = 2, 
  JOIN_WHITELIST = 3,
}

// Define the corresponding URLs separately
export const endpointUrls: Record<EndpointUrl, string> = {
  [EndpointUrl.JOIN_WISHLIST]: `${domainUrl}/userWallet`,
  [EndpointUrl.IS_USER_WALLET_CONNECTED_WITH_EMAIL]: `${domainUrl}/isUserWalletConnectedWithEmail?walletId=:walletId`,
  [EndpointUrl.GET_AIRDROP_STATS]: `${domainUrl}/userWalletStats`,
  [EndpointUrl.JOIN_WHITELIST]: `${domainUrl}/joinWhitelist`,
};

export default { EndpointUrl, endpointUrls };
