import { Router, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { nexusSdk } from "./utils/nexusClient";
import { ethers } from "ethers";
// import { BridgeParams, TransferParams } from "./utils/types";
import { SUPPORTED_CHAINS_IDS, SUPPORTED_TOKENS } from "./utils/constants";
import { BridgeParams, TransferParams } from "@avail-project/nexus-core";

dotenv.config();

const router = Router();

// helper for simulating delay during mock calls
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* -------------------------------------------------------------------------- */
/*                                BRIDGE ROUTE                                */
/* -------------------------------------------------------------------------- */

router.post("/bridge", async (req: Request, res: Response) => {
  const { userId, fromChain, toChain, amount, token } = req.body;

  console.log(`Bridge request received from user ${userId}`);

  try {
    const tx = await nexusSdk.bridge({
      token: SUPPORTED_TOKENS.USDC, // Convert selected tokens to USDC
      amount: 100,
      chainId: SUPPORTED_CHAINS_IDS.POLYGON_MAINNET,
      sourceChains: [84532, 80002], // Only use USDC from `Base Sepolia` and `Polygon Amoy` as sources for the bridge
    } as BridgeParams);

    res.json({
      status: "ok",
      message: `Moved ${amount || "100"} ${token || "USDC"} from ${
        fromChain || "ChainA"
      } → ${toChain || "ChainB"}`,
    });
  } catch (error) {
    console.error("Bridge error:", error);
    res.status(500).json({ status: "error", message: "Bridge action failed." });
  }
});

router.post("/bridge-preview", async (req: Request, res: Response) => {
  const { userId, fromChain, toChain, amount, token } = req.body;

  console.log(`Bridge preview request received from user ${userId}`);

  try {
    const tx = await nexusSdk.simulateBridge({
      token: "USDC",
      amount: 100,
      chainId: 137,
    });

    res.json({
      status: "ok",
      message: `Moved ${amount || "100"} ${token || "USDC"} from ${
        fromChain || "ChainA"
      } → ${toChain || "ChainB"}`,
    });
  } catch (error) {
    console.error("Bridge error:", error);
    res.status(500).json({ status: "error", message: "Bridge action failed." });
  }
});

/* -------------------------------------------------------------------------- */
/*                               DEPOSIT ROUTE                                */
/* -------------------------------------------------------------------------- */

router.post("/deposit", async (req: Request, res: Response) => {
  const { userId, market, amount, token } = req.body;

  console.log(`Deposit request received from user ${userId}`);

  try {
    const tx = await nexusSdk.transfer({
      token: SUPPORTED_TOKENS.USDC, // Convert selected tokens to USDC
      amount: 100,
      chainId: SUPPORTED_CHAINS_IDS.ARBITRUM_ONE, // Transfer selected funds to Arbitrum
      recipient: "0x...",
      sourceChains: [SUPPORTED_CHAINS_IDS.BASE_SEPOLIA, SUPPORTED_CHAINS_IDS.POLYGON_AMOY], // Only use ETH from `Base Sepolia` and `Polygon Amoy` as sources for the transfer
    } as TransferParams);

    res.json({
      status: "ok",
      message: `Deposited ${amount || "50"} ${token || "USDC"} into ${
        market || "Aave"
      } market`,
    });
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(500).json({ status: "error", message: "Deposit failed." });
  }
});

router.post("/preview-deposit", async (req: Request, res: Response) => {
  const { userId, market, amount, token } = req.body;

  console.log(`Deposit preview request received from user ${userId}`);

  try {
    const tx = await nexusSdk.simulateTransfer({
      token: "USDC",
      amount: 100,
      chainId: SUPPORTED_CHAINS_IDS.ARBITRUM_ONE,
      recipient: "0x...",
      sourceChains: [SUPPORTED_CHAINS_IDS.BASE_SEPOLIA, SUPPORTED_CHAINS_IDS.POLYGON_AMOY],
    });

    res.json({
      status: "ok",
      message: `Deposited ${amount || "50"} ${token || "USDC"} into ${
        market || "Aave"
      } market`,
    });
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(500).json({ status: "error", message: "Deposit failed." });
  }
});

/* -------------------------------------------------------------------------- */
/*                                STATS ROUTE                                 */
/* -------------------------------------------------------------------------- */

router.get("/stats", async (req: Request, res: Response) => {
  const { userId, address } = req.query;

  console.log(`Stats requested by user ${userId}`);

  try {
    // Replace mock with actual Blockscout API call later
    const userStats = {
      address: address || "0x1234...abcd",
      balance: "1250.43 USDC",
      transactions: 42,
      yieldEarned: "15.8 USDC",
    };

    res.json({
      status: "ok",
      data: userStats,
    });
  } catch (error) {
    console.error("Stats error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Could not fetch stats." });
  }
});

router.get("/unified-balances-all", async (req: Request, res: Response) => {
  const { userId, address } = req.query;

  console.log(`Unified balances requested by user ${userId}`);

  try {
    if (!nexusSdk.isInitialized()) {
      res
        .status(500)
        .json({ status: "error", message: "no provider initialised" });
      return;
    }

    const allBalances = await nexusSdk.getUnifiedBalances();

    res.json({
      status: "ok",
      data: allBalances,
    });
  } catch (error) {
    console.error("Unified balances error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Could not fetch unified balances." });
  }
});

router.get("/unified-balance", async (req: Request, res: Response) => {
  const { userId, address, token } = req.query;

  console.log(`Unified token balance requested by user ${userId}`);

  try {
    if (!nexusSdk.isInitialized()) {
      res
        .status(500)
        .json({ status: "error", message: "no provider initialised" });
      return;
    }

    const tokenBalances = await nexusSdk.getUnifiedBalance(token as string);

    res.json({
      status: "ok",
      data: tokenBalances,
    });
  } catch (error) {
    console.error("Unified token balance error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Could not fetch unified token balance." });
  }
});

export default router;
