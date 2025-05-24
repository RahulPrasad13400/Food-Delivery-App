import User from "../models/User"

export class UserController {

    static signup(req, res, next){
        // res.status(404).json({
        //     message : "Email and Password dosen't match",
        //     status_code : 404
        // })
        
        // (req as any).errorStatus = 404
        // const error = new Error("User Email or password dosen't match")
        // next(error)

        // res.send(req.query)

        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        // const user = new User({
        //     email, 
        //     password
        // })

        // user.save().then((user)=>{
        //     res.send(user)
        // })
        // .catch((error)=>{
        //     // const err = new Error(error)
        //     // next(err)

        //     next(error)
        // })

        if(!email){
            const error = new Error("Email is requried")
            next(error)
        } else if(!password){
            const error = new Error("Password is requried")
            next(error)           
        } else if(!name){
            const error = new Error("Name is required")
            next(error)
        }
    }

    static test1(req, res, next){
        (req as any).msg = 'This is a test'
        next() 
    }

    static test2(req, res){
        res.send((req as any).msg)
    }
}