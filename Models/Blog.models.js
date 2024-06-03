import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        required: true
    },
    imageName : {
        type: String,
    }
}, {
    timestamps: true

})

export const Blog = mongoose.model("Blog", BlogSchema)