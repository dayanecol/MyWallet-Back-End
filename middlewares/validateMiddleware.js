import { signInSchema, signUpSchema} from "../schemas/authSchemas.js";

export function validateSignIn(req,res,next){
    const validation = signInSchema.validate(req.body);
    if (validation.error){
        console.log("Erro na validacao");
        res.sendStatus(422);
        return;
    }
    next();
}

export function validateSignUp(req,res,next){
    const validation = signUpSchema.validate(req.body);
    if (validation.error){
        res.sendStatus(422);
        return;
    }
    next();
}