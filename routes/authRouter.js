import {Router} from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { validateSignIn, validateSignUp } from "../middlewares/validateMiddleware.js";

const authRouter = Router();


authRouter.post("/sign-in", validateSignIn, signIn);

authRouter.post("/sign-up", validateSignUp, signUp);

export default authRouter;