import { userModel } from "../models/user.model";
import { courseModel } from "../models/course.model";

export const Query={
    getUsers: async function (parent:any,{page,items}:any) {
        try {
            let users:any|undefined;
            items= parseInt(items);
            page= (parseInt(page) - 1) * items;
            users = await userModel.find().populate('courses').limit(items).skip(page);
            return users;   
        } catch (e) {
            console.log(e);
        }
    },
    getUser:async function (parent:any,{id}:any){
        try{
            let user:any|undefined;
            user = await userModel.findById(id);
            return user;
        }catch(e){
            console.log(e);
        }
    }
}

/*resolver personalizado de campo courses para mejorar performance*/ 
export const User={
    courses: async function (parent:any) {
        let user = {...parent._doc};
        return await courseModel.find({user:user._id});        
    }
}

export const Mutation={
    signUp:async function (parent:any ,{signUp}:any){
        try {
            let user:any|undefined;
            user = await userModel.create({
                ...signUp
            });
            return user;           
        } catch (e) {
            console.log(e);
        }
    },
    loginIn: async function(parent:any,{loginIn}:any){
        try {
            let user:any|undefined;
            user = await userModel.authenticate(loginIn);
            return user;
        } catch (e) {
            console.log(e);
            return null;
        }
    },
    signOut:async function (parent:any,{id}:any){
        return null;
    }
}