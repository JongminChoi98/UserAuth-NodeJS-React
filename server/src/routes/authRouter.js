import express from "express";
import * as authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.delete("/", authController.deleteUser);
authRouter.post("/signup", authController.signup);

export default authRouter;
