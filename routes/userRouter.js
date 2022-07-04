import { Router } from "express";
import { verifyToken } from "../middlewares/userMiddleware.js";
import { getOperations, addOperation } from "../controllers/userController.js";


const userRouter = Router();
userRouter.use(verifyToken);

userRouter.get("/infos", getOperations);

userRouter.post("/infos", addOperation);

export default userRouter;