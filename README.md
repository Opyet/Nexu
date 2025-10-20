# 🚀 Nexu

**Nexu** is an AI-powered Telegram bot that bridges Web3 and DeFi seamlessly.  
It enables users to **bridge and deposit unified stablecoins (USDC/USDT)** across multiple chains using **Avail Nexus SDK**, automatically finding and depositing into the **highest-yield markets** on **Aave** or **Morpho**.  

At the same time, Nexu leverages **Blockscout SDK** and **Blockscout MCP** to **track balances, analyze transactions, and explain wallet activity** — all through natural chat in Telegram.

---

## 🧩 Project Overview

**Nexu** simplifies cross-chain DeFi through conversation.  
In just a few commands, users can:

1. **Bridge & Deposit** stablecoins (USDC/USDT) using **Avail Nexus SDK**.
2. **Track token balances and yields** across lending protocols with **Blockscout SDK**.
3. **Summarize wallet activity** and explain transaction intent via **LLM reasoning** with **Blockscout MCP**.

Built for accessibility and automation, Nexu runs entirely inside **Telegram**, eliminating the need for complex dApp interfaces or browser wallets.

---

## 🏆 Hackathon Bounties Applied For

### 🥇 1. Build Unchained Apps with Avail Nexus SDK (General Track)
We built an AI-powered Telegram bot that lets users deposit **unified USDC/USDT** into the **highest-yield market on Aave or Morpho**, leveraging **Avail Nexus SDK** for seamless liquidity transfer across chains.

### 🥈 2. Best DeFi or Payments App with Avail Nexus SDK
Nexu integrates **cross-chain intents** through the **Avail Nexus SDK** — using features like **Bridge & Execute** and **XCS Swaps** to automate yield-optimized DeFi deposits and cross-chain stablecoin movements.

### 🥉 3. Best Blockscout SDK Integration
Nexu integrates **Blockscout SDK** to fetch and visualize wallet data, balances, and transaction counts across multiple chains — directly within Telegram chat.

### 🤖 4. Best Use of Blockscout MCP (Vibecode)
We implemented **Blockscout MCP** to build an LLM-driven feature that **summarizes wallet activity** and **explains transactions** in plain language — helping users understand on-chain behavior with AI insights.

---

## 🧠 Architecture Flow (Simplified MVP)

[User on Telegram]
↓
[Telegram Bot API]
↓
[Backend (Node.js + TypeScript)]
├── Avail Nexus SDK → Bridge + Deposit stablecoins
├── Blockscout SDK → Track balances and transactions
├── Blockscout MCP → LLM reasoning and transaction summaries
└── PostgreSQL (optional) → Store session and user data

---

## 🛠️ Tech Stack

| Layer | Tools / Libraries | Purpose |
|-------|-------------------|----------|
| **Bot Framework** | `node-telegram-bot-api` | Build Telegram command interface |
| **Backend** | `Node.js` + `TypeScript` + `Express` | API server and logic layer |
| **Web3 / DeFi** | `Avail Nexus SDK` + `ethers.js` | Cross-chain bridging & stablecoin transfers |
| **Data / Analytics** | `Blockscout SDK` | Fetch token balances and transaction histories |
| **AI Layer** | `Blockscout MCP` + `OpenAI API` | Natural-language reasoning for wallet activity |
| **Database (optional)** | `PostgreSQL` or `SQLite` | Store user sessions and mapping to wallets |

---

## 💡 Implementation Notes

- Built a **server-side wallet** (for MVP speed) that executes deposits via Avail Nexus SDK.  
- Used **LLM prompts** to summarize wallet activities fetched from Blockscout SDK.  
- Used **cross-chain stablecoin unification** logic to find the best yield market dynamically.  
- Telegram interface keeps the user flow frictionless — no browser popups or wallet installs required.  

---

## ⚙️ Installation

```bash
# 1. Clone repository
git clone https://github.com/Opyet/Nexu.git
cd nexu-backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Build TypeScript
npm run build

# 5. Start the bot
npm start

```
## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
BOT_TOKEN | Telegram bot token |
RPC_URL | JSON-RPC endpoint for chain connection |
PRIVATE_KEY | Private key for the backend wallet (testnet only) |
BLOCKSCOUT_API_KEY | API key for Blockscout SDK |
OPENAI_API_KEY | API key for LLM reasoning via Blockscout MCP |

## 🚀 Usage

In Telegram, simply type:

```bash
/start - Initialize Nexu bot
/deposit - Bridge and deposit stablecoins (USDC/USDT)
/balance - View current balances across chains
/summary - Get AI summary of wallet activity
```

## 🤝 Team

Team Nexu
* Opeyemi - /Opyet
* Andreya - 
* Ahmed
* Tat

## 🧭 Future Plans

* Add WalletConnect for real user wallets
* Expand chain coverage with Avail Nexus
* Introduce on-chain yield analytics dashboard
* Enable Telegram-native notifications for portfolio events


## 📜 License

MIT License © 2025 Team Nexu