import db from "../mongo.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signIn(req,res){
    const {email, password} = req.body;

    try {
        const user = await db.collection('users').findOne({email:email});
        if(!user){
            res.sendStatus(404);
            return;
        }
        if(user && bcrypt.compareSync(password,user.password)){
            const token = uuid();
            await db.collection("sessions").insertOne({
                userId: user._id,
                token
            })
            return res.send({token, name:user.name});
        }
        return res.sendStatus(201);
    } catch (error) {
        console.log("Erro ao logar usuario!")
        res.sendStatus(500);
        return;
    }
}

export async function signUp(req,res){
    const {name, email, password, passwordAgain} = req.body;

    try {
        const passwordHashed = bcrypt.hashSync(password,10);
        await db.collection('users').insertOne({
            name:name,
            email:email,
            password: passwordHashed 
        });
        return res.sendStatus(201);
    } catch (error) {
        console.log("Erro ao cadastrar usuario!")
        res.sendStatus(500);
        return;
    }

}