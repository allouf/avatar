export const domainUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
export enum EndpointUrl {
  JOIN_WISHLIST = 0,
  IS_USER_WALLET_CONNECTED_WITH_EMAIL = 1,
}

// Define the corresponding URLs separately
export const endpointUrls: Record<EndpointUrl, string> = {
  [EndpointUrl.JOIN_WISHLIST]: `${domainUrl}/userWallet`,
  [EndpointUrl.IS_USER_WALLET_CONNECTED_WITH_EMAIL]: `${domainUrl}/isUserWalletConnectedWithEmail?walletId=:walletId`,
};

export default { EndpointUrl, endpointUrls };
