import { signupVal } from "../modules/user/user.validation.js"


export const validate =(schema)=>{
    return (req, res, next)=>{
        let {error} = schema.validate(req.body, {abortEarly:false})
        if(!error){
            next()
        }
        else{
            res.json(error?.details)
        }
    }
}