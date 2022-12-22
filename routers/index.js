import express from "express";
import botRoute from "./botRoute";
const indexRouter = express.Router();

indexRouter.use("/bot", botRoute);

export default indexRouter;
