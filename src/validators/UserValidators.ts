import { body } from "express-validator"

export class UserValidators{
    static signup(){ 
        return [
            body('name', 'Name is required').isString(),
            body('email', 'Email is required').isEmail(),
            body('password', 'Password is required').isLength({min : 5})
            .custom((req)=>{    // CUSTOM IS USED TO GIVE CUSTOM VALIDATORS 
                if(req.email) return true
                else throw new Error('Email is not available for validation')
            })
        ]
    }
}