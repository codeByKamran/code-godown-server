import express from "express";
import { userRoles } from "../config/userRoles.js";
import {
  addLabel,
  deleteLabel,
  getManyLabels,
  getLabelById,
  getLabels,
  updateLabel,
} from "../controllers/labelsController.js";
import verifyRoles from "../middlewares/verifyRoles.js";
const labelsRouter = express.Router();

// Routes

labelsRouter.get("/:id", getLabelById); // everyone can hit

labelsRouter.get("/", getLabels); // everyone can hit

labelsRouter.post("/many", getManyLabels); // everyone can hit

labelsRouter.post("/", verifyRoles(userRoles.Admin, userRoles.User), addLabel); // only admin can hit

labelsRouter.put(
  "/:id",
  verifyRoles(userRoles.Admin, userRoles.User),
  updateLabel
); // only admin can hit

labelsRouter.delete(
  "/:id",
  verifyRoles(userRoles.Admin, userRoles.User),
  deleteLabel
); // only admin can hit

export default labelsRouter;
