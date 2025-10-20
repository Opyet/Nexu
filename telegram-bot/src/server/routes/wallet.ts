import { Router } from "express";
import { Wallet } from "ethers";

const router = Router();

type WalletInfo = { address: string; privateKey: string };
const wallets: Record<string, WalletInfo> = {};

const createWalletForUser = (userId: string): WalletInfo => {
    const wallet = Wallet.createRandom();
    wallets[userId] = { address: wallet.address, privateKey: wallet.privateKey };
    return wallets[userId];
};

const getWalletByUser = (userId: string): WalletInfo | undefined => wallets[userId];

const getBalance = (userId: string): string | null => {
    const wallet = wallets[userId];
    if (!wallet) return null;
    return "100.0 TEST"; // mock
};

router.post("/create-wallet", (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ error: "user_id is required" });

    const wallet = createWalletForUser(user_id);
    res.json({ address: wallet.address });
});

router.get("/balance", (req, res) => {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: "user_id is required" });

    const balance = getBalance(user_id as string);
    if (!balance) return res.status(404).json({ error: "Wallet not found" });

    res.json({ balance });
});

router.post("/bridge", (req, res) => {
    const { user_id, amount } = req.body;
    const wallet = getWalletByUser(user_id);
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    res.json({ success: true, amount, txHash: "0xDEMO1234" }); // mock
});

router.post("/deposit", (req, res) => {
    const { user_id, amount } = req.body;
    const wallet = getWalletByUser(user_id);
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });
    res.json({ success: true, amount, txHash: "0xDEMO5678" }); // mock
});

export default router;
