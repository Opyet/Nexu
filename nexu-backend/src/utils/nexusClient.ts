import { NexusNetwork, NexusSDK } from "@avail-project/nexus-core";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

// Example: provider setup for testnet
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Private key from .env for signing transactions
const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

// Initialize Nexus SDK
export const nexusSdk = new NexusSDK({
  network: (process.env.NETWORK || "testnet") as NexusNetwork,
});

// Thin wrapper that calls nexusSdk.isInitialized() from the SDK
export function isInitialized() {
  return nexusSdk.isInitialized();
}

export async function initializeWithProvider(provider: any) {
  if (!provider) throw new Error("No EIP-1193 provider (e.g., MetaMask) found");

  //If the SDK is already initialized, return
  if (nexusSdk.isInitialized()) return;

  //If the SDK is not initialized, initialize it with the provider passed as a parameter
  await nexusSdk.initialize(provider);
}

export async function deinit() {
  //If the SDK is not initialized, return
  if (!nexusSdk.isInitialized()) return;

  //If the SDK is initialized, de-initialize it
  await nexusSdk.deinit();
}

export async function getUnifiedBalances() {
  //Get the unified balances from the SDK
  return await nexusSdk.getUnifiedBalances();
}
