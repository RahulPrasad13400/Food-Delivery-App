import * as mongoose from 'mongoose'
import { model } from 'mongoose'

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        requied : true,
    },
    password : {
        type : String,
        required : true 
    }
})

export default model('users', userSchema)