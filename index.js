import express, {json} from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(authRouter);

app.use(userRouter);

app.listen(PORT, ()=>{
    console.log(`Servidor conectado na porta ${PORT}!`);
});