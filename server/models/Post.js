import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        location:String,
        description:String,
        picturePath:String,
        userPicturePath:String,
        likes:{
            type:Map,
            of:Boolean
        },
        // likes: Map<String,Boolean>,
        comments:{
            type:Array,
            default:[]
        }
    },
    {
        timestamps:true
    }
);

const Posts = mongoose.model("Posts",postSchema);
export default Posts;