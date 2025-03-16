import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

const tagSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    }
})

const contentSchema = new Schema({
    link: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        unique:true,
        required: true,
    },
    type: {
        type: String,
        enum: ['image', 'audio', 'video', 'article'],
    },

    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    }
})

const linkSchema = new Schema({
    hash: {
        type: String,
        required: true
    }, 
    userId : {type:mongoose.Schema.Types.ObjectId, ref: "User"}
})

export const User = mongoose.model("User", userSchema);
export const Content = mongoose.model("Content", contentSchema);
export const Tag = mongoose.model("Tag", tagSchema);
export const Share= mongoose.model("Share", linkSchema)

