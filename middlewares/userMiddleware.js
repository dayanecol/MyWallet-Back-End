import db from "../mongo.js";

export async function verifyToken(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();

    if (!token) {
        res.sendStatus(401);
        return;
    }

    try {

      const session = await db.collection("sessions").findOne({ token });
      if (!session) {
        res.sendStatus(401);
        return;
      }

      const user = await db.collection("users").findOne({ 
          _id: session.userId 
      });
      if (!user) {
        res.sendStatus(401);
        return;
      }
      res.locals.user = user;
    
      next();
      
    } catch (error) {
      console.log("Erro ao encontrar usuario na sessao!");
      res.sendStatus(500);
      return;
    }
  
    
}