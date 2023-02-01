import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    'creator':String,
    'title':String,
    'image_link':String,
    'storage_ref': String,
    'content':String,
    'category':String
},  { timestamps: true });

export const Post = mongoose.model('Post', blogSchema);