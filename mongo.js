import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_BANCO);
    console.log("MongoDB conectado ao Banco de dados!")
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados!");
}

export default db;