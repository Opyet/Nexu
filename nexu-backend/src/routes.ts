import { Router, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const AVAIL_NEXUS_API = "https://api.availproject.io/nexus";
const BLOCKSCOUT_API = "https://blockscout.com/api";

// helper for simulating delay during mock calls
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* -------------------------------------------------------------------------- */
/*                                BRIDGE ROUTE                                */
/* -------------------------------------------------------------------------- */

router.post("/bridge", async (req: Request, res: Response) => {
  const { userId, fromChain, toChain, amount, token } = req.body;

  console.log(`Bridge request received from user ${userId}`);

  try {
    // Simulate async bridge action (replace later with Nexus SDK)
    await wait(2000);

    const txHash = `0x${Math.random().toString(16).slice(2, 10)}ABC123`;

    res.json({
      status: "ok",
      message: `Moved ${amount || "100"} ${token || "USDC"} from ${fromChain || "ChainA"} → ${toChain || "ChainB"}`,
      txHash,
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
    // Simulate deposit (later connect to Aave or Morpho SDK)
    await wait(2000);

    const txHash = `0x${Math.random().toString(16).slice(2, 10)}DEF456`;

    res.json({
      status: "ok",
      message: `Deposited ${amount || "50"} ${token || "USDC"} into ${market || "Aave"} market`,
      txHash,
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
    res.status(500).json({ status: "error", message: "Could not fetch stats." });
  }
});

export default router;