import express from "express";
const logoutRouter = express.Router();
import { handleLogout } from "../../controllers/logoutHandler.js";

// Routes
logoutRouter.get("/", handleLogout);

export default logoutRouter;
