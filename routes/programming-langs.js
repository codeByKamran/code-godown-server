import express from "express";
import {
  getAllProgrammingLangs,
  postProgrammingLang,
} from "../controllers/programmingLangsController.js";

const langsRouter = express.Router();

langsRouter.get("/", getAllProgrammingLangs);
langsRouter.post("/", postProgrammingLang);

export default langsRouter;
