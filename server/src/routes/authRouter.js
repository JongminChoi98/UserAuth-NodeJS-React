import express from "express";
import * as authController from "../controllers/authController";
import { verifyUser } from "../../middlewares/auth";

const authRouter = express.Router();

/** Public */
authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

/** Private */
authRouter
  .route("/")
  .delete(verifyUser, authController.deleteUser)
  .get(verifyUser, authController.getUser);
authRouter.get("/logout", verifyUser, authController.logout);

export default authRouter;
