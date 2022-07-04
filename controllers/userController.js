import dayjs from "dayjs";
import db from "../mongo.js";
import {operationSchema} from "../schemas/userSchemas.js"

export async function getOperations(req, res) {
  const {user} = res.locals;
  try {
    const operations = await db.collection("operations").find({userId: user._id}).toArray();
    res.send(operations);
  } catch (error) {
    console.log("Erro ao efeturar eperacao!");
    res.sendStatus(500);
    return;
  }
}

export async function addOperation(req, res) {
    const { type, label, value } = req.body;

    const validation = operationSchema.validate(req.body);
    if (validation.error){
        console.log("Erro na validacao");
        res.sendStatus(422);
        return;
    }

    const {user} = res.locals;
    try {
        
        await db.collection("operations").insertOne({
        type,
        value,
        label, 
        date: dayjs().format('DD/MM'),
        userId: user._id
        });
        return res.sendStatus(201);
    } catch (error) {
        console.log("Erro ao realizar a operacao!");
        res.sendStatus(500);
        return;
    }
}