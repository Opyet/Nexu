import { SUPPORTED_CHAINS_IDS, SUPPORTED_TOKENS } from "./constants";

/**
 * Parameters for transferring tokens.
 */
export interface TransferParams {
  token: SUPPORTED_TOKENS;
  amount: number | string;
  chainId: SUPPORTED_CHAINS_IDS;
  recipient: `0x${string}`;
  sourceChains?: number[];
}

/**
 * Result structure for transfer transactions.
 */
export type TransferResult =
  // Upon success, returns the transaction hash and explorer url
  | {
      success: true;
      transactionHash: string;
      explorerUrl: string;
    }
  // Upon failure, returns the error message
  | {
      success: false;
      error: string;
    };

/**
 * Parameters for bridging tokens.
 */
export interface BridgeParams {
  token: SUPPORTED_TOKENS;
  amount: number | string;
  chainId: SUPPORTED_CHAINS_IDS;
  gas?: bigint;
  sourceChains?: number[];
}

/**
 * Result structure for bridge transactions.
 */
export type BridgeResult =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      explorerUrl: string;
      transactionHash?: string;
    };
