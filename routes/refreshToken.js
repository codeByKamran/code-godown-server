import express from "express";
import { handleRefreshToken } from "../controllers/refreshTokenControllers.js";
const refreshTokenRouter = express.Router();

// Routes
refreshTokenRouter.get("/", handleRefreshToken);

export default refreshTokenRouter;
