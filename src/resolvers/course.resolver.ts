import { courseModel } from "../models/course.model";
import { userModel } from "../models/user.model";

export const Query = {
    getCourses:async function(parent:any,{page, items}:any,context:any){
        try {
            console.log(context);
            let courses:any|undefined;
            items = items;
            page = (page - 1) * items;
            courses = await courseModel.find().limit(items).skip(page);
            return courses;
        } catch (e) {
            console.log(e);
        }
    },
    getCourse: async function(parent:any,{id}:any){
        try {
            let course:any|null;
            course = await courseModel.findById(id);
            return course;
        } catch (e) {
            console.log(e);
        }
    },
}

export const Course = {
    user:async function (parent: any) {
        let course = {...parent._doc};
        return await userModel.findById(course.user);
    }
}

export const Mutation = {
    addCourse:async function(parent:any,{addCourse,user}:any){
        try{
            let course: any|undefined;
            course = await courseModel.create({
                ...addCourse,
                user
            });
            (await userModel.findById(user))?.courses.push(course.id);
            return course;
        }catch(e){
            console.log(e);
        }
    },
    updateCourse:async function(parent:any,{id,updateCourse}:any){
        try {
            let courseupdated,userupdated: any|undefined;
            courseupdated = await courseModel.findByIdAndUpdate(id,{
                ...updateCourse
            }, {
                returnDocument:'after'
            });
            userupdated = await userModel.findById(updateCourse.user);
            userupdated?.courses.push(courseupdated?._id);
            await userupdated.save();
            return courseupdated;
        } catch (e) {
            console.log(e);
        }
    },
    deleteCourse:async function(parent:any,{id}:any){
        try{
            let coursedeleted:any|undefined;
            coursedeleted = await courseModel.findOneAndDelete({_id:id});
            let message:string =`El curso elimitado fue: ${coursedeleted.title}.`;
            return { message }; 
        }catch(e){
            console.log(e);
        }
    }
}