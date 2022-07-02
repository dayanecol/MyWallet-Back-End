import express, {json} from "express";
import cors from "cors";
import joi from "joi";
import db from "./mongo.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


const app = express();
app.use(json());
app.use(cors());

const PORT = process.env.PORT || 5000;


app.post("/sign-in", async (req,res)=>{
    const {email, password} = req.body;

    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(3).required()
    });
    const validation = signInSchema.validate(req.body);
    if (validation.error){
        console.log("Erro na validacao");
        res.sendStatus(422);
        return;
    }
    try {
        const user = await db.collection('users').findOne({email:req.body.email});
        if(!user){
            res.sendStatus(404);
            return;
        }
        if(user && bcrypt.compareSync(req.body.password,user.password)){
            const token = uuid();
            await db.collection("sessions").insertOne({
                userId: user._id,
                token
            })

        res.send({token, name:user.name});
        }
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
        return;
    }
});

app.post("/sign-up", async (req,res) => {
    const {name, email, password, passwordAgain} = req.body;

    const signUpSchema = joi.object({
        name: joi.string().min(1).required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).required(),
        passwordAgain: joi.ref('password')
    });
    const validation = signUpSchema.validate(req.body);
    if (validation.error){
        res.sendStatus(422);
        return;
    }
    try {
        const passwordHashed = bcrypt.hashSync(password,10);
        await db.collection('users').insertOne({
            name,
            email,
            password: passwordHashed 
        });
        res.sendStatus(201);
    } catch (error) {
        console.log("PRBLEMA!")
        res.sendStatus(500);
        return;
    }

});

app.listen(PORT, ()=>{
    console.log(`Servidor conectado na porta ${PORT}!`);
});