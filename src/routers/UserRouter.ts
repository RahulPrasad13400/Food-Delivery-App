import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { body, validationResult } from 'express-validator'
import { UserValidators } from "../validators/UserValidators";

class UserRouter{

    public router : Router;

    constructor(){
        this.router = Router()
        this.getRoutes()
        this.postRoutes()
        this.patchRoutes()
        this.putRoutes()
        this.deleteRoutes()
    }

    getRoutes(){        
        // this.router.get('/login',(req, res)=>{
        //     const data = [{ name : 'abc'}]
        //     res.status(200).send(data)
        // })
        
        // The first function is a middleware that logs "test" and then sends a response (res.send('test')) and calls next().
        // The second function is another handler (middleware in this context)
        // this.router.get('/test', (req, res, next) => {
        //     console.log('test');
        //     res.send('test');   This ends the response
        //     next();   Calls the next middleware
        //   }, (req, res) => {  
        //     res.send("test");   Tries to send another response
        //   });

        // this.router.get('/login', UserController.login)

        // this.router.get('/test', (req, res, next) => {
        //     console.log('test');
        //     (req as any).msg = 'This is a test'
        //     next();   
        // }, (req, res) => {  
        //     res.send((req as any).msg);   
        // });

        // this.router.get('/test', UserController.test1, UserController.test2)

        this.router.post('/signup',
        //   [
        //     body('name', 'Name is required').isString(),
        //     body('email', 'Email is required').isEmail(),
        //     body('password', 'Password is required').isLength({min : 5})
        //     .custom((req)=>{    // CUSTOM IS USED TO GIVE CUSTOM VALIDATORS 
        //         if(req.email) return true
        //         else throw new Error('Email is not available for validation')
        //     })
        //   ]
          UserValidators.signup(), UserController.signup)   // USERVALIDATORS.SIGNUP FUNCTION IS CALLED IMMEDIATELY
        //  UserValidators.signup() -- CALLING A FUNCTION
        //  UserController.signup   -- PASSING A FUNCTION
        
    }

    postRoutes(){

    }

    patchRoutes(){

    }

    putRoutes(){

    }

    deleteRoutes(){

    }
}

export default new UserRouter().router