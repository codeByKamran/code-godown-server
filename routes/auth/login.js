import express from "express";
import { loginUser } from "../../controllers/loginControllers.js";
const loginRouter = express.Router();

// Routes
loginRouter.post("/", loginUser);

export default loginRouter;
