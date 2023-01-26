import { PublicKey } from '@solana/web3.js';

export const DEV_NET = 'devnet';
export const MAIN_NET = 'mainnet';
export const MAIN_NETS = 'https://api.mainnet-beta.solana.com';
export const DEV_NETS = 'https://api.devnet.solana.com';
export const APP_WALLET = true;
export const ADAPTER = '_adapter_immortaldb';  
//we get the program id from the deploy program
export const programId = new PublicKey('D2Nh5ntLRLtcpJej1tvYjT1R5sRSnjVNNRXAS8XA5v8o');
export const NativeprogramId = new PublicKey('FXbGHEX6JMCqssdabSsQjtKAuBHdBHzhQJC6Uv8YifWF');
export const PARENT_CONTRACT_ID = new PublicKey('8HSEcgBE9kmTbcX17yFrqJbKbuenbw1S9UMuMWfEFXjD');
export const ADDRESS_CONTRACT_ID = new PublicKey('67M81N7a5aZtadMYSzwgAotjAqj4r2A28S6737mCijqS');
export const PROFILE_CONTRACT_ID = new PublicKey('8qnRL6jeaa9j79BQ1NUppqZy2oNHnGSXDHYMcYyH57X4');

export const config = {
	[MAIN_NET]: { httpUri: 'https://api.mainnet-beta.solana.com' },
	[DEV_NET]: { httpUri: 'https://api.devnet.solana.com' }
};

// for Twitter name service
// export const HASH_PREFIX = 'SPL Name Service';
// export const NAME_PROGRAM_ID = new PublicKey('namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX');
// export const TWITTER_ROOT_PARENT_REGISTRY_KEY = new PublicKey(
// 	'4YcexoW3r78zz16J2aqmukBLRwGq6rAvWzJpkYAXqebv'
// );
