import express from "express";
import UserController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", UserController.register);

export default userRouter;
