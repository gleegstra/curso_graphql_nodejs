
import { mongoose } from "../../db/mongodb";
import bcrypt from 'bcrypt';
import { config } from "../../config/config";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: String,
    hashedPassword:{
        type:String
    },
    token: String,
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
},
{
    statics:{
        authenticate: async function ({email,password}){
            try {
                let user:any = await this.findOne({email});
                if (!user) throw Error ('Email or password are wrong'); 
                let result = await bcrypt.compare(password,user.hashedPassword);
                if (!result) throw new Error ('Email or password are wrong');
                
                //JSON Token
                user.token = jwt.sign({id: user.id},config.SECRET_TOKEN);
                await user.save();

                return user;  
            } catch (e) {
                console.log(e);
            }
        },
    }
});

userSchema.virtual('password');

//Encriptado de password mediante Hook pre
userSchema.pre('validate', async function(next) {
    try {
        if (this.get('password') === undefined) return next();
        this.hashedPassword = await bcrypt.hash(this.get('password'), Number(config.SALTO_HASH));
        return next();
    } catch (e) {
        console.log(e);
        throw e;
    }
});

export const userModel = mongoose.model('User',userSchema);

