import express from "express";
import botController from "../controllers/botController";

const botRoute = express.Router();
botRoute.post("/get-bot", botController.find);
botRoute.post("/create-bot", botController.create);
botRoute.post("/update-bot", botController.update); 

export default botRoute;
