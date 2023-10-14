import express from "express";
import * as authController from "../controllers/authController";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "We need token. Please provide it" });
  } else {
    jwt.verify(token, "jwt-secret", (err, decoded) => {
      if (err) {
        return res.json({ message: "Authentication Error." });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

authRouter
  .route("/")
  .delete(authController.deleteUser)
  .get(verifyUser, authController.getUser);
authRouter.get("/logout", authController.logout);
authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

export default authRouter;
