import User from "../models/User"

import { validationResult } from "express-validator"
import { Utils } from "../utils/Utils"
import { NodeMailer } from "../utils/NodeMailer"

export class UserController {

    static async signup(req, res, next){
        // res.status(404).json({
        //     message : "Email and Password dosen't match",
        //     status_code : 404
        // })
        
        // (req as any).errorStatus = 404
        // const error = new Error("User Email or password dosen't match")
        // next(error)

        // res.send(req.query)

        // const errors = validationResult(req)

        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const type = req.body.type
        const status = req.body.status
        const phone = req.body.phone
        const verification_token = Utils.generateVerificationToken(5)

        // if(!errors.isEmpty()){
        //     return res.status(400).json({errors : errors.array()})
        // }

        // if(!errors.isEmpty()){   // THIS IF CONDITION WAS REPLACED BY GlobalMiddleWare.checkError
        //     // return res.status(400).json({errors : errors.array().map((x)=>x.msg)})  // we just want the message that's why we map through it and get the message
        //     return next(new Error(errors.array()[0].msg))
        // }

        // user.save().then((user)=>{
        //     res.send(user)
        // })
        // .catch((error)=>{
        //     // const err = new Error(error)
        //     // next(err)

        //     next(error)
        // })

        // if(!email){
        //     const error = new Error("Email is requried")
        //     next(error)
        // } else if(!password){
        //     const error = new Error("Password is requried")
        //     next(error)           
        // } else if(!name){
        //     const error = new Error("Name is required")
        //     next(error)
        // }

        const data = {
            email,
            // verification_token : Utils.generateVerificationToken(5), // here we are calling a method so we don't have to use new Keyword
            verification_token : verification_token, 
            verification_token_time : Date.now() + new Utils().MAX_TOKEN_TIME,  // we have to use new keyword because we are calling a public constructor
            password,
            name,
            type,
            status,
            phone
        }

        // let user = new User(data)

        // user.save().then((user)=>{
        //     res.send(user)
        // })
        // .catch((err)=>{
        //     next(err)
        // })

        try {
            let user = await new User(data).save()
            await NodeMailer.sendMail({
                to : [user.email],
                subject : 'test',
                html : `<h1>Your otp is ${verification_token}</h1>`
            })
            res.send(user)
        } catch (error) {
            next(error)
        }        
    }

    static async verify(req, res, next){
        const verification_token = req.body.verification_token
        const email = req.body.email
        try {
            const user = await User.findOneAndUpdate({  // FIND
                email : email,
                verification_token : verification_token,
                verification_token_time : {$gt : Date.now()}
            },
            {   // UPDATE
                email_verified : true,
            },
            {   // RETURN THE NEW DATA 
                new : true
            })
            
            if(user){
                res.send(user)
            } else  {
                throw new Error("Email Verification token is expired. Please try again")
            }

        } catch (error) {
            next(error)
        }
    }

    static async resendVerificationEmail(req, res, next){
        const verification_token = Utils.generateVerificationToken()
        const email = req.query.email 
        try {
            const user = await User.findOneAndUpdate({  // FIND
                email : email,
                verification_token : verification_token,
                verification_token_time : Date.now() + new Utils().MAX_TOKEN_TIME 
            },
            {   // UPDATE
                email_verified : true,
            })
            
            if(user){
                await NodeMailer.sendMail({
                    to : [user.email],
                    subject : 'Resend Email Verification',
                    html : `<h1>Your otp is ${verification_token}</h1>`
                })
                res.json({success : true})
            } else  {
                throw new Error("User doesn\'t exist")
            }
        } catch (error) {
            next(error)
        } 
    }
}