import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as mongoose from 'mongoose' 
import { getEnvironmentVariables } from './environments/environment'
import UserRouter from './routers/UserRouter'

export class Server{  

    public app:express.Application = express()

    constructor() {
        this.setConfigs()
        this.setRoutes()
        this.error404Handler()
        this.handleErrors()
    }

    setConfigs(){
        this.connectMongoDB()
        this.configureBodyParser()
    }

    connectMongoDB(){
        mongoose.connect(getEnvironmentVariables().db_uri)
        .then(()=>{
            console.log("connected to mongo db")
        })
    }

    configureBodyParser(){
        this.app.use(bodyParser.urlencoded({extended : true})) // EXTENDED IS SET TO TRUE, SO WE CAN PASS ANY TYPE OF DATA
    }

    setRoutes(){
        this.app.use('/api/user', UserRouter)
    }

    // THIS CODE WAS WRITTEN DURING THE INITIAL STAGE (VIDEO - 20. Structuring Nodejs Project)
    // userRoutes(){
    //     this.app.get('/api/user/login',(req, res)=>{
    //             const data = [{ name : 'abc'}]
    //             res.status(200).send(data)
    //         })
            
    //     this.app.get('/api/user/test', (req, res)=>{
    //             console.log('test')
    //             res.send('test')
    //         })
    //     this.app.use('/api/user', UserRouter)
    // }

    error404Handler(){
        this.app.use((req, res)=>{
            res.status(404).json({
                message : "Not Found",
                status_code : 404
            })
        })
    }

    handleErrors(){
        this.app.use((error, req, res, next)=>{
            const errorStatus = req.errorStatus || 500
            res.status(errorStatus).json({
                message : error.message || 'Something went wrong',
                status_code : errorStatus
            })
        })
    }
}