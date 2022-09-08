import express from "express";
const registerRouter = express.Router();
import { registerNewUser } from "../../controllers/registerControllers.js";

// Routes
registerRouter.post("/", registerNewUser);

export default registerRouter;
