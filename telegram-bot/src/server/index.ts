import express from "express";
import walletRoutes from "./routes/wallet";

const app = express();
app.use(express.json());

app.use("/api", walletRoutes);

app.listen(3000, () => console.log("Nexu server running on port 3000"));
