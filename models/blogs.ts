import { Schema,model,models } from "mongoose";

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    excerpt:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
},{timestamps:true});

const Blog = models.Blog || model("Blog",blogSchema);

export default Blog;