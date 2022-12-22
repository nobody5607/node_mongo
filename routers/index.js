import express from "express";
import botRoute from "./botRoute";
import otpRoute from "./otpRoute";
import syncRoute from "./syncRoute";
import transactionRoute from "./transactionRoute";
import withdrawRoute from "./withdrawRoute";

const indexRouter = express.Router();

indexRouter.use("/bot", botRoute);
indexRouter.use("/otp", otpRoute);
indexRouter.use("/sync", syncRoute);
indexRouter.use("/transaction", transactionRoute);
indexRouter.use("/withdraw", withdrawRoute);

export default indexRouter;
