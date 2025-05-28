import { body, query } from "express-validator"
import User from "../models/User"

export class UserValidators{
    static signup(){ 
        return [
            body('name', 'Name is required').isString(),
            body('email', 'Email is required').isEmail().custom((email,{req})=>{
                return User.findOne({email : email}).then((user)=>{
                    if(user){
                        throw new Error("User already exist")
                    } else {
                        return true 
                    }
                }).catch(e=>{
                    throw new Error(e)
                })
            }),
            body('password', 'Password is required').isAlphanumeric().isLength({min : 8, max : 20})
                .withMessage("Password must be between 8 to 20 characters"),
            body('type', 'User role type is required').isString(),
            body('status', 'User status is required').isString()
            // .custom((value,{req})=>{    // CUSTOM IS USED TO GIVE CUSTOM VALIDATORS 
            //     if(req.body.email) return true
            //     else throw new Error('Email is not available for validation')
            // })
        ]
    }

    static verifyUserEmail(){ 
        return [
            body('verification_token', 'Email verification token is required').isNumeric(),
            body('email', 'Email is required').isEmail(),
        ]
    }

    static verifyUserForResendEmail(){
        return [query('email', 'Email is required').isEmail()]
    }
}