import { mongoose } from '../../db/mongodb';

const courseSchema = new mongoose.Schema({
    title: String,
    views: Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

export const courseModel = mongoose.model('Course',courseSchema);